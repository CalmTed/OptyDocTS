
import { CONTENT_TYPE, CSS_DISPLAY_TYPE, INPUT_TYPES, MI_LISTITEM_TYPE } from "./constants";
import { MenuItemBlockListItemModel} from "./types";

export enum BLOCK_MI_NAMES{
  name = "blockName",
  content = "blockContent",
  display = "blockDisplay",
  width = "width",
  height = "height",
  flexAlignHorizontal = "flexAlignHorizontal",
  flexAlignVertical = "flexAlignVertical",
  flexWrap = "flexWrap",
  contentType = "contentType",
  background = "background",
  textColor = "textColor"

}

export const BlockMIs:(MenuItemBlockListItemModel)[] = [
  {
    name: BLOCK_MI_NAMES.name,
    label: "miName",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "label",
    defaultValue: "New Block",
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
    isAddable: false,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miInherit",
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
    name: BLOCK_MI_NAMES.contentType,
    label: "miContentType",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "contentType",
    defaultValue: CONTENT_TYPE.fixed,
    isReadonly: false,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miFixed",
        value: CONTENT_TYPE.fixed
      },
      {
        label: "miVariable",
        value: CONTENT_TYPE.variable
      },
      {
        label: "miSelect",
        value: CONTENT_TYPE.select
      },
      {
        label: "miCopyFrom",
        value: CONTENT_TYPE.copyFrom
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
  },
  {
    name: BLOCK_MI_NAMES.flexAlignHorizontal,
    label: "miFlexAlignHorizontal",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "justifyContent",
    CSSDefaultValue: "flex-start",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miAlignLeft",
        value: "flex-start"
      },
      {
        label: "miAlignCenter",
        value: "center"
      },
      {
        label: "miAlignRight",
        value: "flex-end"
      },
      {
        label: "miInherit",
        value: "inherit"
      }
    ],
    conditions:[
      {
        type: "css",
        cssPropName: BLOCK_MI_NAMES.display,
        whiteList: [CSS_DISPLAY_TYPE.flex],
        blackList: []
      }
    ]
  },
  {
    name: BLOCK_MI_NAMES.flexAlignVertical,
    label: "miFlexAlignVertical",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "alignItems",
    CSSDefaultValue: "flex-start",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miAlignTop",
        value: "flex-start"
      },
      {
        label: "miAlignCenter",
        value: "center"
      },
      {
        label: "miAlignBottom",
        value: "flex-end"
      },
      {
        label: "miInherit",
        value: "inherit"
      }
    ],
    conditions:[
      {
        type: "css",
        cssPropName: BLOCK_MI_NAMES.display,
        whiteList: [CSS_DISPLAY_TYPE.flex],
        blackList: []
      }
    ]
  },
  {
    name: BLOCK_MI_NAMES.flexWrap,
    label: "miFlexWrap",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "flexWrap",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miWrap",
        value: "wrap"
      },
      {
        label: "miNoWrap",
        value: "nowrap"
      },
      {
        label: "miInherit",
        value: "inherit"
      }
    ]
  },
  {
    name: BLOCK_MI_NAMES.textColor,
    label: "miTextColor",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "color",
    CSSDefaultValue: "#0000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.background,
    label: "miBackground",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "background",
    CSSDefaultValue: "#0000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  }
];