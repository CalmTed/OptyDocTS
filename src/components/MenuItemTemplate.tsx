import React, { FC } from "react";
import { ACTION_NAMES, INPUT_TYPES, MI_LISTITEM_TYPE } from "src/models/constants";
import { TemplateMIs } from "src/models/templateMIs";
import { MenuItemTemplateListItemModel, MenuItemTemplateModel, StoreModel } from "src/models/types";
import styled from "styled-components";
import { MISelect, MIText, MITextarea } from "./ui/MiTypes";

interface MenuItemTemplateComponentModel{
  store: StoreModel
  mi: MenuItemTemplateModel
  disabled?: boolean
}

const MenuItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.6em 1em;
  & .label{
    padding-bottom: 0.5em;
  }
  &.disabled .label{
    opacity: 0.6;
  }
`;

const MenuItemTemplate: FC<MenuItemTemplateComponentModel> = ({mi, store, disabled}) => {
  const listItemData = TemplateMIs.find(listMI => listMI.name === mi.miListItemName) as MenuItemTemplateListItemModel;
  if(!listItemData) {
    return <></>;
  }
  return <MenuItemStyle className={disabled ? "disabled" : undefined}>
    <div className="label">{store.t(listItemData.label)}</div><br/>
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateParam &&
      <MITemplateParam listItemData={listItemData} store={store} disabled={disabled}></MITemplateParam>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateCSS &&
      <MITemplateCSS listItemData={listItemData} mi={mi} store={store} disabled={disabled}></MITemplateCSS>
    }
  </MenuItemStyle>;
};

interface MITemplateParam{
  store: StoreModel
  listItemData: MenuItemTemplateListItemModel
  disabled?: boolean
}

const MITemplateParam: FC<MITemplateParam> = ({store, listItemData, disabled}) => {
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
          <MISelect value={String(store.state.templates[0][listItemData.paramName])} t={store.t} options={listItemData.inputOptions} onChange={handleChange} disabled={disabled}></MISelect>
        ) ||
        (
          listItemData.inputType === INPUT_TYPES.text &&
          <MIText value={String(store.state.templates[0][listItemData.paramName])} onChange={handleChange} disabled={disabled}></MIText>
        ) ||
        (
          listItemData.inputType === INPUT_TYPES.textarea &&
          <MITextarea style={{"width": "100%"}} value={String(store.state.templates[0][listItemData.paramName])} onChange={handleChange} disabled={disabled}></MITextarea>
        )
      )
    }
  </>;
};

interface MITemplateCSS{
  store: StoreModel
  listItemData: MenuItemTemplateListItemModel
  mi: MenuItemTemplateModel
  disabled?:boolean
}

const MITemplateCSS: FC<MITemplateCSS> = ({store, listItemData, mi, disabled}) => {
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
      <MISelect value={String(mi.miListItemValue || listItemData.CSSDefaultValue)} t={store.t} options={listItemData.inputOptions} onChange={handleChange} disabled={disabled}></MISelect>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.templateCSS && 
      listItemData.inputType === INPUT_TYPES.text && 
      <MIText value={String(mi.miListItemValue || listItemData.CSSDefaultValue)} onChange={handleChange} disabled={disabled}></MIText>
    }
  </>;
};

export default MenuItemTemplate;