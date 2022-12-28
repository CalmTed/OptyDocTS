import { BlockMIs } from "src/models/blockMIs";
import { ACTION_NAMES, CONTENT_TYPE, ONE, ZERO } from "src/models/constants";
import { getCopyColumn, getCopyRow, getId, getInitialBlock, initialBlockMIFactory, initialTemplateMIFactory } from "src/models/intials";
import { TemplateMIs } from "src/models/templateMIs";
import { AppStateModel, BlockModel, CopyColumnModel, ReducerModel } from "src/models/types";

const reducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  const actionType = action.name.split("_")[0];
  switch(actionType) {
  case "app": 
    const redusedAction1 = appReducer(state, action);
    if(redusedAction1.stateUpdated) {
      state = redusedAction1.state;
      stateUpdated = redusedAction1.stateUpdated;
    }
    break;
  case "template":
    const redusedAction2 = templateReducer(state, action);
    if(redusedAction2.stateUpdated) {
      state = redusedAction2.state;
      stateUpdated = redusedAction2.stateUpdated;
    }
    break;
  case "block":
    const redusedAction3 = blockReducer(state, action);
    if(redusedAction3.stateUpdated) {
      state = redusedAction3.state;
      stateUpdated = redusedAction3.stateUpdated;
    }
    break;
  default:
    console.error("unknown reducer type", actionType, action);
  }
  if(stateUpdated) {
    state.lastChange = new Date().getTime();
  }
  return {state,
    stateUpdated};
};

const appReducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  switch(action.name) {
  case ACTION_NAMES.app_setTheme:
    if(action.payload !== state.theme) {
      state.theme = action.payload;
      stateUpdated = true;
    } 
    break;
  case ACTION_NAMES.app_setLangCode:
    if(action.payload !== state.langCode) {
      state.langCode = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setTab:
    if(action.payload !== state.selectedTab) {
      state.selectedTab = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setsidebarSectionHeight:
    if(action.payload !== state.sidebarSectionHeight[state.selectedTab]) {
      state.sidebarSectionHeight[state.selectedTab] = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setTemplate:
    if(!state.templates?.[0]) {
      state.templates.push(action.payload);
      state.selectedBlock = null;
      state.selectedCopy = null;
      stateUpdated = true;
    }
    state.templates[0] = action.payload;
    state.selectedBlock = null;
    stateUpdated = true;
    break;
  case ACTION_NAMES.app_selectBlock:
    if(action.payload !== state.selectedBlock) {
      state.selectedBlock = action.payload;
      stateUpdated = true;
      //collapsing all parents
      if(action.payload) {
        const selectedBlock = state.templates[0].blocks.find(b => b.uuid === action.payload);
        let targetBlock = state.templates[0].blocks.find(b => b.uuid === selectedBlock?.parentId);
        let i = 10000;//loop fallback b.c. js
        while(targetBlock || i) {
          if(targetBlock) {
            targetBlock.treeViewCollapseState = false;
            targetBlock = state.templates[0].blocks.find(b => b.uuid === targetBlock?.parentId);
          }
          i--;
        }
      }
    }
    break;
  case ACTION_NAMES.app_selectCopy:
    if(action.payload !== state.selectedCopy) {
      state.selectedCopy = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setZoom:
    if(action.payload !== state.zoomByTab[state.selectedTab]) {
      state.zoomByTab[state.selectedTab] = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setFocusedBlockSelector:
    if(action.payload !== state.focusedBlockSelectorID) {
      state.focusedBlockSelectorID = action.payload;
      stateUpdated = true;
    }
    break;
  default:
    console.error("unknown app reducer action", action);
  }
  return {state,
    stateUpdated};
};

const templateReducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  const template = state.templates[0];
  const cleanUpBlock: (arg: BlockModel) => BlockModel = (block) => {
    return  {
      ...block,
      uuid: getId("b"),
      //changing uuids for all including mis
      menuItems: block.menuItems.map(mi => {
        return {
          ...mi,
          uuid: getId("bmi")};
      })
    };
  };
  switch(action.name) {
  case ACTION_NAMES.template_setParam:
    if(Object.keys(template).includes(action.payload.paramName)) {
      if(action.payload.value !== template[action.payload.paramName]) {
        template[action.payload.paramName] = action.payload.value as never;
        stateUpdated = true;
      } 
    }
    break;
  case ACTION_NAMES.template_setCSS:
    const targetMI = template.menuItems.find(mi => mi.uuid === action.payload.miUUID);
    if(targetMI) {
      if(action.payload.value !== targetMI.miListItemValue) {
        targetMI.miListItemValue = action.payload.value;
        stateUpdated = true;
      }
    }
    break;
  case ACTION_NAMES.template_addBlock:
    template.blocks.push(getInitialBlock(state.selectedBlock));
    stateUpdated = true;
    break;
  case ACTION_NAMES.template_removeBlock:
    if(state.selectedBlock || action.payload) {
      const startingBlock = template.blocks.find(block => { return block.uuid === (action.payload ? action.payload : state.selectedBlock); });
      if(startingBlock) {
        const getChildrenParents = (parentId: string) => {
          let idList: string[] = [parentId];
          //add all children
          template.blocks.filter(b => b.parentId === parentId).map(child => {
            idList = [...idList, ...getChildrenParents(child.uuid)];
          });
          //if child has children
          //concat getChildrenParents()
          return idList;
        };
        const allDependentIds = getChildrenParents(startingBlock.uuid);
        template.blocks = template.blocks.filter(block => {
          if(allDependentIds.includes(block.uuid)) {
            stateUpdated = true;
            return false;
          }else{
            return true;
          }
        });
      }
      if(state.selectedBlock !== null) {
        state.selectedBlock = startingBlock ? startingBlock.parentId : null;
        stateUpdated = true;
      }
    }
    break;
  case ACTION_NAMES.template_addBlockInside:

    const newInsertedBlock: BlockModel = {
      ...cleanUpBlock(action.payload.block),
      parentId: action.payload.parentId
    };
    template.blocks.push(newInsertedBlock);
    if(action.payload.children) {
      const getAndCleanUpChildren: (list: BlockModel[], fromParent: string, toParemt: string) => BlockModel[] = (list, fromParent, toParent) => {
        let ret:BlockModel[] = [];
        list.filter(block => block.parentId === fromParent).map(block => {
          const clearedBlock = {
            ...cleanUpBlock(block),
            parentId: toParent
          };
          ret = [
            ...ret,
            clearedBlock,
            ...getAndCleanUpChildren(list, block.uuid, clearedBlock.uuid)
          ];
        });
        return ret;
      };
      const reparentedAndClearedChildren = getAndCleanUpChildren(action.payload.children, action.payload.block.uuid, newInsertedBlock.uuid);
      reparentedAndClearedChildren.map(child => {
        template.blocks.push(child);
      });
    }
    stateUpdated = true;
    break;
  case ACTION_NAMES.template_addBlockBefore:
    const successorBlock = template.blocks.find(block => block.uuid === action.payload.successorId);
    if(!successorBlock) {
      break;
    }
    const successorIndex = template.blocks.indexOf(successorBlock);
    const newNieigborBlock: BlockModel = {
      ...cleanUpBlock(action.payload.block),
      parentId: successorBlock.parentId
    };
    //adding right before successor block
    template.blocks.splice(successorIndex, ZERO, newNieigborBlock);
    //adding all pasted block's children
    if(action.payload.children) {
      const getAndCleanUpChildren: (list: BlockModel[], fromParent: string, toParemt: string) => BlockModel[] = (list, fromParent, toParent) => {
        let ret:BlockModel[] = [];
        list.filter(block => block.parentId === fromParent).map(block => {
          const clearedBlock = {
            ...cleanUpBlock(block),
            parentId: toParent
          };
          ret = [
            ...ret,
            clearedBlock,
            ...getAndCleanUpChildren(list, block.uuid, clearedBlock.uuid)
          ];
        });
        return ret;
      };
      const reparentedAndClearedChildren = getAndCleanUpChildren(action.payload.children, action.payload.block.uuid, newNieigborBlock.uuid);
      reparentedAndClearedChildren.map(child => {
        template.blocks.push(child);
      });
    }
    stateUpdated = true;
    break;
  case  ACTION_NAMES.template_toggleMI:
    const miToChange = template.menuItems.find(mi => mi.miListItemName === action.payload.miName);
    if(miToChange) { //remove mi from list if exists 
      template.menuItems = template.menuItems.filter(mi => mi.miListItemName !== action.payload.miName);
      stateUpdated = true;
    }else { //add mi to mist id not exists 
      if(TemplateMIs.find(mi => mi.name === action.payload.miName)) {
        template.menuItems = [...template.menuItems, ...[initialTemplateMIFactory(action.payload.miName)]];
        stateUpdated = true;
      }
    }
    break;
  case ACTION_NAMES.template_addCopy:
    const newCopy = getCopyRow(template.copyColumns);
    state.templates[0].copyRows.push(newCopy);
    state.selectedCopy = newCopy.uuid;
    stateUpdated = true; 
    break;
  case ACTION_NAMES.template_removeCopy:
    const copyRowToDelete = template.copyRows.find(cr => cr.uuid === action.payload.copyUUID);
    if(copyRowToDelete) {
      const copyRowIndex = template.copyRows.indexOf(copyRowToDelete);
      const nextCopyID = copyRowIndex === ZERO ? null : template.copyRows[copyRowIndex - ONE].uuid;
      template.copyRows = template.copyRows.filter(cr => cr.uuid !== action.payload.copyUUID);
      state.selectedCopy = nextCopyID;
      stateUpdated = true; 
    }
    break;
  case ACTION_NAMES.template_setCopyValue:
    const targetCopyRow = template.copyRows.find(cr => cr.cells.find(cc => cc.uuid === action.payload.cellUUID));
    if(targetCopyRow) {
      const targetCell = targetCopyRow.cells.find(cell => cell.uuid === action.payload.cellUUID);
      if(targetCell) {
        targetCell.value = action.payload.value;
        stateUpdated = true;
      }
    }
    break;
  case ACTION_NAMES.template_setCopyRows:
    if(action.payload.rows.length) {
      template.copyRows = action.payload.rows;
      stateUpdated = true;
    }
    break;
  default:
    console.error("unknown template reducer action", action);
  }
  if(stateUpdated) {
    template.dateEdited = new Date().getTime();
  }
  return {
    state,
    stateUpdated
  };
};

const blockReducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  const generateCopyColumns = (state: AppStateModel) => {
    let copyColumns:CopyColumnModel[] = [];
    const checkForVarFields = (block: BlockModel) => {
      let ret:CopyColumnModel[] = [];

      //if has chldren check children => add their return value to ret array
      if(state.templates[0].blocks.find(b => b.parentId === block.uuid)) {
        state.templates[0].blocks.filter(b => b.parentId === block.uuid).map(b => {
          ret = [...ret, ...checkForVarFields(b)];
        });
      } else {
      //if has not and has variable or selector type => add to array
        if([CONTENT_TYPE.variable, CONTENT_TYPE.select].includes(block.contentType)) {
          ret = [getCopyColumn(block)];
        }
      }
      return ret;
    };
    state.templates[0].blocks.filter(b => b.parentId === null).map(b => {
      copyColumns = [...copyColumns, ...checkForVarFields(b)];
    });
    state.selectedCopy = null;
    return copyColumns;
  };
  const renameCopyColumns = (state: AppStateModel, targetBlockId: string, newLabel: string) => {
    return state.templates[0].copyColumns.map(col => 
      col.targetBlockId === targetBlockId ? {
        ...col,
        label: newLabel
      } : col);
  };
  const changeCopyColumnsValues = (state: AppStateModel, targetBlock: BlockModel)  => {
    return state.templates[0].copyColumns.map(col => {
      if(col.targetBlockId === targetBlock.uuid) {
        if(targetBlock.contentType === CONTENT_TYPE.select) {
          return {
            ...col,
            defauldValue: targetBlock.contentValue.split("\n")[0],
            options: [...new Set(targetBlock.contentValue.split("\n"))]
          };
        } else {
          return {
            ...col,
            defauldValue: targetBlock.contentValue
          };
        }
      } else {
        return col;
      }
    });
  };
  switch(action.name) {
  case ACTION_NAMES.block_setParam:
    const blockSetParam = state.templates[0].blocks.find(block => block.uuid === (action?.payload?.blockUUID ? action?.payload?.blockUUID : state.selectedBlock));
    if(!blockSetParam) {
      return {
        state,
        stateUpdated
      };
    }
    if(Object.keys(blockSetParam).includes(action.payload.paramName)) {
      if(action.payload.value !== blockSetParam[action.payload.paramName]) {
        blockSetParam[action.payload.paramName] = action.payload.value as never;
        if (["contentType"].includes(action.payload.paramName)) {
          //changing copy columns
          state.templates[0].copyColumns = generateCopyColumns(state);
          state.templates[0].copyRows = [];
        }
        if (["variableLabel"].includes(action.payload.paramName)) {
          state.templates[0].copyColumns = renameCopyColumns(state, blockSetParam.uuid, String(action.payload.value));
        }
        if (["contentValue"].includes(action.payload.paramName)) {
          state.templates[0].copyColumns = changeCopyColumnsValues(state, blockSetParam);
        }
        stateUpdated = true;
      } 
    }
    break;
  case ACTION_NAMES.block_setCSS:
    const blockSetCSS = state.templates[0].blocks.find(block => block.uuid === (action?.payload?.blockUUID ? action?.payload?.blockUUID : state.selectedBlock));
    if(!blockSetCSS) {
      return {
        state,
        stateUpdated
      };
    }
    const targetMI = blockSetCSS.menuItems.find(mi => mi.uuid === action.payload.miUUID);
    if(targetMI) {
      if(action.payload.value !== targetMI.miListItemValue) {
        targetMI.miListItemValue = action.payload.value;
        stateUpdated = true;
      }
    }
    break;
  case ACTION_NAMES.block_setFTP:
    const blockSetFTP = state.templates[0].blocks.find(block => block.uuid === (action?.payload?.blockUUID ? action?.payload?.blockUUID : state.selectedBlock));
    if(!blockSetFTP) {
      return {
        state,
        stateUpdated
      };
    }
    if(blockSetFTP.FTPProportions.width !== action.payload.width || blockSetFTP.FTPProportions.height !== action.payload.height) {
      blockSetFTP.FTPProportions = {
        width: action.payload.width,
        height: action.payload.height
      };
      stateUpdated = true;
    }
    break;
  case  ACTION_NAMES.block_toggleMI:
    const blockToggleMI = state.templates[0].blocks.find(block => block.uuid === (action?.payload?.blockUUID ? action?.payload?.blockUUID : state.selectedBlock));
    if(!blockToggleMI) {
      return {
        state,
        stateUpdated
      };
    }
    const miToChange = blockToggleMI.menuItems.find(mi => mi.miListItemName === action.payload.miName);
    if(miToChange) { //remove mi from list if exists 
      blockToggleMI.menuItems = blockToggleMI.menuItems.filter(mi => mi.miListItemName !== action.payload.miName);
      stateUpdated = true;
    }else { //add mi to mist id not exists 
      if(BlockMIs.find(mi => mi.name === action.payload.miName)) {
        blockToggleMI.menuItems = [...blockToggleMI.menuItems, ...[initialBlockMIFactory(action.payload.miName)]];
        stateUpdated = true;
      }
    }
    break;
  default:
    console.error("unknown block reducer action", action);
  }
  if(stateUpdated) {
    state.templates[0].dateEdited = new Date().getTime();
  }
  return {
    state,
    stateUpdated
  };
};

export {reducer};