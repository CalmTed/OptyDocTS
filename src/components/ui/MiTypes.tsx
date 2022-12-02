import React, { FC } from "react";
import { SelectOption } from "src/models/types";
import { WordType } from "src/store/translation";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

interface MISelect{
  value: string | number
  t: (arg: WordType) => string
  options: SelectOption[]
  onChange: (newVal: string | number) => void
  classes?: string
  style?: React.CSSProperties
}

export const MISelect: FC<MISelect> = ({value, t, options, onChange, classes, style}) => {
  const translatedOptions = options.map(option => {
    return {
      ...option,
      label: t(option.label as WordType)
    };
  });
  return <Select value={value} options={translatedOptions} onChange={ (option) => onChange(option.value) } classes={classes} style={style} ></Select>;
};

interface MIText{
  value: string
  onChange: (newVal: string) => void
  classes?: string
  style?: React.CSSProperties
}

export const MIText: FC<MIText> = ({value, onChange, classes, style}) => {
  return <Input value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} classes={classes} style={style} ></Input>;
};


interface MITextarea{
  value: string
  onChange: (newVal: string) => void
  classes?: string
  style?: React.CSSProperties
}

export const MITextarea: FC<MITextarea> = ({value, onChange, classes, style}) => {
  return <Textarea style={style} value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} classes={classes}></Textarea>;
};

interface MISize{
  value: string
  onChange: (newVal: string) => void
  classes?: string
  style?: React.CSSProperties
}

export const MISize: FC<MISize> = ({value, onChange, classes, style}) => {
  return <Input value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} classes={classes} style={style} ></Input>;
};