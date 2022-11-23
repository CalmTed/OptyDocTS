const Version = "1.1";
const LocalStorageName = "ODState";
const RandLength = 1000000;

enum THEME_TYPE{
  light = "light",
  dark = "dark",
  auto = "auto"
}
enum LANG_CODES{
  ua = "ua",
  en = "en"
}

enum ACTION_NAMES{
  app_setTheme = "app_setTheme",
  app_setLangCode = "app_setLangCode"
}

enum TAB_TYPE{
  edit = "edit",
  copy = "copy"
}

enum CONTENT_TYPE {
  fixed = "fixed",   
  variable = "variable",
  select = "select",
  copyFrom = "copyFrom"
}

enum MI_LISTITEM_TYPE {
  templateParam = "templateParam",
  blockParam = "blockParam",
  templateCSS = "templateCSS",
  blockCSS = "blockCSS"
}

const A4 = ["210mm", "297.1mm"];
const A3 = ["297mm", "419.9mm"];
const A5 = ["148mm", "209.9mm"];


export {Version, THEME_TYPE, LANG_CODES, LocalStorageName, ACTION_NAMES, TAB_TYPE, CONTENT_TYPE, MI_LISTITEM_TYPE, RandLength, A4, A3, A5};