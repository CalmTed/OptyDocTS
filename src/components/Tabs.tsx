import React, { FC } from "react";
import { ACTION_NAMES, TAB_TYPE } from "src/models/constants";
import { StoreModel } from "src/models/types";
import styled from "styled-components";

const TabListStyle = styled.div`
  display: flex;
`;

const TabStyle = styled.div`
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all var(--transition);
  border-bottom: 0px solid var(--main-color);
  margin-bottom: 3px;
  font-weight: bold;
  font-size: 90%;
  text-transform: uppercase;
  :hover{
    cursor: pointer;
    opacity: 0.7;
  }
  &.selected{
    border-bottom-width: 3px;
    margin-bottom: 0px;
    color: var(--main-color);
  }
`;

const Tabs: FC<{store: StoreModel }> = ({store}) => {
  const handleClick: (arg: TAB_TYPE) => void = (tab) => {
    store.dispach({
      name: ACTION_NAMES.app_setTab,
      payload: tab
    });
  };
  return <TabListStyle>
    {
      Object.keys(TAB_TYPE).map(tab => {
        return <TabStyle key={tab} onClick={() => handleClick(tab as TAB_TYPE)} className={store.state.selectedTab === tab ? "selected" : ""}>
          {store.t(`sideBar${tab as TAB_TYPE}`)}
        </TabStyle>;
      })
    }
  </TabListStyle>;
};

export default Tabs;