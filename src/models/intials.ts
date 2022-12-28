import { LANG_CODES } from "src/store/translation";
import { BlockMIs, BLOCK_MI_NAMES } from "./blockMIs";
import { TAB_TYPE, THEME_TYPE, Version, RandLength, A4Chrome, CONTENT_TYPE, MI_LISTITEM_TYPE, PAGE_ORIENTATION } from "./constants";
import { TemplateMIs, TEMPLATE_MI_NAMES } from "./templateMIs";
import { AppStateModel, BlockModel, CopyCellModel, CopyColumnModel, CopyRowModel, MenuItemBlockModel, MenuItemTemplateModel, TemplateModel } from "./types";

type IdType = "t" | "b" | "tmi" | "bmi" | "cclm" | "crw" | "ccel";
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
    sidebarSectionHeight: {
      [TAB_TYPE.Edit]: 45,
      [TAB_TYPE.Copy]: 45
    },
    templates: [getInitialTamplate()],
    zoomByTab: {
      [TAB_TYPE.Edit]: 1,
      [TAB_TYPE.Copy]: 1
    },
    focusedBlockSelectorID: null
  };
};

export const getInitialTamplate: ()=>TemplateModel = () => {
  return {
    uuid: getId("t"),
    dateCreated: new Date().getTime(),
    dateEdited: 0,
    name: "",
    pageSizeMM: A4Chrome,
    pageOrientation: PAGE_ORIENTATION.vertical,
    pageMargin: "0mm 0mm 0mm 0mm",
    copyColumns: [],
    copyRows: [],
    blocks: [],
    menuItems: getInitialTemplateMis()
  };
};

export const initialTemplateMIFactory: (name: TEMPLATE_MI_NAMES) => MenuItemTemplateModel = (name) => {
  const dateAdded = new Date().getTime();
  const getDefaultValue = () => {
    const listMI = TemplateMIs.find(() => NodeIterator.name === name);
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
  const getDefaultValue = () => {
    const listMI = BlockMIs.find(listMI => listMI.name === name);
    if(!listMI) {
      return;
    }
    const isCSSParam = listMI.miType === MI_LISTITEM_TYPE.blockParam;
    return isCSSParam ? listMI.defaultValue : listMI.CSSDefaultValue;
  };
  return {
    uuid: getId("bmi"),
    miListItemName: name,
    miListItemValue: getDefaultValue() || "",
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
    BLOCK_MI_NAMES.display
  ];
  return initialMINames.map(name => initialBlockMIFactory(name));
};

export const getCopyColumn: (block: BlockModel) => CopyColumnModel = (block) => {
  const colType = [CONTENT_TYPE.variable, CONTENT_TYPE.select].includes(block.contentType) ?  block.contentType : CONTENT_TYPE.variable;
  if(colType === CONTENT_TYPE.select) {
    return {
      uuid: getId("cclm"),
      label: block.variableLabel,
      targetBlockId: block.uuid,
      contentType: CONTENT_TYPE.select,
      options: [...new Set(block.contentValue.split("\n"))],
      defauldValue: block.contentValue.split("\n")[0]
    };
  }else{
    return {
      uuid: getId("cclm"),
      label: block.variableLabel,
      targetBlockId: block.uuid,
      contentType: CONTENT_TYPE.variable,
      defauldValue: block.contentValue
    };
  }
};

interface CellValueModel{
  columnId: string
  value: string
}

export const getCopyRow: (columns: CopyColumnModel[], cellValues?: CellValueModel[])=>CopyRowModel = (columns, cellValues) => {
  return {
    uuid: getId("crw"),
    cells: columns.map(col => {
      return getNewCell(col, cellValues ? cellValues.find(value => value.columnId === col.uuid) : undefined);
    })
  };
};
const getNewCell: (column: CopyColumnModel, value?: CellValueModel) => CopyCellModel = (column, value) => {
  return {
    uuid: getId("ccel"),
    columnId: column.uuid,
    value: value ? value.value : column.defauldValue
  } as CopyCellModel;
};