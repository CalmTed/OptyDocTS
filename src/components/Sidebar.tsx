import React, { FC } from "react";
import styled from "styled-components";
import { BlockModel, StoreModel } from "src/models/types";
import Tabs from "./Tabs";
import Split from "./ui/Split";
import { ACTION_NAMES, TAB_TYPE, TWO, ZERO } from "src/models/constants";
import MenuItemTemplate from "./MenuItemTemplate";
import MenuItemBlock from "./MenuItemBlock";

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

const TreeBrunchStyle = styled.div`
  display: flex;
  &.selected{
    background: var(--section-color);
    color: var(--main-color);
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
  }
  & .label{
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 0.4em;
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
    return store.state.templates?.[0].blocks.filter(b => b.parentId === parrentId).map(block => {
      return <div key={block.uuid} >
        <TreeBrunch
          label={block.label.length ? block.label : block.uuid}
          level={level}
          colapsedState={block.treeViewCollapseState}
          selected={store.state.selectedBlock === block.uuid}
          onClick={ () => { handeBlockSelect(block.uuid); }}
          onCollapsedChange={() => { handeBlockBrunchCollapce(block); }}
        ></TreeBrunch>
        {!block.treeViewCollapseState && renderChildren(block.uuid, level + (TWO / TWO))}
      </div>;
    });
  };

  return <SidebarStyle> 
    <Tabs store={store}></Tabs>
    { store.state.selectedTab === TAB_TYPE.Edit &&
      <Split store={store}>
        <div style={{
          "overflow":"auto",
          "height":"100%"
        }}>
          {
            store.state.selectedBlock === null &&
            store.state.templates?.[0].menuItems.map(mi => {
              return <MenuItemTemplate key={mi.uuid} store={store} mi={mi}/>;
            })
          }
          {
            store.state.selectedBlock !== null &&
            store.state.templates[0] &&
            store.state.templates[0].blocks &&
            store.state.templates?.[0].blocks.find(b => b.uuid === store.state.selectedBlock)?.menuItems.map(mi => {
              return <MenuItemBlock key={mi.uuid} store={store} mi={mi}/>;
            })
          }
        </div>
        <div style={{
          "overflow":"auto",
          "height":"100%"
        }}>
          {
            renderChildren(null, ZERO)
          }
        </div>
      </Split>
    }
  </SidebarStyle>;
};

interface TreeBrunchModel{
  label: string
  level: number
  colapsedState: boolean
  selected: boolean
  onClick: () => void
  onCollapsedChange: () => void
}

const TreeBrunch: FC<TreeBrunchModel> = ({label, level, colapsedState, selected, onClick, onCollapsedChange}) => {
  return <TreeBrunchStyle 
    className={`${selected ? "selected" : ""}`}
    style={{"paddingLeft":`${ (TWO / TWO) * level }em`}}
  >
    <span
      className={`triangle ${colapsedState ? "collapsed" : ""}`}
      onClick={onCollapsedChange}
    ></span>
    <span className="label" onClick={onClick}>{label}</span>
  </TreeBrunchStyle>;
};

export default Sidebar;