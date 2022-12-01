import React, {FC} from "react";
import styled from "styled-components";

interface TextareaModel{
  value: string
  onChange: (arg: React.ChangeEvent) => void
  onKeyUp?: (arg: React.KeyboardEvent) => void
  classes?: string
  style?: React.CSSProperties
}

const TextareaStyle = styled.textarea`
  border: 0.2em solid var(--app-bg);
  background: transparent;
  resize: vertical;
  min-height: 6em;
  border-radius: var(--border-radius);
  padding: 0.5em 1em;
  color: var(--text-color);
  font-size: inherit;
  font-family: inherit;
  :hover{
    opacity: 0.8;
  }
  :focus{
    outline: 0;
  }
`;

const Textarea: FC<TextareaModel> = ({value, onChange, onKeyUp, classes, style}) => {
  return <TextareaStyle
    onChange={(e) => { onChange(e); }}
    onKeyUp={onKeyUp}
    className={classes}
    style={style}
    value={value}
  />;
};
export default Textarea;