import React, { FC } from "react";
import styled from "styled-components";
import { BlockModel, StoreModel } from "src/models/types";
import Tabs from "./Tabs";
import Split from "./ui/Split";
import { ACTION_NAMES, CONTENT_TYPE, CSS_DISPLAY_TYPE, MI_TARGET, TAB_TYPE, TWO, ZERO } from "src/models/constants";
import { BLOCK_MI_NAMES } from "src/models/blockMIs";
import { MIs } from "./ui/Mis";
import Icon from "./ui/Icon";
import { MIPicker } from "./ui/MIPicker";
import { MICopyNav } from "./ui/MICopyNav";
import { MICopyVars } from "./ui/MICopyVars";

interface SidebarModel {
  store: StoreModel
}

const SidebarStyle = styled.div`
  background: var(--section-bg);
  position: fixed;
  width: var(--sidebar-width);
  left: 0px;
  height: 100vh;
`;

const SplitStyle = styled.div`
  overflow: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  &>div{
    width: 100%;
  }
`;

const TreeBrunchStyle = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 2em;
  transition: all var(--transition);
  align-items: center;
  &.selected{
    background: var(--section-color);
    color: var(--main-color);
    font-weight: bold; 
  }
  &.variable{
    color: var(--variable-color);
  }
  &.copies{
    color: var(--copiedFrom-color);
  }
  &.hidden{
    opacity: 0.5;
  }
  :hover{
    background: var(--app-bg);
    & .triangle:after{
      border-bottom-color: var(--text-color);
    }
    &.selected .triangle:after{
      border-bottom-color: var(--main-color);
    }
  }
  & .triangle{
    width: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
    transform: rotate(180deg);
    cursor: pointer;
    :after{
      content: "";
      --sideborder: 0.4em solid transparent;
      border-left: var(--sideborder);
      border-right: var(--sideborder);
      border-bottom: 0.6em solid var(--app-bg);
      height: 0;
      display: flex;
      width: 0;
      margin-top: -0.15em;
    }
    &.collapsed{
      transform: rotate(90deg);
    }
    &.hidden{
      visibility: hidden;
    }
  }
  & .label{
    cursor: pointer;
    width: 100%;
    min-width: 4em;
    height: 100%;
    padding: 0.4em;
    overflow: hidden;
  }
`;


const Sidebar: FC<SidebarModel> = ({store}) => {

  const handeBrunchClick = (uuid: string) => {
    if(store.state.focusedBlockSelectorID) {
      store.dispach({
        name: ACTION_NAMES.block_setParam,
        payload: {
          paramName: "referenceId",
          value: uuid,
          blockUUID: store.state.focusedBlockSelectorID
        }
      });
    }else{
      store.dispach({
        name: ACTION_NAMES.app_selectBlock,
        payload: uuid
      });
    }
  };

  const handeBlockBrunchCollapce = (block: BlockModel) => {
    store.dispach({
      name: ACTION_NAMES.block_setParam,
      payload: {
        blockUUID: block.uuid,
        paramName: "treeViewCollapseState",
        value: !block.treeViewCollapseState
      }
    });
  };

  const renderChildren: (parentId: string | null, level: number) => React.ReactNode = (parrentId, level) => {
    const brunchChildren: Record<string, string[]> = {};
    store.state.templates?.[0].blocks.map((block, bi, bList) => {
      brunchChildren[block.uuid] = bList.filter(bCh => bCh.parentId === block.uuid).map(b => b.uuid);
    });
    return store.state.templates?.[0].blocks.filter(b => b.parentId === parrentId).map(block => {
      const isHideen = block.menuItems.find(mi => mi.miListItemName === BLOCK_MI_NAMES.display)?.miListItemValue === CSS_DISPLAY_TYPE.none;
      return <div key={block.uuid} >
        <TreeBrunch
          block={block}
          level={level}
          brunchChildren={brunchChildren}
          selected={store.state.selectedBlock === block.uuid}
          onClick={ () => { handeBrunchClick(block.uuid); }}
          onCollapsedChange={() => { handeBlockBrunchCollapce(block); }}
        ></TreeBrunch>
        {!block.treeViewCollapseState && !isHideen && block.contentType === CONTENT_TYPE.fixed && renderChildren(block.uuid, level + (TWO / TWO))}  
      </div>;
    });
  };

  const nonBlock = store.state.selectedBlock === null;
  const MItaget = nonBlock ? MI_TARGET.template : MI_TARGET.block;
  return <SidebarStyle className="sidebar"> 
    <Tabs store={store}></Tabs>
    { store.state.selectedTab === TAB_TYPE.Edit &&
      <Split store={store}>
        <SplitStyle>
          <>
            <MIPicker store={store} target={MItaget}/>   
            <MIs store={store} addableType="fixed" targetType={MItaget}/>
            <MIs store={store} addableType="addable" targetType={MItaget}/>
          </>
        </SplitStyle>
        <SplitStyle>
          {
            renderChildren(null, ZERO)
          }
        </SplitStyle>
      </Split>
    }
    { store.state.selectedTab === TAB_TYPE.Copy &&
      <Split store={store}>
        <SplitStyle>
          <>
            <MICopyNav store={store}/>
            <MICopyVars store={store}></MICopyVars>
          </>
        </SplitStyle>
        <SplitStyle>
        </SplitStyle>
      </Split>
    }
  </SidebarStyle>;
};

interface TreeBrunchModel{
  block: BlockModel
  brunchChildren: Record<string, string[]>
  selected: boolean
  level: number
  onClick: () => void
  onCollapsedChange: () => void
}
const TreeBrunch: FC<TreeBrunchModel> = ({block, brunchChildren, selected, level, onClick, onCollapsedChange}) => {
  const handleMouseEnter:(uuid: string) => void = (uuid) => {
    const target = document.querySelector(`.uuid-${uuid}`);
    if(!target) {
      return;
    }
    target.classList.add("hovered");
  };
  const handleMouseLeave:(uuid: string) => void = (uuid) => {
    const target = document.querySelector(`.uuid-${uuid}`);
    if(!target) {
      return;
    }
    target.classList.remove("hovered");
  };
  const label = block.label.length ? block.label : block.contentValue ? "\"" + block.contentValue.split("\n")[0].substring(ZERO, TWO * TWO * TWO * TWO) + "\"" : block.uuid;
  const colapsedState = block.treeViewCollapseState;
  const isHideen = block.menuItems.find(mi => mi.miListItemName === BLOCK_MI_NAMES.display)?.miListItemValue === CSS_DISPLAY_TYPE.none;
  const isVariable = [CONTENT_TYPE.variable, CONTENT_TYPE.select].includes(block.contentType);
  const isCopylinked = block.contentType === CONTENT_TYPE.copyFrom;
  const getIcon = () => {
    if(!isHideen && !isVariable && !isCopylinked) {
      return <></>;
    }
    const iconType = isHideen ? "hidden" : block.contentType === CONTENT_TYPE.variable ? "variable" : block.contentType === CONTENT_TYPE.select ? "select" : isCopylinked ? "link" : "plus";
    return <Icon style={{
      "marginLeft": ".2em",
      "minWidth":"1em"
    }} iconType={iconType}/>;
  };
  const hasChildren = !!brunchChildren[block.uuid].length;
  return <TreeBrunchStyle
    className={`tree-brunch ${selected ? "selected" : ""} ${isHideen ? "hidden" : ""} ${isVariable ? "variable" : ""} ${isCopylinked ? "copies" : ""}`}
    style={{"paddingLeft":`${ (TWO / TWO) * level }em`}}
    onMouseEnter={() => { handleMouseEnter(block.uuid); }}
    onMouseLeave={() => { handleMouseLeave(block.uuid); }}
  >
    {!isHideen && !isVariable && !isCopylinked && (
      <span
        className={`triangle ${colapsedState ? "collapsed" : ""} ${!hasChildren ? "hidden" : ""}`}
        onClick={() => { hasChildren ? onCollapsedChange() : null; }}
      ></span>
    )}
    {getIcon()}
    <span className="label" onClick={onClick}>{label}</span>
  </TreeBrunchStyle>;
};

export default Sidebar;