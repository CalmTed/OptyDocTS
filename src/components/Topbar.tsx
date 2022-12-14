import React, { FC } from "react";
import styled from "styled-components";
import { BlockModel, StoreModel } from "src/models/types";
import TopbarButton from "./TopbarButton";
import { ACTION_NAMES, CONTENT_TYPE, THEME_TYPE } from "src/models/constants";
import { LANG_CODES } from "src/store/translation";
import { getInitialTamplate } from "src/models/intials";
import { copyTextToClipboard, decodeBlock, encodeBlock } from "src/store/copyPaste";

interface TopbarModel {
  store: StoreModel
}

const TopbarStyle = styled.div`
  background: var(--section-bg);
  position: fixed;
  width: calc(100vw - var(--sidebar-width));
  padding-left: var(--sidebar-width);
  transition: all var(--transition);
  height: var(--topbar-height);
  display: flex;
  justify-content: space-between;
  & .templateTools, & .appTools{
    display: flex;
    wlex-wrap: wrap;
    max-width: 50%;
    overflow-x: auto;
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
  // const handleSelectNone = () => {
  //   store.dispach({
  //     name: ACTION_NAMES.app_selectBlock,
  //     payload: null
  //   });
  // };

  const handleCopy = () => {
    const selectedBlock = store.state.templates[0].blocks.find(block => block.uuid === store.state.selectedBlock);
    if(!selectedBlock) {
      store.showToast(store.t("uiNoBlockSelected"), "alert");
    }else{
      const getChildren: (parentId:string | null) => BlockModel[] = (parentId) => {
        let ret:BlockModel[] = [];
        store.state.templates[0].blocks.filter(block => block.parentId === parentId).map(block => {
          ret = [...ret, block, ...getChildren(block.uuid)];
        });
        return ret;
      };
      const selectedBlockchildren = getChildren(store.state.selectedBlock);
      const textToSave = encodeBlock(selectedBlock, selectedBlockchildren);
      copyTextToClipboard(textToSave);
      store.showToast(store.t("uiBlockCopiedToClipboard"), "info");
    }
  };
  const handlePaste = (isPasteBefore: boolean) => {
    store.showPrompt(store.t("uiPasteHeader"), store.t("uiPasteText"), (text) => {
      const {result, block, children} = decodeBlock(text);
      const selectedBlock = store.state.selectedBlock || null;
      if(!result || !block) {
        store.showToast(store.t("uiBlockDecodingProblem"), "alert");
      } else {
        if(!isPasteBefore) {
          store.dispach({
            name:ACTION_NAMES.template_addBlockInside,
            payload: {
              block: block,
              children: children || [],
              parentId: selectedBlock
            }
          });
        }else{
          if(selectedBlock) {
            store.dispach({
              name:ACTION_NAMES.template_addBlockBefore,
              payload: {
                block: block,
                children: children || [],
                successorId: selectedBlock
              }
            });
          }else{
            store.showToast(store.t("uiNoBlockSelected"));
          }
        }
      }
    });
  };
  const isSelectedBlockFixed = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock)?.contentType === CONTENT_TYPE.fixed;
  return <TopbarStyle>
    <div className="templateTools">
      <TopbarButton title={store.t("topBarAddBlock")} iconType="newBlock" onClick={handleNewBlock} disabled={!isSelectedBlockFixed && !!store.state.selectedBlock}></TopbarButton>
      <TopbarButton title={store.t("topBarRemoveBlock")} iconType="removeBlock" onClick={handleRemoveBlock} disabled={!store.state.selectedBlock}></TopbarButton>
      {/* <TopbarButton iconType="minus" onClick={handleSelectNone} disabled={!store.state.selectedBlock}></TopbarButton> */}
      <TopbarButton title={store.t("topBarCopyBlock")} iconType="copy" onClick={handleCopy} disabled={!store.state.selectedBlock}></TopbarButton>
      <TopbarButton title={store.t("topBarPasteInside")} iconType="paste" onClick={() => handlePaste(false)} ></TopbarButton>
      <TopbarButton title={store.t("topBarPasteBefore")} iconType="pasteBefore" onClick={() => handlePaste(true)} disabled={!store.state.selectedBlock} ></TopbarButton>
    </div>
    <div className="appTools">
      <TopbarButton title={store.t("topBarImportTemplate")} iconType="import" onClick={() => { null; }} disabled={true}></TopbarButton>
      <TopbarButton title={store.t("topBarExportTemplate")} iconType="export" onClick={() => { null; }} disabled={true}></TopbarButton>
      <TopbarButton title={store.t("topBarNewTemplate")} iconType="newTemplate" onClick={handleNewTemplate} disabled={ store.state.templates?.[0] ? !store.state.templates?.[0]?.dateEdited || false : false}></TopbarButton>
      <TopbarButton
        title={store.t("topBarChangeTheme")}
        iconType={store.state.theme === "light" ? "sun" : store.state.theme === "dark" ? "moon" : "autoTheme"}
        onClick={handleTheme}
      ></TopbarButton>
      <TopbarButton title={store.t("topBarChangeLanguage")} iconType="setting" onClick={handleLanguage}></TopbarButton>
    </div>
  </TopbarStyle>;
};

export default Topbar;