import React, { FC, useEffect, useState } from "react";
import { ZERO } from "src/models/constants";
import { IconTypeKey } from "src/models/icons";
import { WordType } from "src/store/translation";
import styled from "styled-components";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";

interface PromptInterface{
  t: (arg: WordType) => string
  prompt: {
    header: string
    text: string
    type: "alert" | "confirm" | "prompt"
    isShown: boolean
    lastUpdateTime: number
    onCancel: () => void
    onConfirm: () => void
    onProceed: (result: string) => void
    icon?: IconTypeKey
  }
}

const PromptStyle = styled.div`
  position: fixed;
  top: 4em;
  left: 0;
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  & .promptBlock{
    padding: 1.5em;
    min-width: 10em;
    max-width: 20em;
    min-height: 1em;
    background: var(--section-bg);
    border-radius: var(--border-radius);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    transform: translateY(10px);
    z-index: var(--z-prompt-block);
    border: 1px solid var(--main-color);
    & #promptHeader{
      margin: 0;
      width: 100%;
      display: flex;
      align-items: center;
      & .icon{
        font-size: 1.6em;
        margin-right: 0.5em;
      }
    }
    & #promptText{
      margin-top: 0.5em;
      width: 100%;
    }
    & .promptInput{
      width: 100%;
      margin-bottom: 1em;
    }
  }
  &.shown .promptBlock{
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
  }
  & .promptBackdrop{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);

    transition: all var(--transition);
    opacity: 0;
    visibility: hidden;
    z-index: var(--z-prompt-backdrop);
  }
  &.shown .promptBackdrop{
    opacity: 1;
    visibility: visible;
  }
`;

const Prompt: FC<PromptInterface> = ({t, prompt}) => {
  
  const [promptText, setPromptText] = useState("");

  useEffect(() => {
    setPromptText("");
  }, [prompt.isShown]);

  const handleChange = (event: React.ChangeEvent) => {
    const text = (event.currentTarget as HTMLInputElement).value;
    setPromptText(text);
  };
  const handleKeyUp = (event: React.KeyboardEvent) => {
    const text = (event.currentTarget as HTMLInputElement).value;
    event.key === "Enter" && text.length > ZERO ? prompt.onProceed(text) : null;
  };
  return <PromptStyle className={prompt.isShown ? "shown" : "hidden"}>
    <div className="promptBlock">
      <h3 id="promptHeader">{prompt.icon && <Icon iconType={prompt.icon}/>}{prompt.header}</h3>
      <p id="promptText">{prompt.text}</p>
      { prompt.type === "alert" && <Button onClick={prompt.onConfirm}>{t("uiOk")}</Button> }
      { prompt.type === "confirm" && 
      <>
        <Button onClick={prompt.onCancel} type="nocolor"  style={{marginRight: "0.5em"}}>{t("uiCancel")}</Button>
        <Button onClick={prompt.onConfirm} >{t("uiConfirm")}</Button>
      </> }
      { prompt.type === "prompt" && 
      <>
        <Input value={promptText} classes="promptInput" onChange={handleChange} onKeyUp={handleKeyUp} />
        <Button onClick={prompt.onCancel} type="nocolor" style={{marginRight: "0.5em"}}>{t("uiCancel")}</Button>
        <Button onClick={() => { prompt.onProceed((document.querySelector(".promptInput") as HTMLInputElement).value); }}  disabled={promptText.length === ZERO}  >{t("uiProseed")}</Button>
      </> 
      }
    </div>
    <div className={`promptBackdrop ${prompt.isShown}`} onClick={prompt.onCancel} ></div>
  </PromptStyle>;
};

export default Prompt;