import React, { FC } from "react";
import { BlockMIs } from "src/models/blockMIs";
import { ACTION_NAMES, INPUT_TYPES, MI_LISTITEM_TYPE } from "src/models/constants";
import { MenuItemBlockModel, StoreModel, MenuItemBlockListItemModel, BlockModel } from "src/models/types";
import styled from "styled-components";
import { MIColor, MIFile, MISelect, MISize, MIText, MITextarea } from "./ui/MiTypes";

interface MenuItemBlockComponentModel{
  store: StoreModel
  mi: MenuItemBlockModel
  disabled?:boolean
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

const MenuItemBlock: FC<MenuItemBlockComponentModel> = ({mi, store, disabled}) => {
  const listItemData = BlockMIs.find(listMI => listMI.name === mi.miListItemName) as MenuItemBlockListItemModel;
  if(!listItemData) {
    return <></>;
  }
  return <MenuItemStyle className={disabled ? "disabled" : undefined}>
    <div className="label">{store.t(listItemData.label)}</div><br/>
    {
      listItemData.miType === MI_LISTITEM_TYPE.blockParam &&
      <MIBlockParam listItemData={listItemData} store={store} disabled={disabled}></MIBlockParam>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.blockCSS &&
      <MIBlockCSS listItemData={listItemData} mi={mi} store={store} disabled={disabled}></MIBlockCSS>
    }
  </MenuItemStyle>;
};

interface MIBlockParam{
  store: StoreModel
  listItemData: MenuItemBlockListItemModel
  disabled?:boolean
}

const MIBlockParam: FC<MIBlockParam> = ({store, listItemData, disabled}) => {
  const handleChange: (arg: string | number) => void = (value) => {
    if(listItemData.miType === MI_LISTITEM_TYPE.blockParam && !listItemData.isReadonly) {
      store.dispach({
        name: ACTION_NAMES.block_setParam,
        payload: {
          paramName: listItemData.paramName,
          value: value,
          blockUUID: null
        }
      });
    }
  };
  const selectedBlock = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock);
  if(!selectedBlock) {
    return <></>;
  }
  const getValue:(selectedBlock: BlockModel, listItemData: MenuItemBlockListItemModel)=>string = (selectedBlock, listItemData) => {
    if(listItemData.miType === MI_LISTITEM_TYPE.blockParam) {
      return String(selectedBlock[listItemData.paramName]);
    }
    return "";
  };
  return <>
    {
      (
        listItemData.inputType === INPUT_TYPES.options && 
        <MISelect value={getValue(selectedBlock, listItemData)} t={store.t} options={listItemData.inputOptions} onChange={handleChange} disabled={disabled}></MISelect>
      ) ||
      (
        listItemData.inputType === INPUT_TYPES.text &&
        <MIText value={getValue(selectedBlock, listItemData)} onChange={handleChange} disabled={disabled}></MIText>
      ) ||
      (
        listItemData.inputType === INPUT_TYPES.textarea &&
        <MITextarea value={getValue(selectedBlock, listItemData)} onChange={handleChange} style={{"width":"100%"}} disabled={disabled}></MITextarea>
      )
    }
  </>;
};

interface MIBlockCSS{
  store: StoreModel
  listItemData: MenuItemBlockListItemModel
  mi: MenuItemBlockModel
  disabled?:boolean
}

const MIBlockCSS: FC<MIBlockCSS> = ({store, listItemData, mi, disabled}) => {
  const handleChange: (arg: string | number) => void = (value) => {
    store.dispach({
      name: ACTION_NAMES.block_setCSS,
      payload: {
        miUUID: mi.uuid,
        value: String(value),
        blockUUID: null
      }
    });
  };
  const getValue:(mi: MenuItemBlockModel, listItemData: MenuItemBlockListItemModel)=>string = (mi, listItemData) => {
    if(listItemData.miType === MI_LISTITEM_TYPE.blockCSS) {
      return String(mi.miListItemValue || listItemData.CSSDefaultValue);
    }
    return "";
  };
  return <>
    {
      listItemData.inputType === INPUT_TYPES.options && 
      <MISelect value={getValue(mi, listItemData)} t={store.t} options={listItemData.inputOptions} onChange={handleChange} disabled={disabled}></MISelect>
    }
    {
      listItemData.inputType === INPUT_TYPES.text && 
      <MIText value={getValue(mi, listItemData)} onChange={handleChange} disabled={disabled}></MIText>
    }
    {
      listItemData.inputType === INPUT_TYPES.size && 
      <MISize value={getValue(mi, listItemData)} onChange={handleChange} disabled={disabled}></MISize>
    }
    {
      listItemData.inputType === INPUT_TYPES.color && 
      <MIColor value={getValue(mi, listItemData)} onChange={handleChange} disabled={disabled}></MIColor>
    }
    {
      listItemData.inputType === INPUT_TYPES.file &&
      <MIFile value={getValue(mi, listItemData)} onChange={handleChange} disabled={disabled}></MIFile>
    }
  </>;
};


export default MenuItemBlock;