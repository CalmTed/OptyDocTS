import { A3, A4, A5, INPUT_TYPES, MI_LISTITEM_TYPE } from "./constants";

export const TemplateMIs = {
  mi0001: {
    uuid: "mi0001",
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
  mi0002: {
    uuid: "mi0002",
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
  mi0003: {
    uuid: "mi0003",
    label: "miLastChangeTime",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "dateEdited",
    defaultValue: "0",
    isReadonly: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  mi0004: {
    uuid: "mi0004",
    label: "miName",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "name",
    defaultValue: "New template",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  mi0005: {
    uuid: "mi0005",
    label: "miPadding",
    miType: MI_LISTITEM_TYPE.templateParam,
    paramName: "pageMargin",
    defaultValue: "0mm",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  }
};

export type TemplateMINames = keyof typeof TemplateMIs