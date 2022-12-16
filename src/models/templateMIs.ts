import { A3, A4Chrome, A4Firefox, A5, INPUT_TYPES, MI_LISTITEM_TYPE, PAGE_ORIENTATION } from "./constants";
import { MenuItemTemplateListItemModel } from "./types";

export enum TEMPLATE_MI_NAMES{
  name = "name",
  size = "size",
  orientation = "orientation",
  dateEdited = "dateEdited",
  pageMargin = "pageMargin",
  backgroundColor = "backgroundColor",
  backgroundImage = "backgroundImage",
  textColor = "textColor",
  fontFamily = "fontFamily",
  fontSize = "fontSize"
}

export type TemplateMINames = "mi0001" | "mi0002" | "mi0003" | "mi0004" | "mi0005"

export const TemplateMIs:MenuItemTemplateListItemModel[] = [
  {
    name: TEMPLATE_MI_NAMES.size,
    label: "miPageSize",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "pageSizeMM",
    defaultValue: A4Chrome,
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "A4Chrome",
        value: A4Chrome
      },
      {
        label: "A4Firefox",
        value: A4Firefox
      },
      {
        label: "A3",
        value: A3
      },
      {
        label: "A5",
        value: A5
      }
    ]
  },
  {
    name: TEMPLATE_MI_NAMES.orientation,
    label: "miPageOrientation",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "pageOrientation",
    defaultValue: PAGE_ORIENTATION.vertical,
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "vertical",
        value: PAGE_ORIENTATION.vertical
      },
      {
        label: "horizontal",
        value: PAGE_ORIENTATION.horizontal
      }
    ]
  },
  {
    name: TEMPLATE_MI_NAMES.dateEdited,
    label: "miLastChangeTime",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "dateEdited",
    defaultValue: "0",
    isReadonly: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.name,
    label: "miName",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "name",
    defaultValue: "New template",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.pageMargin,
    label: "miPadding",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "pageMargin",
    defaultValue: "0mm",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.backgroundColor,
    label: "miBackgroundColor",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "background",
    CSSDefaultValue: "#fff",
    isAddable: true,
    inputType: INPUT_TYPES.color,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.backgroundImage,
    label: "miBackgroundImage",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "background",
    CSSDefaultValue: "#fff",
    isAddable: true,
    inputType: INPUT_TYPES.file,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.textColor,
    label: "miFontColor",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "color",
    CSSDefaultValue: "#000",
    isAddable: true,
    inputType: INPUT_TYPES.color,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.fontFamily,
    label: "miFontFamily",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "fontFamily",
    CSSDefaultValue: "sans-serif",
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label:"Serif",
        value:"serif"
      },
      {
        label:"Sans-serif",
        value:"sans-serif"
      },
      {
        label:"Monospace",
        value:"monospace"
      } 
    ]
  },
  {
    name: TEMPLATE_MI_NAMES.fontSize,
    label: "miFontSize",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "fontSize",
    CSSDefaultValue: "inherit",
    isAddable: true,
    inputType: INPUT_TYPES.size,
    inputOptions: []
  }
];