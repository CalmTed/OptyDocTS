import { ACTION_NAMES } from "src/models/constants";
import { ReducerModel } from "src/models/types";

const reducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  const actionType = action.name.split("_")[0];
  switch(actionType) {
  case "app": 
    const redusedAction = appReducer(state, action);
    if(redusedAction.stateUpdated) {
      state = redusedAction.state;
      stateUpdated = redusedAction.stateUpdated;
    }
    break;
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
  }
  return {state,
    stateUpdated};
};

export {reducer};