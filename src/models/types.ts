import { LanguageType, WordType } from "src/store/translation";
import { BLOCK_MI_NAMES } from "./blockMIs";
import { ACTION_NAMES, THEME_TYPE, TAB_TYPE, CONTENT_TYPE, MI_LISTITEM_TYPE, INPUT_TYPES, PAGE_ORIENTATION } from "./constants";
import { IconTypeKey } from "./icons";
import { TEMPLATE_MI_NAMES } from "./templateMIs";

export interface StoreModel {
  state: AppStateModel
  dispach: (arg: ActionModel)=> void
  showToast: (
    arg: string,
    icon?: IconTypeKey
    ) => void
  showAlert: (
    header: string,
    text: string,
  onConfirm?: () => void,
    onCancel?: () => void,
    icon?: IconTypeKey
  ) => void
  showConfirm: (
    header: string,
    text: string,
    onConfirm: () => void,
    onCancel?: () => void,
    icon?: IconTypeKey
  ) => void
  showPrompt: (
    header: string,
    text: string,
    onProceed: (result: string) => void,
    onCancel?: () => void,
    icon?: IconTypeKey
  ) => void
  t: (w: WordType) => string
}
export type SubscriberModel = (arg: AppStateModel) => void

//each action have unique payload type for better reducer editing
export type ActionModel = {
  name: ""
  payload: never
} |{ //////       APP       ///////
  name: ACTION_NAMES.app_setTheme
  payload: THEME_TYPE
} | {
  name: ACTION_NAMES.app_setLangCode
  payload: LanguageType
} | {
  name: ACTION_NAMES.app_setTab
  payload: TAB_TYPE
} | {
  name: ACTION_NAMES.app_setsidebarSectionHeight
  payload: number
} | {
  name: ACTION_NAMES.app_setTemplate
  payload: TemplateModel
} | {
  name: ACTION_NAMES.app_selectBlock
  payload: string | null
} | {
  name: ACTION_NAMES.app_selectCopy
  payload: "prev" | "next" | string | null
} | {
  name: ACTION_NAMES.app_setZoom
  payload: number
} | {
  name: ACTION_NAMES.app_setFocusedBlockSelector
  payload: string | null
}| { //////    TEMPLATE     ///////
  name: ACTION_NAMES.template_setParam
  payload: {
    paramName: keyof TemplateModel
    value: string | number
  }
} | {
  name: ACTION_NAMES.template_setCSS
  payload: {
    miUUID: string 
    value: string
  }
} | {
  name: ACTION_NAMES.template_addBlock
} | {
  name: ACTION_NAMES.template_removeBlock
  payload?: string
} | {
  name: ACTION_NAMES.template_addBlockInside
  payload: {
    block: BlockModel
    parentId: string | null
    children?: BlockModel[]
  }
} | {
  name: ACTION_NAMES.template_addBlockBefore
  payload: {
    block: BlockModel
    successorId: string
    children?: BlockModel[]
  }
} | {
  name: ACTION_NAMES.template_toggleMI
  payload: {
    miName: TEMPLATE_MI_NAMES
  }
} | {
  name: ACTION_NAMES.template_addCopy
} | {
  name: ACTION_NAMES.template_removeCopy
  payload: {
    copyUUID: string
  }
} | {
  name: ACTION_NAMES.template_setCopyValue
  payload: {
    cellUUID: string
    value: string 
  }
} | {////////     BLOCK     /////////
  name: ACTION_NAMES.block_setParam
  payload: {
    paramName: keyof BlockModel
    value: string | number | boolean
    blockUUID: string | null
  }
} | {
  name: ACTION_NAMES.block_setCSS
  payload: {
    miUUID: string 
    value: string
    blockUUID: string | null
  }
} | {
  name: ACTION_NAMES.block_setFTP
  payload: {
    blockUUID: string
    width: number
    height: number
  }
} | {
  name: ACTION_NAMES.block_toggleMI
  payload: {
    blockUUID: string | null
    miName: BLOCK_MI_NAMES
  }
}

export interface AppStateModel {
  version: string
  lastChange: number
  theme: THEME_TYPE
  langCode: LanguageType
  selectedTab: TAB_TYPE
  selectedBlock: string | null
  selectedCopy: string | null
  sidebarSectionHeight: number
  templates: TemplateModel[]
  zoomByTab: {
    [TAB_TYPE.Edit] : number
    [TAB_TYPE.Copy] : number
  }
  focusedBlockSelectorID: string | null
}

export interface TemplateModel {
  uuid: string
  dateCreated: number
  dateEdited: number
  name: string
  pageSizeMM: string //in milimeters for width and height
  pageOrientation: PAGE_ORIENTATION;
  pageMargin: string //in any css units for top, right, bottom, left
  copyColumns: CopyColumnModel[]
  copyRows: CopyRowModel[]
  blocks: BlockModel[]
  menuItems: MenuItemTemplateModel[]
}

export interface BlockModel {
  uuid: string
  label: string
  parentId: string | null
  contentType: CONTENT_TYPE
  contentValue: string
  variableLabel: string
  variableOptions: string[]
  referenceId: string
  menuItems: MenuItemBlockModel[]
  treeViewCollapseState: boolean
  FTPProportions: {
    width: number,
    height: number
  }
}

export type MenuItemTemplateModel = {
  uuid: string
  miListItemName: TEMPLATE_MI_NAMES
  miListItemValue: string | number | null
  timeAdded: number
}
export type MenuItemBlockModel =  {
  uuid: string
  miListItemName: BLOCK_MI_NAMES
  miListItemValue: string | number | null
  valueType: CONTENT_TYPE
  variableLabel: string
  variableOptions: string[]
  refferenceId: string | null
  timeAdded: number
}

export interface SelectOption{
  label: string,
  value: string | number
}

export type MenuItemTemplateListItemModel = {
  name: TEMPLATE_MI_NAMES
  label: WordType
  miType: MI_LISTITEM_TYPE.templateParam
  paramName: keyof TemplateModel
  defaultValue: string | number
  isReadonly: boolean
  isAddable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
  conditions?:MICondition[]
} | {
  name: TEMPLATE_MI_NAMES
  label: WordType
  miType: MI_LISTITEM_TYPE.templateCSS
  CSSParam: string
  CSSDefaultValue: string
  isAddable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
  conditions?:MICondition[]
}

export type MenuItemBlockListItemModel = {
  name: BLOCK_MI_NAMES
  label: WordType
  miType: MI_LISTITEM_TYPE.blockParam
  paramName: keyof BlockModel
  defaultValue: string | number
  isReadonly: boolean
  isAddable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
  conditions?:MICondition[]
} | {
  name: BLOCK_MI_NAMES
  label: WordType
  miType: MI_LISTITEM_TYPE.blockCSS
  CSSParam: string
  CSSDefaultValue: string
  isAddable: boolean
  isCopylinkable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
  conditions?:MICondition[]
}

export type MICondition = {
  type: "prop"
  propName: keyof TemplateModel | keyof BlockModel
  propProp?: "hasChildren"
  whiteList: (string | number)[]
  blackList: (string | number)[] 
} | {
  type: "css"
  cssPropName: BLOCK_MI_NAMES | TEMPLATE_MI_NAMES
  whiteList: (string | number)[]
  blackList: (string | number)[]
}

export type ReducerModel = (state: AppStateModel, action: ActionModel) => {state: AppStateModel, stateUpdated: boolean}

export type CopyColumnModel = {
  uuid: string
  label: string
  targetBlockId: string
  contentType: CONTENT_TYPE.variable
  defauldValue: string
} | {
  uuid: string
  label: string
  targetBlockId: string
  contentType: CONTENT_TYPE.select
  options: string[]
  defauldValue: string
}
export interface CopyRowModel{
  uuid: string
  cells: CopyCellModel[]
}
export interface CopyCellModel{
  uuid: string
  columnId: string
  value: string
}