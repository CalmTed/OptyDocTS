import React, { FC } from "react";
import styled from "styled-components";
import { IconTypeKey } from "src/models/icons";
import Icon from "./ui/Icon";

interface TopbarButtonModel {
  iconType: IconTypeKey
  onClick: () => void
  disabled?: boolean
  title?: string
}

const TopbarButtonStyle = styled.div`
  min-height: var(--topbar-height);
  min-width: var(--topbar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity var(--transition);
  &.disabled, &.disabled:hover{
    cursor: default;
    opacity: 0.5
  }
  :hover{
    cursor: pointer;
    opacity: 0.7;
  }
  & .icon{
    font-size: 1.6em;
  }
`;

const TopbarButton: FC<TopbarButtonModel> = ({iconType, onClick, disabled = false, title}) => {
  return <TopbarButtonStyle
    onClick={() => { !disabled ? onClick() : null; }}
    className={`${disabled ? "disabled" : ""}`}
    title={title}
  >
    <Icon iconType={iconType}/>
  </TopbarButtonStyle>;
};

export default TopbarButton;