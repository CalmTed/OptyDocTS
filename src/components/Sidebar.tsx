import React, { FC } from "react";
import styled from "styled-components";
import { BlockModel, StoreModel } from "src/models/types";
import Tabs from "./Tabs";
import Split from "./ui/Split";
import { ACTION_NAMES, CSS_DISPLAY_TYPE, MI_TARGET, TAB_TYPE, TWO, ZERO } from "src/models/constants";
import { BLOCK_MI_NAMES } from "src/models/blockMIs";
import { MIPicker, MIs } from "./ui/Mis";

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
  transition: all var(--transition);
  &.selected{
    background: var(--section-color);
    color: var(--main-color);
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
    width: auto;
    min-width: 4em;
    height: 100%;
    padding: 0.4em;
    overflow: hidden;
  }
`;


const Sidebar: FC<SidebarModel> = ({store}) => {

  const handeBlockSelect = (uuid: string) => {
    store.dispach({
      name: ACTION_NAMES.app_selectBlock,
      payload: uuid
    });
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
      return <div key={block.uuid} >
        <TreeBrunch
          block={block}
          level={level}
          brunchChildren={brunchChildren}
          selected={store.state.selectedBlock === block.uuid}
          onClick={ () => { handeBlockSelect(block.uuid); }}
          onCollapsedChange={() => { handeBlockBrunchCollapce(block); }}
        ></TreeBrunch>
        {!block.treeViewCollapseState && renderChildren(block.uuid, level + (TWO / TWO))}
      </div>;
    });
  };

  const nonBlock = store.state.selectedBlock === null;
  const MItaget = nonBlock ? MI_TARGET.template : MI_TARGET.block;
  return <SidebarStyle> 
    <Tabs store={store}></Tabs>
    { store.state.selectedTab === TAB_TYPE.Edit &&
      <Split store={store}>
        <SplitStyle>
          <>
            <MIs store={store} addableType="fixed" targetType={MItaget}/>
            <MIPicker store={store} target={MItaget}/>   
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
  const label = block.label.length ? block.label : block.uuid;
  const colapsedState = block.treeViewCollapseState;
  const isHideen = block.menuItems.find(mi => mi.miListItemName === BLOCK_MI_NAMES.display)?.miListItemValue === CSS_DISPLAY_TYPE.none;
  const hasChildren = !!brunchChildren[block.uuid].length;
  return <TreeBrunchStyle 
    className={`${selected ? "selected" : ""} ${isHideen ? "hidden" : ""}`}
    style={{"paddingLeft":`${ (TWO / TWO) * level }em`}}
    onMouseEnter={() => { handleMouseEnter(block.uuid); }}
    onMouseLeave={() => { handleMouseLeave(block.uuid); }}
  >
    <span
      className={`triangle ${colapsedState ? "collapsed" : ""} ${!hasChildren ? "hidden" : ""}`}
      onClick={() => { hasChildren ? onCollapsedChange() : null; }}
    ></span>
    <span className="label" onClick={onClick}>{label}</span>
  </TreeBrunchStyle>;
};

export default Sidebar;