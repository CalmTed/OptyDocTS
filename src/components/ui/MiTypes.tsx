import React, { FC } from "react";
import { DEFAULT_VALUES, ONE, SIZE_UNITS, THOUSAND, ZERO } from "src/models/constants";
import { SelectOption, StoreModel } from "src/models/types";
import { WordType } from "src/store/translation";
import styled from "styled-components";
import Icon from "./Icon";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

interface MI{
  classes?: string
  style?: React.CSSProperties
  disabled?:boolean 
}

interface MISelect{
  value: string | number
  t: (arg: WordType) => string
  options: SelectOption[]
  onChange: (newVal: string | number) => void
}

export const MISelect: FC<MI & MISelect> = ({value, t, options, onChange, classes, style, disabled}) => {
  const translatedOptions = options.map(option => {
    return {
      ...option,
      label: t(option.label as WordType)
    };
  });
  return <Select value={value} options={translatedOptions} onChange={ (option) => onChange(option.value) } classes={classes} style={style} disabled={disabled}></Select>;
};

interface MIText{
  value: string
  onChange: (newVal: string) => void
}

export const MIText: FC<MI & MIText> = ({value, onChange, classes, style, disabled}) => {
  return <Input value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} classes={classes} style={style} disabled={disabled}></Input>;
};


interface MITextarea{
  value: string
  onChange: (newVal: string) => void
}

export const MITextarea: FC<MI & MITextarea> = ({value, onChange, classes, style, disabled}) => {
  return <Textarea style={style} value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} classes={classes} disabled={disabled}></Textarea>;
};

interface MISize{
  value: string
  onChange: (newVal: string) => void
}

export const MISize: FC<MI & MISize> = ({value, onChange, classes, style, disabled}) => {
  //propose units
  const randomId = Math.round(Math.random() * THOUSAND);
  const getDataList = (value: string) => {
    const onlyNumber = value.replace(/[^0-9.0-9]/g, "");
    const list = [
      ...Object.values(SIZE_UNITS).map(unit => `${onlyNumber}${unit}`),
      ...Object.values(DEFAULT_VALUES)
    ];
    return list.map(el => {
      return <option key={el} value={el} />;
    });
  };
  //increment, dicrement
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const crement = (value: string, amount: number) => {
      //getNumber
      const number = Number.parseFloat(value.replace(/[^0-9.-]{1,}/g, ""));
      const sum = String((number + amount).toFixed(ONE)).replace(".0", "");
      //increment
      //replace old value with new
      return value.replace(String(number), sum);
    };
    const target = (e.target as HTMLInputElement);
    const CTRL = 1;
    const SHIFT = 10;
    const ALT = 0.1;
    const special = e.ctrlKey ? CTRL : e.shiftKey ? SHIFT : e.altKey ? ALT : ZERO;
    const amount = ONE * special;
    if(e.key === "ArrowRight" && special !== ZERO) {
      target.value = crement(fromT(target.value), amount);
    }
    if(e.key === "ArrowLeft" && special !== ZERO) {
      target.value = crement(fromT(target.value), -amount);
    }
    onChange(target.value);
  };
  const tMap = {
    "mm": "мм",
    "cm": "см"
  };
  const toT = (string: string) => {
    let newString = string;
    Object.entries(tMap).map(([value, key]) => { newString = newString.replace(RegExp(value, "g"), key); });
    return newString;
  };
  const fromT = (string: string) => {
    let newString = string;
    Object.entries(tMap).map(([value, key]) => { newString = newString.replace(RegExp(key, "g"), value); });
    return newString;
  };
  //TODO: convert mm to cyricic and back
  return <>
    <Input
      value={toT(value)} 
      onChange={(e) => { onChange(fromT((e.target as HTMLInputElement).value)); }}
      onKeyDown={handleKeyDown}
      classes={classes}
      style={style}
      disabled={disabled}
      list={`datalist-${randomId}`}
    ></Input>
    <datalist id={`datalist-${randomId}`}>{
      getDataList(value)
    }</datalist>
  </>;
};

interface MIColorModel{
  value: string
  onChange: (newVal: string) => void
}
const MIColorLabel = styled.label`
  width: 1em;
  height: 1em;
  display: inline-block;
  cursor: pointer;
  border: 0.1em solid var(--app-bg);
  border-radius: var(--border-radius);
  margin-left: .5em;
`;
export const MIColor: FC<MI & MIColorModel> = ({value, onChange, classes, style, disabled}) => {
  return <>
    <MIColorLabel 
      style={{
        "backgroundColor":value,
        "cursor": disabled ? "default" : undefined
      }}
      onClick={(e) => { disabled ? e.preventDefault() : null; }}
    >
      <input type="color" value={value} style={{"display": "none"}} onChange={(e) => onChange((e.target as HTMLInputElement).value)} />
    </MIColorLabel>
    <Input
      value={value} 
      onChange={(e) => { onChange((e.target as HTMLInputElement).value); }}
      classes={classes}
      style={style}
      disabled={disabled}
    ></Input>
  </>;
};

interface MIFileModel{
  value: string
  onChange: (newVal: string) => void
  store: StoreModel
}
const MIFileLabel = styled.label`
  width: 2em;
  height: 1.5em;
  display: inline-block;
  cursor: pointer;
  border: 0.1em solid var(--app-bg);
  border-radius: var(--border-radius);
  margin: 0 0 .5em .5em;
  display: flex;
  align-items: center;
  justify-content: center;
  &.disabled{
    opacity: 0.6;
    cursor: default;
  }
}
`;
const MIFilePreview = styled.span`
width: 2em;
height: 1.5em;
display: inline-block;
margin: 0 0 .5em .5em;
display: flex;
background-size: contain;
background-position: center;
background-repeat: no-repeat;
&:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--section-bg);
  opacity: 0.4;
}
`;
export const MIFile: FC<MI & MIFileModel> = ({value, onChange, classes, style, store, disabled}) => {
  const handleFileSelect = (e: React.ChangeEvent) => {
    const target = (e.target as HTMLInputElement);
    const file = target.files?.[0] as Blob;
    const maxSize = 3000000;
    if(file.size > maxSize) {
      store.showToast(store.t("uiImageHasToBeLessThenMB"), "alert");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onChange(`url(${result})`);
    };
    reader.readAsDataURL(file);
    null;
  };
  return <>
    {value && !disabled && 
      <MIFilePreview  style={{"backgroundImage":value}}>
      </MIFilePreview>
    }
    {value && 
      <MIFileLabel
        className={disabled ? "disabled" : ""}
        onClick={() => disabled ? null : onChange("") }>
        <Icon iconType="minus" />
      </MIFileLabel>
    }
    <MIFileLabel className={disabled ? "disabled" : ""}>
      <Icon iconType="import"/>
      <input
        type="file"
        style={{"display": "none"}}
        onClick={e => disabled ? e.preventDefault() : null }
        onChange={e => disabled ? null : handleFileSelect(e) }
      />
    </MIFileLabel>
    <Input
      value={value} 
      onChange={(e) => { onChange((e.target as HTMLInputElement).value); }}
      classes={classes}
      style={style}
      disabled={disabled}
    ></Input>
  </>;
};