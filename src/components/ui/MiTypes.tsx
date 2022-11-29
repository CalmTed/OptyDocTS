import React, { FC } from "react";
import { SelectOption } from "src/models/types";
import { WordType } from "src/store/translation";
import Input from "./Input";
import Select from "./Select";

interface MISelect{
  value: string | number
  t: (arg: WordType) => string
  options: SelectOption[]
  onChange: (newVal: string | number) => void
}

export const MISelect: FC<MISelect> = ({value, t, options, onChange}) => {
  const translatedOptions = options.map(option => {
    return {
      ...option,
      label: t(option.label as WordType)
    };
  });
  return <Select value={value} options={translatedOptions} onChange={ (option) => onChange(option.value) }></Select>;
};

interface MIText{
  value: string
  onChange: (newVal: string) => void
}

export const MIText: FC<MIText> = ({value, onChange}) => {
  return <Input value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} ></Input>;
};