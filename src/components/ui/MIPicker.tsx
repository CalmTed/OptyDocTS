import React, { FC } from "react";
import { BlockMIs, BLOCK_MI_NAMES } from "src/models/blockMIs";
import { ACTION_NAMES, MI_TARGET } from "src/models/constants";
import { TemplateMIs, TEMPLATE_MI_NAMES } from "src/models/templateMIs";
import { BlockModel, MenuItemBlockListItemModel, MenuItemTemplateListItemModel, StoreModel } from "src/models/types";
import styled from "styled-components";
import Icon from "./Icon";

const PickerListStyle = styled.div`
visibility: hidden;
opacity: 0;
height: 0;
max-height: calc( var(--row-height) * 4.5);
transition: all var(--transition);
display: flex;
flex-wrap: wrap;
align-content: flex-start;
--row-height: 2.5em;
overflow-y: auto;
position: fixed;
width: var(--sidebar-width);
top: var(--topbar-height);
& div{
  width: 100%;
  height: var(--row-height);
}
`;
const PickerStyle = styled.div`
padding: 0;
z-index: var(--z-mi-picker);
:focus-within ${PickerListStyle}{
  visibility: visible;
  opacity: 1;
  min-height: calc( var(--row-height) * 9);
}

`;
const PickerListItemStyle = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
padding: 0 var(--sidebar-padding);
background: var(--section-bg);
border: 0.2em solid var(--app-bg);
border-bottom-width: 0;
border-top-width: 0;
&:first-child{
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  border-top-width: 0.2em;
}
&:last-child{
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  border-bottom-width: 0.2em;
}
&.active.addable{
  color: var(--main-color);
  & .icon{
    --icon-color: var(--main-color);
  }
}
&.addable:hover{
  background: var(--main-color);
  cursor: pointer;
  color: var(--section-bg);
  border-color: var(--main-color);
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
padding: var(--sidebar-padding);
`;
interface MIPicker{
store: StoreModel
target: MI_TARGET
}
export const MIPicker: FC<MIPicker> = ({store, target}) => {
  const isBlockTarget = target === MI_TARGET.block;
  const selectedBlock = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock) || null;
type MIListModel = {
  data: MenuItemBlockListItemModel | MenuItemTemplateListItemModel
  isActive: boolean
  isAddable: boolean
}
const getMiList: (isBlockTarget: boolean, selectedBlock: BlockModel | null) =>  MIListModel[] = (isBlockTarget, selectedBlock) => {
  if(isBlockTarget) {
    if(selectedBlock) {
      return BlockMIs.map(listMI => {
        return {
          data: listMI,
          isActive: !!selectedBlock.menuItems.find(mi => mi.miListItemName === listMI.name),
          isAddable: listMI.isAddable
        };
      }); 
    }else{
      return [];
    }
  }else{
    return TemplateMIs.filter(listMI => listMI.isAddable).map(listMI => {
      return {
        data: listMI,
        isActive: !!store.state.templates[0].menuItems.find(mi => mi.miListItemName === listMI.name),
        isAddable: listMI.isAddable
      };
    }); 
  }
};
const miList = getMiList(isBlockTarget, selectedBlock);
const handleChangeMI:(name: BLOCK_MI_NAMES | TEMPLATE_MI_NAMES, isBlock: boolean) => void = (name, isBlock) => {
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
const geticonType = (mi: MIListModel) => {
  return mi.isAddable ? mi.isActive ? "minus" : "plus" : "lock";
};
return <PickerStyle>
  <PickerLabelStyle tabIndex={12}><Icon iconType="plus"/>{store.t("miEditMiList")}</PickerLabelStyle>
  <PickerListStyle>
    {miList.map(mi =>
      <PickerListItemStyle
        key={mi.data.name}
        className={`${mi.isActive ? "active" : ""} ${mi.isAddable ? "addable" : ""}`}
        tabIndex={12}
        onClick={() => { mi.isAddable ? handleChangeMI(mi.data.name, isBlockTarget) : null; }}
      >
        <Icon iconType={geticonType(mi)}/>
        {store.t(mi.data.label)}
      </PickerListItemStyle>  
    )}
  </PickerListStyle>
</PickerStyle>;
};