export const Version = "1.1";
export const LocalStorageName = "ODState";
export const RandLength = 1000000;
export const ToastTime = 5000;
export const MinHeightTop = 400;
export const MinHeightBottom = 100;
export const ZERO = 0;
export const ONE = 1;
export const TWO = 2;//Well... I had to... 
export const THOUSAND = 1000;// b.c. it would be to long to colculate it from 2 :)

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
  app_setZoom = "app_setZoom",
  app_setFocusedBlockSelector = "app_setFocusedBlockSelector",

  template_setParam = "template_setParam",
  template_setCSS = "template_setCSS",
  template_addBlock = "template_addBlock",
  template_removeBlock = "template_removeBlock",
  template_addBlockInside = "template_addBlockInside",
  template_addBlockBefore = "template_addBlockBefore",
  template_toggleMI = "template_toggleMI",
  
  block_setParam = "block_setParam",
  block_setCSS = "block_setCSS",
  block_setFTP = "block_setFTP",
  block_toggleMI = "block_toggleMI"
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

export enum MI_TARGET {
  template = "template",
  block = "block"
} 

export enum INPUT_TYPES{
  text = "text",
  textarea = "textarea",
  size = "size",
  options = "options",
  color = "color",
  margin = "margin", //not yet created
  border = "border", //not yet created
  file = "file",
  blockSelect = "blockSelect"
}

export enum FOCUS_ORDER{
  select = "3",
  miPicker = "12"
}

export enum CSS_DISPLAY_TYPE{
  none = "none",
  block = "block",
  flex = "flex",
  inline = "inline-block",
  inherit = "inherit"
}

export const AFTER_ANIMATION = 300;
//A4
// firefox 210mm 297.04mm
// chrome 210mm 297.13mm
export const A4Chrome = "210mm 297.13mm";
export const A4Firefox = "210mm 297.04mm";
export const A3 = "297mm 419.9mm";
export const A5 = "148mm 209.9mm";

export enum PAGE_ORIENTATION{
  vertical = "vertical",
  horizontal = "horizontal" 
}
export const numberMask = /(-|)([\d]{1,}(.|)[\d]{1,})/g;
export enum SIZE_UNITS{
  "%" = "%",
  mm = "mm",
  cm = "cm",
  px = "px",
  pt = "pt",
  rem = "rem",
  em = "em"
}
//we filter % character insize considerZooming component
export const sizeMask = new RegExp(
  "("
   + Object.values(SIZE_UNITS).map(unit => `^(-|)([\\d]{1,}|[\\d]{1,}.[\\d]{1,})${unit}$`).join("|")
   + ")"
);
export enum DEFAULT_VALUES{
  inherit = "inherit",
}