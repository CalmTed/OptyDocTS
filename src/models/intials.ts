import { LANG_CODES } from "src/store/translation";
import { BLOCK_MI_NAMES } from "./blockMIs";
import { TAB_TYPE, THEME_TYPE, Version, RandLength, A4, CONTENT_TYPE, MI_LISTITEM_TYPE, PAGE_ORIENTATION } from "./constants";
import { TemplateMIs, TEMPLATE_MI_NAMES } from "./templateMIs";
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
    pageOrientation: PAGE_ORIENTATION.vertical,
    pageMargin: "0mm 0mm 0mm 0mm",
    copyColumns: [],
    copyRefferenceIds: [],
    copyRows: [],
    blocks: [],
    menuItems: getInitialTemplateMis()
  };
};

export const initialTemplateMIFactory: (name: TEMPLATE_MI_NAMES) => MenuItemTemplateModel = (name) => {
  const dateAdded = new Date().getTime();
  const getDefaultValue = () => {
    const listMI = TemplateMIs.find(mi => NodeIterator.name === name);
    if(!listMI) {
      return;
    }
    const isCSSParam = listMI.miType === MI_LISTITEM_TYPE.templateParam;
    return isCSSParam ? listMI.defaultValue : listMI.CSSDefaultValue;
  };
  return {
    uuid: getId("tmi"),
    miListItemName: name,
    miListItemValue: getDefaultValue() || "",
    timeAdded: dateAdded
  };
};

const getInitialTemplateMis: ()=>MenuItemTemplateModel[] = () => {
  const initialTemplateMINames = [TEMPLATE_MI_NAMES.name, TEMPLATE_MI_NAMES.size, TEMPLATE_MI_NAMES.orientation];
  return initialTemplateMINames.map(name => initialTemplateMIFactory(name));
  //THIS MI BREAKS FTP, better to use full page block and copylink margins
  // {
  //   uuid: getId("tmi"),
  //   miListItemName: TEMPLATE_MI_NAMES.pageMargin,
  //   miListItemValue: null,
  //   timeAdded: timeAdded
  // }
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
