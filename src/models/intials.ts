import { LANG_CODES, THEME_TYPE, Version } from "./constants";
import { AppStateModel } from "./types";

const getInitialAppState: ()=>AppStateModel = () => {
  return {
    version: Version,
    theme: THEME_TYPE.dark,
    lastChange: new Date().getTime(),
    langCode: LANG_CODES.ua
  };
};

export {getInitialAppState};