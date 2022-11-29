import React, { FC } from "react";
import { ACTION_NAMES, INPUT_TYPES, MI_LISTITEM_TYPE } from "src/models/constants";
import { TemplateMIs } from "src/models/templateMIs";
import { MenuItemTemplateListItemModel, MenuItemTemplateModel, SelectOption, StoreModel } from "src/models/types";
import { WordType } from "src/store/translation";
import styled from "styled-components";
import Input from "./ui/Input";
import Select from "./ui/Select";

interface MenuItemTemplateComponentModel{
  store: StoreModel
  mi: MenuItemTemplateModel
}

const MenuItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.6em 1em;
  & .label{
    padding-bottom: 0.5em;
  }
`;

const MenuItemTemplate: FC<MenuItemTemplateComponentModel> = ({mi, store}) => {
  const listItemData = TemplateMIs[mi.miListItemId] as MenuItemTemplateListItemModel;
  return <MenuItemStyle>
    <div className="label">{store.t(listItemData.label)}</div><br/>
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateParam &&
      <MITemplateParam listItemData={listItemData} store={store}></MITemplateParam>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateCSS &&
      <MITemplateCSS listItemData={listItemData} mi={mi} store={store} ></MITemplateCSS>
    }
  </MenuItemStyle>;
};

interface MITemplateParam{
  store: StoreModel
  listItemData: MenuItemTemplateListItemModel
}

const MITemplateParam: FC<MITemplateParam> = ({store, listItemData}) => {
  const handleChange: (arg: string | number) => void = (value) => {
    if(listItemData.miType === MI_LISTITEM_TYPE.templateParam && !listItemData.isReadonly) {
      store.dispach({
        name: ACTION_NAMES.template_setParam,
        payload: {
          paramName: listItemData.paramName,
          value: value
        }
      });
    }
  };
  return <>
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateParam && 
      (
        (
          listItemData.inputType === INPUT_TYPES.options && 
          <MISelect value={String(store.state.templates[0][listItemData.paramName])} t={store.t} options={listItemData.inputOptions} onChange={handleChange}></MISelect>
        ) ||
        (
          listItemData.inputType === INPUT_TYPES.text &&
          <MIText value={String(store.state.templates[0][listItemData.paramName])} onChange={handleChange}></MIText>
        )
      )
    }
  </>;
};

interface MITemplateCSS{
  store: StoreModel
  listItemData: MenuItemTemplateListItemModel
  mi: MenuItemTemplateModel
}

const MITemplateCSS: FC<MITemplateCSS> = ({store, listItemData, mi}) => {
  const handleChange: (arg: string | number) => void = (value) => {
    store.dispach({
      name: ACTION_NAMES.template_setCSS,
      payload: {
        miUUID: mi.uuid,
        value: String(value)
      }
    });
  };
  return <>
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateCSS && 
      listItemData.inputType === INPUT_TYPES.options && 
      <MISelect value={String(mi.miListItemValue || listItemData.CSSDefaultValue)} t={store.t} options={listItemData.inputOptions} onChange={handleChange}></MISelect>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateCSS && 
      listItemData.inputType === INPUT_TYPES.text && 
      <MIText value={String(mi.miListItemValue || listItemData.CSSDefaultValue)} onChange={handleChange}></MIText>
    }
  </>;
};

interface MISelect{
  value: string | number
  t: (arg: WordType) => string
  options: SelectOption[]
  onChange: (newVal: string | number) => void
}

const MISelect: FC<MISelect> = ({value, t, options, onChange}) => {
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

const MIText: FC<MIText> = ({value, onChange}) => {
  return <Input value={value} onChange={(e) => { onChange((e.target as HTMLInputElement).value); }} ></Input>;
};

export default MenuItemTemplate;