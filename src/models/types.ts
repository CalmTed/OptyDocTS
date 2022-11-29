import { LanguageType, WordType } from "src/store/translation";
import { ACTION_NAMES, THEME_TYPE, TAB_TYPE, CONTENT_TYPE, MI_LISTITEM_TYPE, INPUT_TYPES } from "./constants";
import { IconTypeKey } from "./icons";
import { TemplateMINames } from "./templateMIs";

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
} |{
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
}| {
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
}


export interface AppStateModel {
  version: string
  lastChange: number
  theme: THEME_TYPE
  langCode: LanguageType
  selectedTab: TAB_TYPE
  selectedBlock: string | null
  selectedCopy: number | null
  sidebarSectionHeight: number
  templates: TemplateModel[]
}

export interface TemplateModel {
  uuid: string
  dateCreated: number
  dateEdited: number
  name: string
  pageSizeMM: string //in milimeters for width and height
  pageOrientation: "vertical" | "horizontal"
  pageMargin: string[] //in any css units for top, right, bottom, left
  copyColumns: string[]
  copyRefferenceIds: string[]
  copyRows: string[]
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
}

export type MenuItemTemplateModel = {
  uuid: string
  miListItemId: TemplateMINames
  miListItemValue: string | number | null
  dateAdded: number
}
export type MenuItemBlockModel =  {
  uuid: string
  miListItemId: string
  miListItemValue: string | number | null
  valueType: CONTENT_TYPE
  variableLabel: string
  variableOptions: string[]
  refferenceId: string
  timeCreated: number
}

export interface SelectOption{
  label: string,
  value: string | number
}

export type MenuItemTemplateListItemModel = {
  uuid: string
  label: WordType
  miType: MI_LISTITEM_TYPE.templateParam
  paramName: keyof TemplateModel
  defaultValue: string | number
  isReadonly: boolean
  isAddable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
} | {
  uuid: string
  label: WordType
  miType: MI_LISTITEM_TYPE.templateCSS
  CSSParam: string
  CSSDefaultValue: string
  isAddable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
}

export type MenuItemBlockListItemModel = {
  uuid: string
  label: WordType
  miType: MI_LISTITEM_TYPE.blockParam
  paramName: keyof BlockModel
  defaultValue: string | number
  isReadonly: boolean
  isAddable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
  onChange: (newVal: string | number) => void
} | {
  uuid: string
  label: WordType
  miType: MI_LISTITEM_TYPE.blockCSS
  CSSParam: string
  CSSDefaultValue: string
  isAddable: boolean
  isCopylinkable: boolean
  inputType: INPUT_TYPES
  inputOptions: SelectOption[]
  onChange: (newVal: string | number) => void
}

export type ReducerModel = (state: AppStateModel, action: ActionModel) => {state: AppStateModel, stateUpdated: boolean}
