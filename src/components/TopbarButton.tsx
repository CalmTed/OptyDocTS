import React, { FC } from "react";
import styled from "styled-components";
import { ACTION_NAMES, THEME_TYPE } from "src/models/constants";
import { StoreModel } from "src/models/types";
import { IconTypeKey } from "src/models/icons";

interface TopbarButtonModel {
  store: StoreModel
  iconType: IconTypeKey
}

const TopbarButtonStyle = styled.div`
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity var(--transition);
  :hover{
    cursor: pointer;
    opacity: 0.7;
  }
`;

const TopbarButton: FC<TopbarButtonModel> = ({store, iconType}) => {
  const handleClick = () => {
    const nextTheme = store.state.theme === THEME_TYPE.light ? THEME_TYPE.dark : store.state.theme === THEME_TYPE.dark ? THEME_TYPE.auto : THEME_TYPE.light;
    store.showPrompt("Enter password", "You can just enter 123", (result: string) => {
      if(result !== "123") {
        store.showToast("Wrong password");
        return null;
      }
      store.showToast(nextTheme);
      store.dispach({
        name: ACTION_NAMES.app_setTheme,
        payload: nextTheme
      });
    }); 
  };
  return <TopbarButtonStyle onClick={handleClick}>
    {iconType}
  </TopbarButtonStyle>;
};

export default TopbarButton;