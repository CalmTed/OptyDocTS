import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { ActionModel, AppStateModel, StoreModel } from "src/models/types";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Toast from "./ui/Toast";
import Prompt from "./ui/Prompt";
import useUI from "src/store/useUI";
import createT from "src/store/translation";
import Stack from "./Stack";
import { ACTION_NAMES, ONE, ZERO } from "src/models/constants";

interface PageModel {
  state: AppStateModel
  dispach: (arg: ActionModel) => void
}

const PageStyle = styled.div`
  --app-bg: #4C4C4C;
  --section-bg: #222222;
  --text-color: #D8D8D8;
  --main-color: #ECCF03;
  --second-color: #14ABF3;
  --main-button-bg: radial-gradient(83.75% 83.75% at 8.75% 93.75%, #ECCF03 0%, #14ABF3 100%);
  --main-button-text: #222222;
  --shadow-color: #222;
  &.light{
    --app-bg: #d9d9d9;
    --section-bg: #eeeeee;
    --text-color: #222222;
    --main-color: #14ABF3;
    --second-color: #ECCF03;
    --main-button-bg: radial-gradient(83.75% 83.75% at 8.75% 93.75%, #14ABF3 0%, #ECCF03 100%);
    --shadow-color: #888;
  }
  @media (prefers-color-scheme: light) {
    &.auto{
      --app-bg: #d9d9d9;
      --section-bg: #eeeeee;
      --text-color: #222222;
      --main-color: #14ABF3;
      --second-color: #ECCF03;
      --main-button-bg: radial-gradient(83.75% 83.75% at 8.75% 93.75%, #14ABF3 0%, #ECCF03 100%);
      --shadow-color: #888;
    }
  }
  --transition: .1s ease-in;
  --topbar-height: 3em;
  --sidebar-width: 20em;
  --sidebar-padding: 0.6em;
  --border-radius: 8px;
  --box-shadow: 0 0 .8em 0 var(--shadow-color);

  --z-select-list: 2000;
  --z-prompt-backdrop: 1000;
  --z-prompt-block: 1500;
  --z-toast: 1600;

  font-family: Roboto, Arial, Sans-serif;
  font-size: 13pt;

  background: var(--app-bg);
  color: var(--text-color);
  width: 100vw;
  height: 100vh;
  transition: background var(--transition);

  & *::-webkit-scrollbar-track {
    background-color: transparent;
  }
  & *::-webkit-scrollbar {
    width: 0.7em;
    height: 0.7em;
    background-color: transparent;
  }
  & *::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--app-bg); 
    border: 2px solid var(--section-bg);
    cursor: pointer;
  }
`;



const Page: FC<PageModel> = ({state, dispach}) => {

  const {toast, prompt, showToast, showAlert, showConfirm, showPrompt} = useUI();
  const t = createT(state.langCode);
  const store: StoreModel = {
    state,
    dispach,
    showToast,
    showAlert,
    showConfirm,
    showPrompt,
    t
  };
  useEffect(() => {
    const setZoom: (arg: number, reset?: boolean) => void =  (arg, reset = false) => {
      const getNewZoom: (zoom: number, portion: number) => number = (zoom, portion) => {
        const min = 0.1;
        const max = 10;
        const boundSafePostion = (zoom <= min && portion < ZERO) ? ZERO : (zoom > max && portion > ZERO) ? ZERO : portion;
        const a = 0.5;
        const factor = boundSafePostion * (Math.pow(zoom, a)) || ZERO;
        return zoom + factor < min ? min : zoom + factor > max ? max : zoom + factor;
      };
      const newZoom = reset ? ONE : getNewZoom(store.state.zoomByTab[store.state.selectedTab], arg);
      dispach({
        name: ACTION_NAMES.app_setZoom,
        payload: newZoom
      });
      const sto = 100;
      store.showToast(`${Math.round(newZoom * sto)}%`);
    };
    
    const handleWheel = (e: WheelEvent) => {
      if(e.ctrlKey) {
        e.preventDefault();
        const SCROLLFACTOR = 500;
        setZoom((-e.deltaY / SCROLLFACTOR));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if(e.ctrlKey && (e.key === "-" || e.key === "=" || e.key === "0")) {
        e.preventDefault();
        const zoomKoof = 0.1;
        const zoomDelta = e.key === "-" ? -zoomKoof : zoomKoof;
        setZoom(zoomDelta, e.key === "0");
      }
    };
    document.addEventListener("wheel", handleWheel, {passive: false});
    document.addEventListener("keydown", handleKeyUp, {passive: false});
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyUp);
    };
  });

  return <PageStyle className={state.theme}>
    <Topbar store={store}></Topbar>
    <Sidebar store={store}></Sidebar>
    <Stack store={store}></Stack>
    <Toast toast={toast}></Toast>
    <Prompt t={t} prompt={prompt}></Prompt>
  </PageStyle>;
};

export default Page;