import React, { FC } from "react";
import { BlockMIs } from "src/models/blockMIs";
import { MI_TARGET, ZERO } from "src/models/constants";
import { TemplateMIs } from "src/models/templateMIs";
import { BlockModel, MenuItemBlockListItemModel, MenuItemBlockModel, MenuItemTemplateListItemModel, MenuItemTemplateModel, StoreModel, TemplateModel } from "src/models/types";
import MenuItemBlock from "../MenuItemBlock";
import MenuItemTemplate from "../MenuItemTemplate";

interface MIsInterface {
  store: StoreModel
  targetType: MI_TARGET
  addableType: "addable" | "fixed"
}

export const MIs: FC<MIsInterface> = ({store, targetType, addableType}) => {
  const isAddable = addableType === "addable";
  const isBlock = targetType === MI_TARGET.block;
  const targetMIs = isBlock ? store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock)?.menuItems : store.state.templates[0].menuItems;//.sort((miA, miB) => { return miA.timeAdded - miB.timeAdded; });  
  if(!targetMIs) {
    return <></>;
  }
  if(isBlock) {
    const targetBlock = store.state.templates[0].blocks.find(b => b.uuid === store.state.selectedBlock);
    return <>{
      (targetMIs as MenuItemBlockModel[]).map(mi => {
        const checkIfDisabled = (listMI?: MenuItemBlockListItemModel) => { //true = disabled false = enabled
          if(!listMI) {
            return false;
          }
          if(listMI.conditions && targetBlock) {
            //true is possitive
            return listMI.conditions.map(condition => {
              switch(condition.type) {
              case "prop":
                const propProp = condition.propProp;
                const getValue = (target: BlockModel, propProp: string | undefined) => {
                  const value = target[condition.propName as keyof BlockModel];
                  if(!propProp) {
                    return value;
                  } else {
                    //I know that its bad practiec to to that, i know :)
                    if(propProp === "hasChildren") {
                      return store.state.templates[0].blocks.filter(b => b.parentId === value).length;
                    }else{
                      return value;
                    }
                  }
                };
                const value = getValue(targetBlock, propProp) as string;//propProp ? String(?.[propProp]) : String(targetBlock[condition.propName as keyof BlockModel]);
                const blackListResult = condition.blackList.includes(value);
                const whiteListResult = !condition.whiteList.includes(value) && condition.whiteList.length !== ZERO;
                return blackListResult || whiteListResult;
              case "css":
                const CSSValue = targetBlock.menuItems.find(bmi => bmi.miListItemName === condition.cssPropName)?.miListItemValue;
                if(!CSSValue) {
                  return false;
                }
                const CSSblackListResult = condition.blackList.includes(CSSValue);
                const CSSwhiteListResult = !condition.whiteList.includes(CSSValue) && condition.whiteList.length;
                return CSSblackListResult || CSSwhiteListResult;
              default:
                console.warn("MI conditions checking: unknown condition type:", condition);
              }
              return false;
            }).filter(r => !!r).length > ZERO;
          }else{
            return false;
          }
        };
        const listMI = BlockMIs.find(listMI => listMI.name === mi.miListItemName);
        return {
          mi: mi,
          listMI: listMI,
          isDisabled: checkIfDisabled(listMI)
        };
      }).filter(mi => {
        if(!mi.listMI) {
          return false;
        }
        if(mi.listMI.isAddable !== isAddable) {
          return false;
        }
        return true;
      }
      ).map((
        {mi, listMI, isDisabled}) => 
        listMI && <MenuItemBlock key={mi.uuid} store={store} mi={mi} disabled={isDisabled}/>
      ) as React.ReactElement[]
    }</>;
  }else{
    const targetTemplate = store.state.templates[0];
    return <>{
      (targetMIs as MenuItemTemplateModel[]).map(mi => {
        const checkIfDisabled = (listMI?: MenuItemTemplateListItemModel) => { //true = disabled false = enabled
          if(!listMI) {
            return false;
          }
          if(listMI.conditions && targetTemplate) {
            //true is possitive
            return listMI.conditions.map(condition => {
              switch(condition.type) {
              case "prop":
                const blackListResult = condition.blackList.includes(String(targetTemplate[condition.propName as keyof TemplateModel]));
                const whiteListResult = !condition.whiteList.includes(String(targetTemplate[condition.propName as keyof TemplateModel])) && condition.whiteList.length;
                return blackListResult || whiteListResult;
              case "css":
                const CSSValue = targetTemplate.menuItems.find(bmi => bmi.miListItemName === condition.cssPropName)?.miListItemValue;
                if(!CSSValue) {
                  return false;
                }
                const CSSblackListResult = condition.blackList.includes(CSSValue);
                const CSSwhiteListResult = !condition.whiteList.includes(CSSValue) && condition.whiteList.length;
                return CSSblackListResult || CSSwhiteListResult;
              default:
                console.warn("MI conditions checking: unknown condition type:", condition);
              }
              return false;
            }).filter(r => !!r).length > ZERO;
          }else{
            return false;
          }
        };
        const listMI = TemplateMIs.find(listMI => listMI.name === mi.miListItemName);
        return {
          mi: mi,
          listMI: listMI,
          isDisabled: checkIfDisabled(listMI)
        };
      }).filter(mi => {
        if(!mi.listMI) {
          return false;
        }
        if(mi.listMI.isAddable !== isAddable) {
          return false;
        }
        //TODO CONDITIONS
        return true;
      }
      ).map((
        {mi, listMI, isDisabled}) => 
        listMI && <MenuItemTemplate key={mi.uuid} store={store} mi={mi} disabled={isDisabled}/>
      ) as React.ReactElement[]
    }</>;
  }
};
