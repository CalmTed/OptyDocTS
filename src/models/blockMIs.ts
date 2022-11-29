import { INPUT_TYPES, MI_LISTITEM_TYPE } from "./constants";

export const BlockMIs = {
  mi0001: {
    uuid: "mi0001",
    label: "miName",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "label",
    defaultValue: "",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  }
};

export type BlockMINames = keyof typeof BlockMIs