import React, { FC } from "react";
import styled from "styled-components";
import { StoreModel } from "src/models/types";
import TopbarButton from "./TopbarButton";

interface TopbarModel {
  store: StoreModel
}

const TopbarStyle = styled.div`
  background: var(--section-bg);
  position: fixed;
  width: 100vw;
  padding-left: var(--sidebar-width);
  transition: all var(--transition);
  height: 3em;
`;

const Topbar: FC<TopbarModel> = ({store}) => {
  return <TopbarStyle>
    <TopbarButton store={store} iconType={store.state.theme === "light" ? "sun" : store.state.theme === "dark" ? "moon" : "autoTheme"}></TopbarButton>
  </TopbarStyle>;
};

export default Topbar;