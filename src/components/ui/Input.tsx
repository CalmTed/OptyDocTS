import React, {FC} from "react";
import styled from "styled-components";

interface InputModel{
  value: string
  onChange: (arg: React.ChangeEvent) => void
  onKeyUp?: (arg: React.KeyboardEvent) => void
  classes?: string
  style?: React.CSSProperties
}

const InputStyle = styled.input`
  width: 100%;
  border: 0.2em solid var(--app-bg);
  background: transparent;
  border-radius: var(--border-radius);
  padding: 0.5em 1em;
  color: var(--text-color);
  font-size: inherit;
  :hover{
    opacity: 0.8;
  }
  :focus{
    outline: 0;
  }
`;

const Input: FC<InputModel & React.InputHTMLAttributes<HTMLInputElement>> = ({value, onChange, onKeyUp, classes, style, ...rest}) => {
  return <InputStyle
    onChange={(e) => { onChange(e); }}
    onKeyUp={onKeyUp}
    className={classes}
    style={style}
    value={value}
    {...rest}
  />;
};
export default Input;