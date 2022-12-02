import { A3, A4, A5, INPUT_TYPES, MI_LISTITEM_TYPE } from "./constants";
import { MenuItemTemplateListItemModel } from "./types";

export enum TEMPLATE_MI_NAMES{
  name = "name",
  size = "size",
  orientation = "orientation",
  dateEdited = "dateEdited",
  pageMargin = "pageMargin"
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
    defaultValue: "vertical",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "vertical",
        value: "vertical"
      },
      {
        label: "horizontal",
        value: "horizontal"
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
  }
];