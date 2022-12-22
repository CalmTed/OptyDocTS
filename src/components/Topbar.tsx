import React, { FC } from "react";
import styled from "styled-components";
import { BlockModel, StoreModel, TemplateModel } from "src/models/types";
import TopbarButton from "./TopbarButton";
import { ACTION_NAMES, CONTENT_TYPE, TAB_TYPE, THEME_TYPE, ZERO } from "src/models/constants";
import { LANG_CODES } from "src/store/translation";
import { getInitialTamplate } from "src/models/intials";
import { copyTextToClipboard, decodeBlock, encodeBlock } from "src/store/copyPaste";
import { exportTemplate, importTemplate } from "src/store/importExport";

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

const topBarMethods = (store: StoreModel) => {
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
  return {
    handleNewBlock: () => {
      store.dispach({
        name: ACTION_NAMES.template_addBlock
      });
    },
    handleRemoveBlock: () => {
      store.dispach({
        name: ACTION_NAMES.template_removeBlock
      });
    },
    handleTheme: () => {
      const nextTheme = store.state.theme === THEME_TYPE.light ? THEME_TYPE.dark : store.state.theme === THEME_TYPE.dark ? THEME_TYPE.auto : THEME_TYPE.light;
      store.dispach({
        name: ACTION_NAMES.app_setTheme,
        payload: nextTheme
      });
    },
    handleLanguage: () => {
      const nextLang = store.state.langCode === LANG_CODES[0] ? LANG_CODES[1] : LANG_CODES[0];
      store.dispach({
        name: ACTION_NAMES.app_setLangCode,
        payload: nextLang
      });
    },
    handleNewTemplate: () => {
      store.showConfirm(store.t("uiConfirmNewTemplateHeader"), store.t("uiConfirmNewTemplateText"), () => {
        store.showToast(store.t("uiNewTemplateCreated"), "newTemplate");
        store.dispach({
          name: ACTION_NAMES.app_setTemplate,
          payload: getInitialTamplate()
        });
      });
    },
    handleCopy,
    handlePaste: (isPasteBefore: boolean) => {
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
    },
    handleCut: () => {
      handleCopy();
      store.dispach({
        name: ACTION_NAMES.template_removeBlock
      });
    },
    handleDuplicate: () => {
      const block = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock);
      if(!block) {
        return;
      }
      const getChildren: (parentId:string | null) => BlockModel[] = (parentId) => {
        let ret:BlockModel[] = [];
        store.state.templates[0].blocks.filter(block => block.parentId === parentId).map(block => {
          ret = [...ret, block, ...getChildren(block.uuid)];
        });
        return ret;
      };
      store.dispach({
        name:ACTION_NAMES.template_addBlockInside,
        payload: {
          block: block,
          children: getChildren(block.uuid) || [],
          parentId: block?.parentId
        }
      });
    },
    handlePrint: () => {
      window.print();
    },
    handleExport: () => {
      store.showToast(store.t("uiTemplateExporting"), "export");
      exportTemplate(store.state.templates[0], () => {
        store.showToast(store.t("uiTemplateExportred"), "export");
      });
    },
    handleImport: (e: React.ChangeEvent) => {
      const file = (e.target as HTMLInputElement).files?.[0] as Blob;
      if(!file) {
        return;
      }
      importTemplate(file, (result: TemplateModel | null) => {
        if(!result) {
          store.showToast(store.t("uiTemplateDecodingProblem"), "alert");
          return;
        }
        store.dispach({
          name: ACTION_NAMES.app_setTemplate,
          payload: result
        });
        store.showToast(store.t("uiTemplateImported"), "import");
      });
      store.showToast(store.t("uiTemplateImporting"), "import");
    },
    handleAddCopy: () => {
      store.dispach({
        name: ACTION_NAMES.template_addCopy
      });
    },
    handleRemoveCopy: () => {
      if(!store.state.selectedCopy) {
        return;
      }
      store.dispach({
        name: ACTION_NAMES.template_removeCopy,
        payload: {
          copyUUID: store.state.selectedCopy
        }
      });
    }
  };
};
const Topbar: FC<TopbarModel> = ({store}) => {
  const methods = topBarMethods(store);
  const isSelectedBlockFixed = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock)?.contentType === CONTENT_TYPE.fixed;
  return <TopbarStyle className="topbar">
    <div className="templateTools">
      {
        store.state.selectedTab === TAB_TYPE.Edit &&
          <>
            <TopbarButton title={store.t("topBarAddBlock")} iconType="newBlock" onClick={methods.handleNewBlock} disabled={!isSelectedBlockFixed && !!store.state.selectedBlock}></TopbarButton>
            <TopbarButton title={store.t("topBarPasteInside")} iconType="paste" onClick={() => methods.handlePaste(false)} disabled={!isSelectedBlockFixed && !!store.state.selectedBlock}></TopbarButton>
            {store.state.selectedBlock && <>
              <TopbarButton title={store.t("topBarPasteBefore")} iconType="pasteBefore" onClick={() => methods.handlePaste(true)}></TopbarButton>
              <TopbarButton title={store.t("topBarRemoveBlock")} iconType="removeBlock" onClick={methods.handleRemoveBlock}></TopbarButton>
              <TopbarButton title={store.t("topBarCopyBlock")} iconType="copy" onClick={methods.handleCopy}></TopbarButton>
              <TopbarButton title={store.t("topBarCutBlock")} iconType="cut" onClick={methods.handleCut}></TopbarButton>
              <TopbarButton title={store.t("topBarDuplicateBlock")} iconType="duplicate" onClick={methods.handleDuplicate}></TopbarButton>
            </>}
          </>
      }
      {
        store.state.selectedTab === TAB_TYPE.Copy &&
          <>
            <TopbarButton title={(console.log("TODO"), undefined)} iconType="plus" onClick={() => methods.handleAddCopy()} ></TopbarButton>
            <TopbarButton title={(console.log("TODO"), undefined)} iconType="minus" onClick={() => methods.handleRemoveCopy()} disabled={!store.state.selectedCopy}></TopbarButton>
          </>
      }
    </div>
    <div className="appTools">
      <TopbarButton title={store.t("topBarPrint")} iconType="print" onClick={methods.handlePrint} disabled={ store.state.templates[0].blocks.length === ZERO }></TopbarButton>
      <label>
        <TopbarButton title={store.t("topBarImportTemplate")} iconType="import" onClick={() => null}></TopbarButton>
        <input style={{"display":"none"}} type="file" onChange={methods.handleImport}></input>
      </label>
      <TopbarButton title={store.t("topBarExportTemplate")} iconType="export" onClick={methods.handleExport} disabled={store.state.lastChange === ZERO}></TopbarButton>
      <TopbarButton title={store.t("topBarNewTemplate")} iconType="newTemplate" onClick={methods.handleNewTemplate} disabled={ store.state.templates?.[0] ? !store.state.templates?.[0]?.dateEdited || false : false}></TopbarButton>
      <TopbarButton
        title={store.t("topBarChangeTheme")}
        iconType={store.state.theme === "light" ? "sun" : store.state.theme === "dark" ? "moon" : "autoTheme"}
        onClick={methods.handleTheme}
      ></TopbarButton>
      <TopbarButton title={store.t("topBarChangeLanguage")} iconType="setting" onClick={methods.handleLanguage}></TopbarButton>
    </div>
  </TopbarStyle>;
};

export default Topbar;