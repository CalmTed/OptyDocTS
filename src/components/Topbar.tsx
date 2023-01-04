import React, { FC } from "react";
import styled from "styled-components";
import { BlockModel, StoreModel, TemplateModel } from "src/models/types";
import TopbarButton from "./TopbarButton";
import { ACTION_NAMES, CONTENT_TYPE, ONE, TAB_TYPE, THEME_TYPE, TWO, ZERO } from "src/models/constants";
import { LANG_CODES } from "src/store/translation";
import { getInitialTamplate } from "src/models/intials";
import { copyTextToClipboard, decodeBlock, encodeBlock } from "src/store/copyPaste";
import { exportTemplate, importTemplate } from "src/store/templateFileMethods";
import { copyTableToCSV, exportAsCSV, importCopyRows } from "src/store/copyTableFileMethods";

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
      const target = (e.target as HTMLInputElement);
      const file = target.files?.[0] as Blob;
      if(!file) {
        return;
      }
      target.value = "";
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
    },
    handleSetCopy: (arg: "next" | "prev") => {
      const currentCopy = store.state.templates[0].copyRows.find(row => row.uuid === store.state.selectedCopy);
      const targetCopyIndex = arg === "next" ? currentCopy ? store.state.templates[0].copyRows.indexOf(currentCopy) + ONE : undefined : currentCopy ? store.state.templates[0].copyRows.indexOf(currentCopy) - ONE : null;
      if(typeof targetCopyIndex === "undefined") {
        return;
      }
      store.dispach({
        name: ACTION_NAMES.app_selectCopy,
        payload: targetCopyIndex !== null ? store.state.templates[0].copyRows[targetCopyIndex].uuid : targetCopyIndex
      });
    },
    openCSV: (e: React.ChangeEvent) => {
      const target = (e.target as HTMLInputElement);
      const file = target.files?.[0] as Blob;
      if(!file) {
        return;
      }
      target.value = "";
      importCopyRows(store.state.templates[0].copyColumns, file, (rows) => {
        if(rows !== null) {
          store.dispach({
            name: ACTION_NAMES.template_setCopyRows,
            payload: {rows}
          });
          store.showToast("copies imported");
        }else{
          store.showToast("table error");
        }
      });
    },
    saveCSV: () => {
      exportAsCSV(copyTableToCSV(store.state.templates[0].copyRows, store.state.templates[0].copyColumns), `${store.state.templates[0].name}_data.csv`);
      store.showToast("coming soon");
    }
  };
};
const Topbar: FC<TopbarModel> = ({store}) => {
  const methods = topBarMethods(store);
  const isSelectedBlockFixed = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock)?.contentType === CONTENT_TYPE.fixed;
  const copySelected = store.state.templates[0].copyRows.find(row => row.uuid === store.state.selectedCopy);
  const indexOfSelectedCopyRow = copySelected ? store.state.templates[0].copyRows.indexOf(copySelected) + ONE : false;
  const isFirstCopy = indexOfSelectedCopyRow ? indexOfSelectedCopyRow < TWO : true;
  const isLastCopy = indexOfSelectedCopyRow ? indexOfSelectedCopyRow === store.state.templates[0].copyRows.length : true;
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
            <TopbarButton title={store.t("topBarAddCopy")} iconType="plus" onClick={methods.handleAddCopy} disabled={!store.state.templates[0].copyColumns.length}></TopbarButton>
            <TopbarButton title={store.t("topBarRemoveCopy")} iconType="minus" onClick={methods.handleRemoveCopy} disabled={!store.state.selectedCopy}></TopbarButton>
            <TopbarButton title={store.t("topBarPreviusCopy")} iconType="left" onClick={() => methods.handleSetCopy("prev")} disabled={isFirstCopy}></TopbarButton>
            <TopbarButton title={store.t("topBarNextCopy")} iconType="right" onClick={() => methods.handleSetCopy("next")} disabled={isLastCopy}></TopbarButton>
            <label>
              <TopbarButton title={store.t("topBarImportCSV")} iconType="hash" onClick={() => null} disabled={!store.state.templates[0].copyColumns.length}></TopbarButton>
              <input style={{"display":"none"}} type="file" onChange={methods.openCSV}></input>
            </label>
            <TopbarButton title={store.t("topBarExportCSV")} iconType="download" onClick={methods.saveCSV} disabled={!store.state.templates[0].copyRows.length}></TopbarButton>
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