import React, {FC} from "react";
import { BlockMIs } from "src/models/blockMIs";
import { ACTION_NAMES, CONTENT_TYPE, MI_LISTITEM_TYPE, TWO, ZERO } from "src/models/constants";
import { BlockModel, MenuItemBlockModel, StoreModel } from "src/models/types";
import considerZooming from "src/store/considerZooming";
import styled from "styled-components";

interface BlockComponentModel{
  store: StoreModel
  block: BlockModel
  classes?: string
}

const BlockStyle = styled.div`
  transition: all var(--transition);
  font-size: calc(var(--zoom) * 1rem);
  cursor: pointer;
  notoverflow: hidden;
  line-break: anywhere;
  outline: 1px dashed transparent;
  display: inline !important;
  width: auto;
  height: auto;
  &.selected{
    outline-color: var(--main-color);
  }
  &.hovered:not(.selected):not(& *:hover),:hover:not(.selected){
    outline-color: var(--app-bg);
  }
  &.variable{
    outline-color: var(--second-color);
  }
  p{
    margin: 0;
  }
`;

const handleSelectBlock: (store: StoreModel, uuid: string, e:React.MouseEvent) => void = (store, uuid, e) => {
  const getUUID: (s: string) => string | undefined = (s) => {
    return s.split(" ").find(classItem => /(uuid-b)\d{1,}/g.test(classItem))?.replace("uuid-", "");
  };
  const target = (e.target as HTMLElement);
  const targetUUID = getUUID(target.className);
  if(targetUUID) {
    store.dispach({
      name:ACTION_NAMES.app_selectBlock,
      payload: targetUUID
    });
    return;
  }
  const parent = target.parentElement;
  if(!parent) {
    return;
  }
  const parentUUID = getUUID(parent.className);
  if(!parentUUID || parentUUID !== uuid) {
    return;
  }
  store.dispach({
    name:ACTION_NAMES.app_selectBlock,
    payload: uuid
  });
};

const getChildren: (children: BlockModel[], store:StoreModel) => React.ReactNode[] = (children, store) => {
  return children.map(child => {
    return <Block key={child.uuid} block={child} store={store}></Block>;
  });
};

const getContent: (block: BlockModel) => React.ReactNode = (block) => {
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      return <p key={line.substring(ZERO, TWO * TWO * TWO) + i}>{ line.replace(/ /g, "\u00a0") }</p>;
    });
  };
  // const handleContentEditableChange:(e:React.FormEvent) => void = (e) => {
  //   e;
  //   return;
  // };
  //TODO contentEditable={store.state.selectedBlock === block.uuid} onChange={handleContentEditableChange}
  return <>
    {block.contentType === CONTENT_TYPE.fixed && formatText(block.contentValue)}
    {block.contentType === CONTENT_TYPE.variable && formatText(block.contentValue)}
  </>;
  // if(blockData.contentType === CONTENT_TYPE.copyFrom) {
  //   return blockData.contentValue;
  // }
};


export const Block: FC<BlockComponentModel> = ({store, block, classes}) => {
  const children = store.state.templates[0].blocks.filter(blockItem => blockItem.parentId === block.uuid);
  const selected = store.state.selectedBlock === block.uuid ? "selected" : "";
  const variable = block.contentType === CONTENT_TYPE.variable ? "variable" : "";
  const getStyles: (mis: MenuItemBlockModel[]) =>  React.CSSProperties = (mis) => {
    let ret:React.CSSProperties = {};
    mis.map(mi => {
      const listMI = BlockMIs.find(listMI => listMI.name === mi.miListItemName);
      if(!listMI || listMI.miType !== MI_LISTITEM_TYPE.blockCSS) {
        return;
      }
      ret = {
        ...ret,
        ...{[String(listMI.CSSParam)]: considerZooming(String(mi.miListItemValue))}
      };
    });
    return ret;
  };
  return <BlockStyle style={getStyles(block.menuItems)} className={`block uuid-${block.uuid} ${selected} ${classes} ${variable}`}  onClick={(e) => { handleSelectBlock(store, block.uuid, e); }}>
    {
      (!!children.length && getChildren(children, store)) ||
      (!children.length && getContent(block))
    }
  </BlockStyle>;
};