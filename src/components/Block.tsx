import React, {FC} from "react";
import { BlockMIs } from "src/models/blockMIs";
import { ACTION_NAMES, CONTENT_TYPE, MI_LISTITEM_TYPE, TAB_TYPE, TWO, ZERO } from "src/models/constants";
import { BlockModel, MenuItemBlockModel, StoreModel } from "src/models/types";
import considerZooming from "src/store/considerZooming";
import styled from "styled-components";

interface BlockComponentModel{
  store: StoreModel
  block: BlockModel
  classes?: string
  copyRowUUID?: string
}

const BlockStyle = styled.div`
  transition: all var(--transition);
  font-size: calc(var(--zoom) * 1rem);
  cursor: pointer;
  notoverflow: hidden;
  line-break: anywhere;
  outline: 1px dashed transparent;
  display: inline;
  width: auto;
  height: auto;
  &.selected{
    outline-width: 2px;
    outline-color: var(--main-color);
  }
  &.hovered:not(.selected):not(& *:hover),:hover:not(.selected){
    outline-color: var(--app-bg);
  }
  &.variable{
    outline-color: var(--variable-color);
  }
  &.copying{
    outline-color: var(--copiedFrom-color);
  }
  p{
    margin: 0;
  }
`;

const isTargetBlock: (store: StoreModel, uuid: string, e:React.MouseEvent) => boolean | undefined = (store, uuid, e) => {
  const clearUUID: (s: string) => string | undefined = (s) => {
    return s.split(" ").find(classItem => /(uuid-b)\d{1,}/g.test(classItem))?.replace("uuid-", "");
  };
  const target = (e.target as HTMLElement);
  const targetUUID = clearUUID(target.className);
  if(targetUUID) {
    return true;
  }
  const parent = target.parentElement;
  if(!parent) {
    return;
  }
  const parentUUID = clearUUID(parent.className);
  if(!parentUUID || parentUUID !== uuid) {
    return;
  }
  return true;
};

const handleClick = (e: React.MouseEvent, store: StoreModel, block: BlockModel) => {
  const isBlockClicked = isTargetBlock(store, block.uuid, e);
  if(!isBlockClicked) {
    return;
  }
  if(store.state.focusedBlockSelectorID) {
    store.dispach({
      name: ACTION_NAMES.block_setParam,
      payload: {
        paramName: "referenceId",
        value: block.uuid,
        blockUUID: store.state.focusedBlockSelectorID
      }
    });
  }else{
    if(store.state.selectedTab === TAB_TYPE.Edit) {
      store.dispach({
        name:ACTION_NAMES.app_selectBlock,
        payload: block.uuid
      });
    }
    if(store.state.selectedTab === TAB_TYPE.Copy) {
      store.dispach({
        name:ACTION_NAMES.app_selectCopy,
        payload: block.copyRowUUID || null
      });
    }
  }
};

const getChildren: (children: BlockModel[], store:StoreModel, copyRowUUID?: string) => React.ReactNode[] = (children, store, copyRowUUID) => {
  return children.map(child => {
    const blockKey = `${child.uuid}-${child.copyRowUUID}`;
    return <Block key={blockKey} block={child} store={store} copyRowUUID={copyRowUUID}></Block>;
  });
};

const formatText = (text: string) => {
  return text.split("\n").map((line, i) => {
    return <p key={line.substring(ZERO, TWO * TWO * TWO) + i}>{ line.replace(/ /g, "\u00a0") }</p>;
  });
};
const getReference = (block: BlockModel, store: StoreModel) => {
  const referenceBlock = store.state.templates[0].blocks.find(b => b.uuid === block.referenceId);
  if(!referenceBlock) {
    return "";
  }
  if(referenceBlock?.contentType === CONTENT_TYPE.select) {
    return referenceBlock.contentValue.split("\n")[0];
  }else{
    return referenceBlock.contentValue;
  }
};

const getContent: (block: BlockModel, store: StoreModel) => React.ReactNode = (block, store) => {
  return <>
    {block.contentType === CONTENT_TYPE.fixed && formatText(block.contentValue)}
    {block.contentType === CONTENT_TYPE.variable && formatText(block.contentValue)}
    {block.contentType === CONTENT_TYPE.select && formatText(block.contentValue.split("\n")[0])}
    {block.contentType === CONTENT_TYPE.copyFrom && formatText(getReference(block, store))}
  </>;
};

const getCopyContent = (block: BlockModel, store: StoreModel, copyRowUUID?: string) => {
  const copyColumns = store.state.templates[0].copyColumns;
  const getVariableByTargetUUID = (blockUUID: string) => {
    const targetRow = store.state.templates[0].copyRows.find(row => row.uuid === copyRowUUID);
    const value = targetRow?.cells.find(cell => copyColumns.find(col => col.uuid === cell.columnId)?.targetBlockId === blockUUID)?.value || "";
    return value;
  };
  return <>
    {block.contentType === CONTENT_TYPE.fixed && formatText(block.contentValue)}
    {block.contentType === CONTENT_TYPE.variable && formatText(getVariableByTargetUUID(block.uuid))}
    {block.contentType === CONTENT_TYPE.select && formatText(getVariableByTargetUUID(block.uuid))}
    {block.contentType === CONTENT_TYPE.copyFrom && formatText(getVariableByTargetUUID(block.referenceId))}
  </>;
};

export const Block: FC<BlockComponentModel> = ({store, block, classes, copyRowUUID}) => {
  const children = store.state.templates[0].blocks.filter(blockItem => blockItem.parentId === block.uuid);
  const selected = store.state.selectedTab === TAB_TYPE.Edit ? store.state.selectedBlock === block.uuid ? "selected" : "" : store.state.selectedTab === TAB_TYPE.Copy ? store.state.selectedCopy === block.copyRowUUID ? "selected" : "" : "";
  const variable = [CONTENT_TYPE.variable, CONTENT_TYPE.select].includes(block.contentType) ? "variable" : "";
  const coping = block.contentType === CONTENT_TYPE.copyFrom ? "copying" : "";
  const getStyles: (mis: MenuItemBlockModel[]) =>  React.CSSProperties = (mis) => {
    let ret:React.CSSProperties = {};
    mis.map(mi => {
      const listMI = BlockMIs.find(listMI => listMI.name === mi.miListItemName);
      if(!listMI || listMI.miType !== MI_LISTITEM_TYPE.blockCSS) {
        return;
      }
      ret = {
        ...ret,
        ...{[String(listMI.CSSParam)]: `${considerZooming(String(mi.miListItemValue))}`}
      };
    });
    return ret;
  };
  const value = store.state.selectedTab === TAB_TYPE.Edit ? getContent(block, store) : getCopyContent(block, store, copyRowUUID);

  return <BlockStyle style={getStyles(block.menuItems)} className={`block uuid-${block.uuid} ${selected} ${classes ? classes : ""} ${variable} ${coping}`}  onClick={(e) => handleClick(e, store, block)}>
    {
      !!children.length && block.contentType === CONTENT_TYPE.fixed ? getChildren(children, store, copyRowUUID) : value
    }
  </BlockStyle>;
};