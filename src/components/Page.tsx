import React, { FC } from "react";
import styled from "styled-components";
import { THEME_TYPE } from "src/models/constants";
import { ActionModel, AppStateModel, StoreModel } from "src/models/types";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Toast from "./ui/Toast";
import Prompt from "./ui/Prompt";
import useUI from "src/store/useUI";

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
  &.light{
    --app-bg: #d9d9d9;
    --section-bg: #eeeeee;
    --text-color: #222222;
    --main-color: #14ABF3;
    --second-color: #ECCF03;
    --main-button-bg: radial-gradient(83.75% 83.75% at 8.75% 93.75%, #14ABF3 0%, #ECCF03 100%);
  }
  --transition: .1s ease-in;
  --sidebar-width: 20em;
  --border-radius: 4px;

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
`;



const Page: FC<PageModel> = ({state, dispach}) => {

  const {toast, prompt, showToast, showAlert, showConfirm, showPrompt} = useUI();

  const store: StoreModel = {
    state: state,
    dispach: dispach,
    showToast: showToast,
    showAlert: showAlert,
    showConfirm: showConfirm,
    showPrompt: showPrompt
  };

  return <PageStyle className={state.theme === THEME_TYPE.light ? THEME_TYPE.light : THEME_TYPE.dark}>
    <Topbar store={store}></Topbar>
    <Sidebar store={store}></Sidebar>
    <Toast toast={toast}></Toast>
    <Prompt prompt={prompt}></Prompt>
  </PageStyle>;
};

export default Page;