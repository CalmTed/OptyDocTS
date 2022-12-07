import { ACTION_NAMES, ZERO } from "src/models/constants";
import { getId, getInitialBlock } from "src/models/intials";
import { BlockModel, ReducerModel } from "src/models/types";

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
    if(action.payload !== state.sidebarSectionHeight) {
      state.sidebarSectionHeight = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setTemplate:
    if(!state.templates?.[0]) {
      state.templates.push(action.payload);
      stateUpdated = true;
    }
    if(action.payload.uuid !== state.templates[0].uuid) {
      state.templates[0] = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_selectBlock:
    if(action.payload !== state.selectedBlock) {
      state.selectedBlock = action.payload;
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
    state.templates[0].blocks.push(newInsertedBlock);
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
        state.templates[0].blocks.push(child);
      });
    }
    stateUpdated = true;
    break;
  case ACTION_NAMES.template_addBlockBefore:
    const successorBlock = state.templates[0].blocks.find(block => block.uuid === action.payload.successorId);
    if(!successorBlock) {
      break;
    }
    const successorIndex = state.templates[0].blocks.indexOf(successorBlock);
    const newNieigborBlock: BlockModel = {
      ...cleanUpBlock(action.payload.block),
      parentId: successorBlock.parentId
    };
    //adding right before successor block
    state.templates[0].blocks.splice(successorIndex, ZERO, newNieigborBlock);
    if(action.payload.children) {
      action.payload.children.map(child => {
        const clearedChild: BlockModel = {
          ...cleanUpBlock(child),
          parentId: newNieigborBlock.uuid
        };
        state.templates[0].blocks.push(clearedChild);
      });
    }
    stateUpdated = true;
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