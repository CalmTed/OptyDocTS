import React, { FC } from "react";
import { IconTypeKey } from "src/models/icons";
import styled from "styled-components";
import Icon from "./Icon";

const ToastStyle = styled.div`
  position: fixed;
  padding: 1em;
  bottom: 4em;
  right: 4em;
  background: var(--section-bg);
  border-radius: var(--border-radius);
  min-width: 10em;
  max-width: 20em;
  min-height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all var(--transition);
  opacity: 0;
  transform: translateY(10px);
  border: 1px solid var(--main-color);
  z-index: var(--z-toast);
  box-shadow: var(--box-shadow);
  &.shown{
    opacity: 1;
    transform: translateY(0px);
  }
  & .icon{
    font-size: 1.6em;
    margin-right: 0.2em;
  }
`;

interface ToastInterface{
  toast: {
    text: string
    isShown: boolean
    lastUpdateTime: number
    icon?: IconTypeKey
  }
}

const Toast: FC<ToastInterface> = ({toast}) => {
  return <ToastStyle className={`toast ${toast.isShown ? "shown" : "hidden"}`}>
    {toast.icon && <Icon iconType={toast.icon}/>}
    {toast.text}
  </ToastStyle>;
};

export default Toast;