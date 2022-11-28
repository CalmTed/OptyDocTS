import { ACTION_NAMES, THEME_TYPE, LANG_CODES, TAB_TYPE, CONTENT_TYPE, MI_LISTITEM_TYPE } from "./constants";
import { languageWordNameType } from "./languageWords";

interface StoreModel {
  state: AppStateModel
  dispach: (arg: ActionModel)=> void
  showToast: (arg: string) => void
  showAlert: (
    header: string,
    text: string,
    onCancel?: () => void
  ) => void
  showConfirm: (
    header: string,
    text: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void
  showPrompt: (
    header: string,
    text: string,
    onProceed: (result: string) => void,
    onCancel?: () => void
  ) => void
}
type SubscriberModel = (arg: AppStateModel) => void

//each action have unique payload type for better reducer editing
type ActionModel = {
  name: ""
  payload: never
} |{
  name: ACTION_NAMES.app_setTheme
  payload: THEME_TYPE
} | {
  name: ACTION_NAMES.app_setLangCode
  payload: LANG_CODES
} | {
  name: ACTION_NAMES.app_setTab
  payload: TAB_TYPE
}  | {
  name: ACTION_NAMES.app_setsidebarSectionHeight
  payload: number
};

interface AppStateModel {
  version: string
  lastChange: number
  theme: THEME_TYPE
  langCode: LANG_CODES
  selectedTab: TAB_TYPE
  selectedBlock: string | null
  selectedCopy: number | null
  sidebarSectionHeight: number
  templates: TemplateModel[]
}

interface TemplateModel {
  uuid: string
  dateCreated: number
  dateEdited: number
  name: string
  pageSizeMM: string[] //in milimeters for width and height
  pageOrientation: "vertical" | "horizontal"
  pageMargin: string[] //in any css units for top, right, bottom, left
  copyColumns: string[]
  copyRefferenceIds: string[]
  copyRows: string[]
  blocks: BlockModel[]
  menuItems: MenuItemModel[]
}

interface BlockModel {
  uuid: string
  label: string
  parentId: string | null
  contentType: CONTENT_TYPE
  contentValue: string
  variableLabel: string
  variableOptions: string[]
  referenceId: string
  menuItems: MenuItemModel[]
  treeViewCollapseState: boolean
}

interface MenuItemModel {
  uuid: string
  miListItem: MenuItemListItemModel
  miListItemValue: string | null
  valueType: CONTENT_TYPE
  variableLabel: string
  variableOptions: string[]
  refferenceId: string
  timeCreated: number
}

type MenuItemListItemModel = {
  uuid: string
  label: languageWordNameType
  miType: MI_LISTITEM_TYPE.templateParam
  paramName: keyof TemplateModel
} | {
  uuid: string
  label: languageWordNameType
  miType: MI_LISTITEM_TYPE.blockParam
  paramName: keyof BlockModel
} | {
  uuid: string
  label: languageWordNameType
  miType: MI_LISTITEM_TYPE.templateCSS
  CSSParam: string
  CSSValue: string
} | {
  uuid: string
  label: languageWordNameType
  miType: MI_LISTITEM_TYPE.blockCSS
  CSSParam: string
  CSSValue: string
}

type ReducerModel = (state: AppStateModel, action: ActionModel) => {state: AppStateModel, stateUpdated: boolean}

export {StoreModel, SubscriberModel, ActionModel, ReducerModel, AppStateModel, TemplateModel, BlockModel, MenuItemModel, MenuItemListItemModel};