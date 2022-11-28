import { LocalStorageName } from "src/models/constants";
import { AppStateModel, SubscriberModel, ActionModel } from "src/models/types";
import { reducer } from "./reducer";
import { getInitialAppState } from "../models/intials";

const subscribers: SubscriberModel[] = [];

const getState: () => AppStateModel = () => {
  const localData = localStorage.getItem(LocalStorageName);
  if(localData !== null) {
    //try to get from localhost
    try{
      return JSON.parse(localData);
    }catch(e) {
      //fallback to set initial state
      const initialData = getInitialAppState();
      localStorage.setItem(LocalStorageName, JSON.stringify(initialData));
      return initialData; 
    }
  }else{
    //or get initial
    const initialData = getInitialAppState();
    localStorage.setItem(LocalStorageName, JSON.stringify(initialData));
    return initialData;
  }
};

const dispach: (arg: ActionModel) => void = (action) => {
  const {state: newState, stateUpdated: stateUpdated} = reducer(getState(), action);
  //if state has changed
  if(!stateUpdated) {
    return;
  }
  localStorage.setItem(LocalStorageName, JSON.stringify(newState));
  //notify all subscribers
  subscribers.forEach(subscriber => {
    subscriber(newState);
  });
};
const subscribe: (callback: SubscriberModel) => void = (callback) => {
  subscribers.push(callback);
};

const stateManager:{
  getState: () => AppStateModel
  dispach: (arg: ActionModel) => void
  subscribe: (callbeck: SubscriberModel) => void
} = {
  getState:getState,
  dispach:dispach,
  subscribe: subscribe
};

export default stateManager;