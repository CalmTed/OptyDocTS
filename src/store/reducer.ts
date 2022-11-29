import { ACTION_NAMES } from "src/models/constants";
import { ReducerModel } from "src/models/types";

const reducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  const actionType = action.name.split("_")[0];
  switch(actionType) {
  case "app": 
    const redusedAction1 = appReducer(state, action);
    if(redusedAction1.stateUpdated) {
      state = redusedAction1.state;
      stateUpdated = redusedAction1.stateUpdated;
    }
    break;
  case "template":
    const redusedAction2 = templateReducer(state, action);
    if(redusedAction2.stateUpdated) {
      state = redusedAction2.state;
      stateUpdated = redusedAction2.stateUpdated;
    }
    break;
  default:
    console.error("unknown reducer type", actionType, action);
  }
  return {state,
    stateUpdated};
};

const appReducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  switch(action.name) {
  case ACTION_NAMES.app_setTheme:
    if(action.payload !== state.theme) {
      state.theme = action.payload;
      stateUpdated = true;
    } 
    break;
  case ACTION_NAMES.app_setLangCode:
    if(action.payload !== state.langCode) {
      state.langCode = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setTab:
    if(action.payload !== state.selectedTab) {
      state.selectedTab = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setsidebarSectionHeight:
    if(action.payload !== state.sidebarSectionHeight) {
      state.sidebarSectionHeight = action.payload;
      stateUpdated = true;
    }
    break;
  case ACTION_NAMES.app_setTemplate:
    if(action.payload.uuid !== state.templates[0].uuid) {
      state.templates[0] = action.payload;
      stateUpdated = true;
    }
    break;
  default:
    console.error("unknown app reducer action", action);
  }
  return {state,
    stateUpdated};
};

const templateReducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  const template = state.templates[0];
  switch(action.name) {
  case ACTION_NAMES.template_setParam:
    if(Object.keys(template).includes(action.payload.paramName)) {
      if(action.payload.value !== template[action.payload.paramName]) {
        template[action.payload.paramName] = action.payload.value as never;
        stateUpdated = true;
      } 
    }
    break;
  case ACTION_NAMES.template_setCSS:
    const targetMI = template.menuItems.find(mi => mi.uuid === action.payload.miUUID);
    if(targetMI) {
      if(action.payload.value !== targetMI.miListItemValue) {
        targetMI.miListItemValue = action.payload.value;
        stateUpdated = true;
      }
    }
    break;
  default:
    console.error("unknown template reducer action", action);
  }
  template.dateEdited = new Date().getTime();
  return {
    state,
    stateUpdated
  };
};

export {reducer};