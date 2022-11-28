export const Version = "1.1";
export const LocalStorageName = "ODState";
export const RandLength = 1000000;
export const ToastTime = 5000;
export const MinHeightTop = 400;
export const MinHeightBottom = 100;
export const ZERO = 0;
export const TWO = 2;//Well... I had to... 

export enum THEME_TYPE{
  light = "light",
  dark = "dark",
  auto = "auto"
}
export enum LANG_CODES{
  ua = "ua",
  en = "en"
}

export enum ACTION_NAMES{
  app_setTheme = "app_setTheme",
  app_setLangCode = "app_setLangCode",
  app_setTab = "app_setTab",
  app_setsidebarSectionHeight = "app_setsidebarSectionHeight"
}

export enum TAB_TYPE{
  edit = "edit",
  copy = "copy"
}

export enum CONTENT_TYPE {
  fixed = "fixed",   
  variable = "variable",
  select = "select",
  copyFrom = "copyFrom"
}

export enum MI_LISTITEM_TYPE {
  templateParam = "templateParam",
  blockParam = "blockParam",
  templateCSS = "templateCSS",
  blockCSS = "blockCSS"
}

export enum FOCUS_ORDER{
  select = "3"
}

export const A4 = ["210mm", "297.1mm"];
export const A3 = ["297mm", "419.9mm"];
export const A5 = ["148mm", "209.9mm"];