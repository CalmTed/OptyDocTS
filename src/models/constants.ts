const Version = "1.1";
const LocalStorageName = "ODState";

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

export {Version, THEME_TYPE, LANG_CODES, LocalStorageName, ACTION_NAMES};