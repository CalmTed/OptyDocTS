import React, { FC } from "react";
import styled from "styled-components";
import { ActionModel, AppStateModel, StoreModel } from "src/models/types";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Toast from "./ui/Toast";
import Prompt from "./ui/Prompt";
import useUI from "src/store/useUI";
import createT from "src/store/translation";

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
  @media (prefers-color-scheme: light) {
    &.auto{
      --app-bg: #d9d9d9;
      --section-bg: #eeeeee;
      --text-color: #222222;
      --main-color: #14ABF3;
      --second-color: #ECCF03;
      --main-button-bg: radial-gradient(83.75% 83.75% at 8.75% 93.75%, #14ABF3 0%, #ECCF03 100%);
    }
  }
  --transition: .1s ease-in;
  --sidebar-width: 20em;
  --border-radius: 8px;

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

  return <PageStyle className={state.theme}>
    <Topbar store={store}></Topbar>
    <Sidebar store={store}></Sidebar>
    <Toast toast={toast}></Toast>
    <Prompt t={t} prompt={prompt}></Prompt>
  </PageStyle>;
};

export default Page;