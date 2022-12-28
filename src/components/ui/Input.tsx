import React, {FC} from "react";
import styled from "styled-components";

interface InputModel{
  value: string
  onChange: (arg: React.ChangeEvent) => void
  onKeyUp?: (arg: React.KeyboardEvent) => void
  classes?: string
  style?: React.CSSProperties
  disabled?: boolean
}

const InputStyle = styled.input`
  width: 100%;
  border: 0.2em solid var(--app-bg);
  background: transparent;
  border-radius: var(--border-radius);
  padding: 0.5em 1em;
  color: var(--text-color);
  font-size: inherit;
  :hover:not(:focus){
    opacity: 0.8;
  }
  :focus{
    outline: 0;
  }
`;

const Input: FC<InputModel & React.InputHTMLAttributes<HTMLInputElement>> = ({value, onChange, onKeyUp, classes, style, disabled, ...rest}) => {
  return <InputStyle
    onChange={(e) => { onChange(e); }}
    onKeyUp={onKeyUp}
    className={classes}
    style={
      {
        "opacity": disabled ? "0.6" : undefined,
        ...style
      }
    }
    value={value}
    disabled={disabled}
    {...rest}
  />;
};
export default Input;