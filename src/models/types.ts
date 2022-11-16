import { ACTION_NAMES, THEME_TYPE, LANG_CODES } from "./constants";

interface StoreModel {
  dispach: (arg: ActionModel)=> void
  getState: () => AppStateModel
  subscribe: (arg: (newState: AppStateModel) => void) => void
}
type SubscriberModel = (arg: AppStateModel) => void


//each acrtion have unique payload type for better reducer editing
type ActionModel = {
  name: ACTION_NAMES.app_setTheme
  payload: THEME_TYPE
} | {
  name: ACTION_NAMES.app_setLangCode
  payload: LANG_CODES
};

interface AppStateModel {
  version: string
  theme: THEME_TYPE
  langCode: LANG_CODES
  lastChange: number
}

type ReducerModel = (state: AppStateModel, action: ActionModel) => {state: AppStateModel, stateUpdated: boolean}

export {StoreModel, SubscriberModel, ActionModel, ReducerModel, AppStateModel};