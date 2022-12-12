import { LANG_CODES } from "src/store/translation";
import { BLOCK_MI_NAMES } from "./blockMIs";
import { TAB_TYPE, THEME_TYPE, Version, RandLength, A4, CONTENT_TYPE } from "./constants";
import { TEMPLATE_MI_NAMES } from "./templateMIs";
import { AppStateModel, BlockModel, MenuItemBlockModel, MenuItemTemplateModel, TemplateModel } from "./types";

type IdType = "t" | "b" | "tmi" | "bmi";
export const getId: (atr: IdType)=>string = (prefix) => {
  return `${prefix}${Math.round(Math.random() * RandLength)}`;
};

export const getInitialAppState: ()=>AppStateModel = () => {
  return {
    version: Version,
    theme: THEME_TYPE.auto,
    lastChange: new Date().getTime(),
    langCode: LANG_CODES[0],
    selectedTab: TAB_TYPE.Edit,
    selectedBlock: null,
    selectedCopy: null,
    sidebarSectionHeight: 100,
    templates: [getInitialTamplate()],
    zoomByTab: {
      [TAB_TYPE.Edit]: 1,
      [TAB_TYPE.Copy]: 1
    }
  };
};

export const getInitialTamplate: ()=>TemplateModel = () => {
  return {
    uuid: getId("t"),
    dateCreated: new Date().getTime(),
    dateEdited: 0,
    name: "",
    pageSizeMM: A4,
    pageOrientation: "vertical",
    pageMargin: "0mm 0mm 0mm 0mm",
    copyColumns: [],
    copyRefferenceIds: [],
    copyRows: [],
    blocks: [],
    menuItems: getInitialTemplateMis()
  };
};

const getInitialTemplateMis: ()=>MenuItemTemplateModel[] = () => {
  const timeAdded = new Date().getTime();
  return [
    {
      uuid: getId("tmi"),
      miListItemName: TEMPLATE_MI_NAMES.name,
      miListItemValue: "",
      timeAdded: timeAdded
    },
    {
      uuid: getId("tmi"),
      miListItemName: TEMPLATE_MI_NAMES.dateEdited,
      miListItemValue: "0",
      timeAdded: timeAdded
    },
    {
      uuid: getId("tmi"),
      miListItemName: TEMPLATE_MI_NAMES.size,
      miListItemValue: A4,
      timeAdded: timeAdded
    },
    {
      uuid: getId("tmi"),
      miListItemName: TEMPLATE_MI_NAMES.orientation,
      miListItemValue: "vertical",
      timeAdded: timeAdded
    }
    //THIS MI BREAKS FTP, better to use full page block and copylink margins
    // {
    //   uuid: getId("tmi"),
    //   miListItemName: TEMPLATE_MI_NAMES.pageMargin,
    //   miListItemValue: null,
    //   timeAdded: timeAdded
    // }
  ];
};

export const getInitialBlock: (parentId: string | null)=>BlockModel = (parentId = null) => {
  const blockId = getId("b");
  return {
    uuid: blockId,
    label: "",
    parentId: parentId,
    contentType: CONTENT_TYPE.fixed,
    contentValue: "",
    variableLabel: "",
    variableOptions: [],
    referenceId: blockId,
    menuItems: getInitialBlockMis(),
    treeViewCollapseState: false,
    FTPProportions: {
      width: 0,
      height: 0
    }
  };
};

export const initialBlockMIFactory: (name: BLOCK_MI_NAMES) => MenuItemBlockModel = (name) => {
  const dateAdded = new Date().getTime();
  return {
    uuid: getId("bmi"),
    miListItemName: name,
    miListItemValue: "",
    valueType: CONTENT_TYPE.fixed,
    variableLabel: "",
    variableOptions: [],
    refferenceId: null,
    timeAdded: dateAdded
  };
};

const getInitialBlockMis: ()=>MenuItemBlockModel[] = () => {
  const initialMINames = [
    BLOCK_MI_NAMES.name,
    BLOCK_MI_NAMES.content,
    BLOCK_MI_NAMES.display,
    BLOCK_MI_NAMES.height,
    BLOCK_MI_NAMES.width
  ];
  return initialMINames.map(name => initialBlockMIFactory(name));
};
