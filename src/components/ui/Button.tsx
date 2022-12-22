import React, {FC} from "react";
import { IconTypeKey } from "src/models/icons";
import styled from "styled-components";
import Icon from "./Icon";

export type ButtonType = "main" | "normal" | "nocolor" 

interface ButtonModel{
  children: React.ReactNode
  onClick: (arg: React.MouseEvent) => void
  type?: ButtonType
  icon?: IconTypeKey
  style?: React.CSSProperties
  classes?: string
  disabled?: boolean
}

const ButtonStyle = styled.div`
  user-select: none;
  padding: 0.5em 1em;
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-size: inherit;
  border: 0;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  :hover{
    opacity: 0.8;
  }
  &.disabled{
    cursor: default;
    opacity: 0.6;
  }
  &.normal{
    background: var(--main-color);
    color: var(--section-bg);
    svg{
      --icon-color: var(--section-bg);
    }
  }
  &.main{
    background: var(--main-button-bg);
    color: var(--main-button-text);
    svg{
      --icon-color: var(--main-button-text);
    }
  }
  &.nocolor{
    background: var(--app-bg);
  }
`;

const Button: FC<ButtonModel> = ({children, onClick, type = "normal", icon, style, classes, disabled = false}) => {
  return <ButtonStyle
    onClick={ (event: React.MouseEvent) => { !disabled ? onClick(event) : null; } }
    className={`${type} ${ disabled ? "disabled" : "" } ${classes ?  classes : ""}`}
    style={style}
  >
    {icon && <Icon iconType={icon}/>}
    {children}
  </ButtonStyle>;
};
export default Button;