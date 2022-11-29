import { LANG_CODES } from "src/store/translation";
import { TAB_TYPE, THEME_TYPE, Version, RandLength, A4, CONTENT_TYPE } from "./constants";
import { AppStateModel, BlockModel, MenuItemTemplateModel, TemplateModel } from "./types";

const getId: (atr: string)=>string = (prefix) => {
  return `${prefix}${Math.round(Math.random() * RandLength)}`;
};

const getInitialAppState: ()=>AppStateModel = () => {
  return {
    version: Version,
    theme: THEME_TYPE.dark,
    lastChange: new Date().getTime(),
    langCode: LANG_CODES[0],
    selectedTab: TAB_TYPE.Edit,
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
    menuItems: getInitialTemplateMis()
  };
};

const getInitialTemplateMis: ()=>MenuItemTemplateModel[] = () => {
  const dateAdded = new Date().getTime();
  return [
    {
      uuid: getId("tmi"),
      miListItemId: "mi0004",
      miListItemValue: "",
      dateAdded: dateAdded
    },
    {
      uuid: getId("tmi"),
      miListItemId: "mi0003",
      miListItemValue: "0",
      dateAdded: dateAdded
    },
    {
      uuid: getId("tmi"),
      miListItemId: "mi0001",
      miListItemValue: A4,
      dateAdded: dateAdded
    },
    {
      uuid: getId("tmi"),
      miListItemId: "mi0002",
      miListItemValue: "vertical",
      dateAdded: dateAdded
    },
    {
      uuid: getId("tmi"),
      miListItemId: "mi0101",
      miListItemValue: null,
      dateAdded: dateAdded
    }
  ];
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

export {getInitialAppState, getInitialTamplate, getInitialBlock};