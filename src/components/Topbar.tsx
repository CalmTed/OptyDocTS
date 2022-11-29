import React, { FC } from "react";
import styled from "styled-components";
import { StoreModel } from "src/models/types";
import TopbarButton from "./TopbarButton";
import { ACTION_NAMES, THEME_TYPE } from "src/models/constants";
import { LANG_CODES } from "src/store/translation";
import { getInitialTamplate } from "src/models/intials";

interface TopbarModel {
  store: StoreModel
}

const TopbarStyle = styled.div`
  background: var(--section-bg);
  position: fixed;
  width: calc(100vw - var(--sidebar-width));
  padding-left: var(--sidebar-width);
  transition: all var(--transition);
  height: 3em;
  display: flex;
  justify-content: space-between;
  & .templateTools, & .appTools{
    display: flex;
    wlex-wrap: wrap;
    width: 50%;
    justify-content: flex-start;
  }
  & .appTools{
    justify-content: flex-end;
  }
`;

const Topbar: FC<TopbarModel> = ({store}) => {
  const handleNewBlock = () => {
    store.dispach({
      name: ACTION_NAMES.template_addBlock
    });
  };
  const handleRemoveBlock = () => {
    store.dispach({
      name: ACTION_NAMES.template_removeBlock
    });
  };
  const handleTheme = () => {
    const nextTheme = store.state.theme === THEME_TYPE.light ? THEME_TYPE.dark : store.state.theme === THEME_TYPE.dark ? THEME_TYPE.auto : THEME_TYPE.light;
    store.dispach({
      name: ACTION_NAMES.app_setTheme,
      payload: nextTheme
    });
  };
  const handleLanguage = () => {
    const nextLang = store.state.langCode === LANG_CODES[0] ? LANG_CODES[1] : LANG_CODES[0];
    store.dispach({
      name: ACTION_NAMES.app_setLangCode,
      payload: nextLang
    });
  };
  const handleNewTemplate = () => {
    store.showConfirm(store.t("uiConfirmNewTemplateHeader"), store.t("uiConfirmNewTemplateText"), () => {
      store.showToast(store.t("uiNewTemplateCreated"));
      store.dispach({
        name: ACTION_NAMES.app_setTemplate,
        payload: getInitialTamplate()
      });
    });
  };
  const handleSelectNone = () => {
    store.dispach({
      name: ACTION_NAMES.app_selectBlock,
      payload: null
    });
  };

  return <TopbarStyle>
    <div className="templateTools">
      <TopbarButton iconType="newBlock" onClick={handleNewBlock}></TopbarButton>
      <TopbarButton iconType="removeBlock" onClick={handleRemoveBlock} disabled={!store.state.selectedBlock}></TopbarButton>
      <TopbarButton iconType="minus" onClick={handleSelectNone} disabled={!store.state.selectedBlock}></TopbarButton>
    </div>
    <div className="appTools">
      <TopbarButton iconType="import" onClick={() => { null; }} disabled={true}></TopbarButton>
      <TopbarButton iconType="export" onClick={() => { null; }} disabled={true}></TopbarButton>
      <TopbarButton iconType="newTemplate" onClick={handleNewTemplate} disabled={ store.state.templates?.[0] ? !store.state.templates?.[0]?.dateEdited || false : false}></TopbarButton>
      <TopbarButton
        iconType={store.state.theme === "light" ? "sun" : store.state.theme === "dark" ? "moon" : "autoTheme"}
        onClick={handleTheme}
      ></TopbarButton>
      <TopbarButton iconType="setting" onClick={handleLanguage}></TopbarButton>
    </div>


  </TopbarStyle>;
};

export default Topbar;