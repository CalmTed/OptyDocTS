import React, { FC } from "react";
import { BlockMIs, BLOCK_MI_NAMES } from "src/models/blockMIs";
import { ACTION_NAMES, MI_TARGET } from "src/models/constants";
import { TemplateMIs, TEMPLATE_MI_NAMES } from "src/models/templateMIs";
import { BlockModel, MenuItemBlockListItemModel, MenuItemBlockModel, MenuItemTemplateListItemModel, MenuItemTemplateModel, StoreModel } from "src/models/types";
import styled from "styled-components";
import MenuItemBlock from "../MenuItemBlock";
import MenuItemTemplate from "../MenuItemTemplate";
import Icon from "./Icon";

interface MIsInterface {
  store: StoreModel
  targetType: MI_TARGET
  addableType: "addable" | "fixed"
}

export const MIs: FC<MIsInterface> = ({store, targetType, addableType}) => {
  const isAddable = addableType === "addable";
  const isBlock = targetType === MI_TARGET.block;
  const targetMIs = isBlock ? store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock)?.menuItems : store.state.templates[0].menuItems.sort((miA, miB) => { return miA.timeAdded - miB.timeAdded; });  
  if(!targetMIs) {
    return <></>;
  }
  if(isBlock) {
    return <>{
      (targetMIs as MenuItemBlockModel[]).map(mi => {
        return {
          mi: mi,
          listMI: BlockMIs.find(listMI => listMI.name === mi.miListItemName)
        };
      }).filter(mi => 
        mi.listMI ? mi.listMI.isAddable === isAddable : false
      ).map((
        {mi, listMI}) => 
        listMI && <MenuItemBlock key={mi.uuid} store={store} mi={mi}/>
      ) as React.ReactElement[]
    }</>;
  }else{
    return <>{
      (targetMIs as MenuItemTemplateModel[]).map(mi => {
        return {
          mi: mi,
          listMI: TemplateMIs.find(listMI => listMI.name === mi.miListItemName)
        };
      }).filter(mi => 
        mi.listMI ? mi.listMI.isAddable === isAddable : false
      ).map((
        {mi, listMI}) => 
        listMI && <MenuItemTemplate key={mi.uuid} store={store} mi={mi}/>
      ) as React.ReactElement[]
    }</>;
  }
};

const PickerListStyle = styled.div`
  visibility: hidden;
  opacity: 0;
  height: 0;
  max-height: calc( var(--row-height) * 4.5);
  transition: all var(--transition);
  display: flex;
  flex-wrap: wrap;
  --row-height: 2.5em;
  overflow-y: auto;
  & div{
    width: 100%;
    height: var(--row-height);
  }
`;
const PickerStyle = styled.div`
  padding: 0.6em 1em;
  :focus-within ${PickerListStyle}{
    visibility: visible;
    opacity: 1;
    height: calc( var(--row-height) * 4.5);
  }

`;
const PickerListItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &.active{
    color: var(--main-color);
    & .icon{
      --icon-color: var(--main-color);
    }
  }
  &:hover{
    background: var(--main-color);
    cursor: pointer;
    color: var(--section-bg);
    & .icon{
      --icon-color: var(--section-bg);
    }
  }
  & .icon{
    width: 1.3em;
  }
`;
const PickerLabelStyle = styled.span`
  display: flex;
  cursor: pointer;
  font-size: 110%;
`;
interface MIPicker{
  store: StoreModel
  target: MI_TARGET
}
export const MIPicker: FC<MIPicker> = ({store, target}) => {
  const isBlockTarget = target === MI_TARGET.block;
  const selectedBlock = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock) || null;
  const getMiList: (isBlockTarget: boolean, selectedBlock: BlockModel | null) =>  ({data: MenuItemBlockListItemModel | MenuItemTemplateListItemModel, isActive: boolean})[] = (isBlockTarget, selectedBlock) => {
    if(isBlockTarget) {
      if(selectedBlock) {
        return BlockMIs.filter(listMI => listMI.isAddable).map(listMI => {
          return {
            data: listMI,
            isActive: !!selectedBlock.menuItems.find(mi => mi.miListItemName === listMI.name)
          };
        }); 
      }else{
        return [];
      }
    }else{
      return [];
    }
  };
  const miList = getMiList(isBlockTarget, selectedBlock);
  const handleBlockChangeMI:(name: BLOCK_MI_NAMES | TEMPLATE_MI_NAMES, isBlock: boolean) => void = (name, isBlock) => {
    if(isBlock) {
      store.dispach({
        name: ACTION_NAMES.block_toggleMI,
        payload: {
          blockUUID: selectedBlock?.uuid || null,
          miName: name as BLOCK_MI_NAMES
        }
      });
    }else{
      store.dispach({
        name: ACTION_NAMES.template_toggleMI,
        payload: {
          miName: name as TEMPLATE_MI_NAMES
        }
      });
    }
    return;
  };
  return <PickerStyle>
    <PickerLabelStyle tabIndex={12}><Icon iconType="plus"/>Choose your pokemon</PickerLabelStyle>
    <PickerListStyle>
      {miList.map(mi =>
        <PickerListItemStyle
          key={mi.data.name}
          className={mi.isActive ? "active" : ""}
          tabIndex={12}
          onClick={() => { handleBlockChangeMI(mi.data.name, isBlockTarget); }}
        >
          <Icon iconType={mi.isActive ? "minus" : "plus"}/>
          {store.t(mi.data.label)}
        </PickerListItemStyle>  
      )}
    </PickerListStyle>
  </PickerStyle>;
};