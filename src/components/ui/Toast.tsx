import React, { FC } from "react";
import styled from "styled-components";

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
  transition: all var(--transition);
  opacity: 0;
  transform: translateY(10px);
  border: 1px solid var(--main-color);
  z-index: var(--z-toast);
  &.shown{
    opacity: 1;
    transform: translateY(0px);
  }
`;

interface ToastInterface{
  toast: {
    text: string
    isShown: boolean
    lastUpdateTime: number
  }
}

const Toast: FC<ToastInterface> = ({toast}) => {
  return <ToastStyle className={toast.isShown ? "shown" : "hidden"}>{toast.text}</ToastStyle>;
};

export default Toast;