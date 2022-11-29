import React, { FC } from "react";
import styled from "styled-components";
import { StoreModel } from "src/models/types";
import Tabs from "./Tabs";
import Split from "./ui/Split";
import { TAB_TYPE } from "src/models/constants";
import MenuItemTemplate from "./MenuItemTemplate";

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


const Sidebar: FC<SidebarModel> = ({store}) => {


  return <SidebarStyle> 
    <Tabs store={store}></Tabs>
    { store.state.selectedTab === TAB_TYPE.Edit &&
      <Split store={store}>
        <div style={{
          "overflow":"auto",
          "height":"100%"
        }}>
          {store.state.templates[0].menuItems.map(mi => {
            return <MenuItemTemplate key={mi.uuid} store={store} mi={mi}/>;
          })}
        </div>
        <div>Tree view</div>
      </Split>
    }
  </SidebarStyle>;
};

export default Sidebar;