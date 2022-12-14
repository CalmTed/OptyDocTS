import { A3, A4, A5, INPUT_TYPES, MI_LISTITEM_TYPE, PAGE_ORIENTATION } from "./constants";
import { MenuItemTemplateListItemModel } from "./types";

export enum TEMPLATE_MI_NAMES{
  name = "name",
  size = "size",
  orientation = "orientation",
  dateEdited = "dateEdited",
  pageMargin = "pageMargin",
  background = "background",
  textColor = "textColor",
  fontFamily = "fontFamily"
}

export type TemplateMINames = "mi0001" | "mi0002" | "mi0003" | "mi0004" | "mi0005"

export const TemplateMIs:MenuItemTemplateListItemModel[] = [
  {
    name: TEMPLATE_MI_NAMES.size,
    label: "miPageSize",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "pageSizeMM",
    defaultValue: A4,
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "A4",
        value: A4
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
    name: TEMPLATE_MI_NAMES.background,
    label: "miBackground",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "background",
    CSSDefaultValue: "#fff",
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: TEMPLATE_MI_NAMES.textColor,
    label: "miTextColor",
    miType: MI_LISTITEM_TYPE.templateCSS,
    CSSParam: "color",
    CSSDefaultValue: "#000",
    isAddable: true,
    inputType: INPUT_TYPES.text,
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
  }
];