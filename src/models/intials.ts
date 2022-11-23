import { LANG_CODES, TAB_TYPE, THEME_TYPE, Version, RandLength, A4, CONTENT_TYPE } from "./constants";
import { AppStateModel, BlockModel, MenuItemListItemModel, MenuItemModel, TemplateModel } from "./types";

const getId: (atr: string)=>string = (prefix) => {
  return `${prefix}${Math.round(Math.random() * RandLength)}`;
};

const getInitialAppState: ()=>AppStateModel = () => {
  return {
    version: Version,
    theme: THEME_TYPE.dark,
    lastChange: new Date().getTime(),
    langCode: LANG_CODES.ua,
    selectedTab: TAB_TYPE.edit,
    selectedBlock: null,
    selectedCopy: null,
    sidebarSectionHeight: 100,
    templates: [getInitialTamplate()]
  };
};

const getInitialTamplate: ()=>TemplateModel = () => {
  return {
    uuid: getId("t"),
    dateCreated: new Date().getTime(),
    dateEdited: 0,
    name: "",
    pageSizeMM: A4,
    pageOrientation: "vertical",
    pageMargin: ["0mm", "0mm", "0mm", "0mm"],
    copyColumns: [],
    copyRefferenceIds: [],
    copyRows: [],
    blocks: [],
    menuItems: []
  };
};

const getInitialBlock: ()=>BlockModel = () => {
  const blockId = getId("b");
  return {
    uuid: blockId,
    label: "",
    parentId: null,
    contentType: CONTENT_TYPE.fixed,
    contentValue: "",
    variableLabel: "",
    variableOptions: [],
    referenceId: blockId,
    menuItems: [],
    treeViewCollapseState: false 
  };
};
const getInitialMenuItem: (arg: MenuItemListItemModel)=>MenuItemModel = (MItype: MenuItemListItemModel) => {
  const MIId = getId("mi");
  return {
    uuid: MIId,
    miListItem: MItype,
    miListItemValue: null,
    valueType: CONTENT_TYPE.fixed,
    variableLabel: "",
    variableOptions: [],
    refferenceId: MIId,
    timeCreated: new Date().getTime()
  };
};

export {getInitialAppState, getInitialTamplate, getInitialBlock, getInitialMenuItem};