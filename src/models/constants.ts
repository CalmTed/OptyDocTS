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

export enum ACTION_NAMES{
  app_setTheme = "app_setTheme",
  app_setLangCode = "app_setLangCode",
  app_setTab = "app_setTab",
  app_setsidebarSectionHeight = "app_setsidebarSectionHeight",
  app_setTemplate = "app_setTemplate",
  app_selectBlock = "app_selectBlock",

  template_setParam = "template_setParam",
  template_setCSS = "template_setCSS",
  template_addBlock = "template_addBlock",
  template_removeBlock = "template_removeBlock",
  template_addBlockInside = "template_addBlockInside",
  template_addBlockBefore = "template_addBlockBefore",
  
  block_setParam = "block_setParam",
  block_setCSS = "block_setCSS"
}

export enum TAB_TYPE{
  Edit = "Edit",
  Copy = "Copy"
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

export enum INPUT_TYPES{
  text = "text",
  textarea = "textarea",
  size = "size",
  options = "options",
  color = "color",
  margin = "margin",
  border = "border"
}

export enum FOCUS_ORDER{
  select = "3"
}

export enum CSS_DISPLAY_TYPE{
  none = "none",
  block = "block",
  flex = "flex",
  inline = "inline",
  inherit = "inherit"
}


export const A4 = "210mm 297.1mm";
export const A3 = "297mm 419.9mm";
export const A5 = "148mm 209.9mm";