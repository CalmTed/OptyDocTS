import React, { FC } from "react";
import styled from "styled-components";
import { IconTypeKey } from "src/models/icons";
import Icon from "./ui/Icon";

interface TopbarButtonModel {
  iconType: IconTypeKey
  onClick: () => void
  disabled?: boolean
}

const TopbarButtonStyle = styled.div`
  height: 100%;
  aspect-ratio: 1;
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

const TopbarButton: FC<TopbarButtonModel> = ({iconType, onClick, disabled = false}) => {
  return <TopbarButtonStyle onClick={() => { !disabled ? onClick() : null; }} className={`${disabled ? "disabled" : ""}`}>
    <Icon iconType={iconType}/>
  </TopbarButtonStyle>;
};

export default TopbarButton;