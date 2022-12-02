
import { CSS_DISPLAY_TYPE, INPUT_TYPES, MI_LISTITEM_TYPE } from "./constants";
import { MenuItemBlockListItemModel} from "./types";

export enum BLOCK_MI_NAMES{
  name = "blockName",
  content = "blockContent",
  display = "blockDisplay",
  width = "width",
  height = "height"
}

export const BlockMIs:(MenuItemBlockListItemModel)[] = [
  {
    name: BLOCK_MI_NAMES.name,
    label: "miName",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "label",
    defaultValue: "",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.content,
    label: "miContent",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "contentValue",
    defaultValue: "",
    isReadonly: false,
    isAddable: false,
    inputType: INPUT_TYPES.textarea,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.display,
    label: "miDisplay",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "display",
    CSSDefaultValue: CSS_DISPLAY_TYPE.inherit,
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miDisplayInherit",
        value: CSS_DISPLAY_TYPE.inherit
      },
      {
        label: "miDisplayBlock",
        value: CSS_DISPLAY_TYPE.block
      },
      {
        label: "miDisplayFlex",
        value: CSS_DISPLAY_TYPE.flex
      },
      {
        label: "miDisplayInline",
        value: CSS_DISPLAY_TYPE.inline
      },
      {
        label: "miDisplayNone",
        value: CSS_DISPLAY_TYPE.none
      }
    ]
  },
  {
    name: BLOCK_MI_NAMES.width,
    label: "miWidth",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "width",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.size,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.height,
    label: "miHeight",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "height",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.size,
    inputOptions: []
  }
];