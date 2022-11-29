import React, { FC } from "react";
import { BlockMIs } from "src/models/blockMIs";
import { ACTION_NAMES, INPUT_TYPES, MI_LISTITEM_TYPE } from "src/models/constants";
import { MenuItemBlockModel, StoreModel, MenuItemBlockListItemModel } from "src/models/types";
import styled from "styled-components";
import { MISelect, MIText } from "./ui/MiTypes";

interface MenuItemBlockComponentModel{
  store: StoreModel
  mi: MenuItemBlockModel
}

const MenuItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.6em 1em;
  & .label{
    padding-bottom: 0.5em;
  }
`;

const MenuItemBlock: FC<MenuItemBlockComponentModel> = ({mi, store}) => {
  const listItemData = BlockMIs[mi.miListItemId] as MenuItemBlockListItemModel;
  if(!listItemData) {
    return <></>;
  }
  return <MenuItemStyle>
    <div className="label">{store.t(listItemData.label)}</div><br/>
    {
      listItemData.miType === MI_LISTITEM_TYPE.blockParam &&
      <MIBlockParam listItemData={listItemData} store={store}></MIBlockParam>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.blockCSS &&
      <MIBlockCSS listItemData={listItemData} mi={mi} store={store}></MIBlockCSS>
    }
  </MenuItemStyle>;
};

interface MIBlockParam{
  store: StoreModel
  listItemData: MenuItemBlockListItemModel
}

const MIBlockParam: FC<MIBlockParam> = ({store, listItemData}) => {
  const handleChange: (arg: string | number) => void = (value) => {
    if(listItemData.miType === MI_LISTITEM_TYPE.blockParam && !listItemData.isReadonly) {
      store.dispach({
        name: ACTION_NAMES.block_setParam,
        payload: {
          paramName: listItemData.paramName,
          value: value
        }
      });
    }
  };
  const selectedBlock = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock);
  return <>
    {
      selectedBlock &&
      listItemData.miType === MI_LISTITEM_TYPE.blockParam && 
      (
        (
          listItemData.inputType === INPUT_TYPES.options && 
          <MISelect value={String(selectedBlock[listItemData.paramName])} t={store.t} options={listItemData.inputOptions} onChange={handleChange}></MISelect>
        ) ||
        (
          listItemData.inputType === INPUT_TYPES.text &&
          <MIText value={String(selectedBlock[listItemData.paramName])} onChange={handleChange}></MIText>
        )
      )
    }
  </>;
};

interface MIBlockCSS{
  store: StoreModel
  listItemData: MenuItemBlockListItemModel
  mi: MenuItemBlockModel
}

const MIBlockCSS: FC<MIBlockCSS> = ({store, listItemData, mi}) => {
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
      listItemData.miType === MI_LISTITEM_TYPE.blockCSS && 
      listItemData.inputType === INPUT_TYPES.options && 
      <MISelect value={String(mi.miListItemValue || listItemData.CSSDefaultValue)} t={store.t} options={listItemData.inputOptions} onChange={handleChange}></MISelect>
    }
    {
      listItemData.miType === MI_LISTITEM_TYPE.blockCSS && 
      listItemData.inputType === INPUT_TYPES.text && 
      <MIText value={String(mi.miListItemValue || listItemData.CSSDefaultValue)} onChange={handleChange}></MIText>
    }
  </>;
};


export default MenuItemBlock;