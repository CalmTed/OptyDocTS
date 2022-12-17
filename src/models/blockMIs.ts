
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
  backgroundColor = "backgroundColor",
  backgroundImage = "backgroundImage",
  backgroundSizeOptions = "backgroundSizeOptions",
  backgroundRepeat = "backgroundRepeat",
  backgroundPosition = "backgroundPosition",
  fontColor = "fontColor",
  fontSize = "fontSize"
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
        label: "miLeft",
        value: "flex-start"
      },
      {
        label: "miCenter",
        value: "center"
      },
      {
        label: "miRight",
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
        label: "miTop",
        value: "flex-start"
      },
      {
        label: "miCenter",
        value: "center"
      },
      {
        label: "miBottom",
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
    name: BLOCK_MI_NAMES.fontColor,
    label: "miFontColor",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "color",
    CSSDefaultValue: "#000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.color,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.fontSize,
    label: "miFontSize",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "fontSize",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.size,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.backgroundColor,
    label: "miBackgroundColor",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "background",
    CSSDefaultValue: "#000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.color,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.backgroundImage,
    label: "miBackgroundImage",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "backgroundImage",
    CSSDefaultValue: "",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.file,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.backgroundSizeOptions,
    label: "miBackgroundSize",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "backgroundSize",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miContain",
        value: "contain"
      },
      {
        label: "miCover",
        value: "cover"
      },
      {
        label: "miInherit",
        value: "inherit"
      }
    ]
  },
  {
    name: BLOCK_MI_NAMES.backgroundRepeat,
    label: "miBackgroundRepeat",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "backgroundRepeat",
    CSSDefaultValue: "no-repeat",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miNoRepeat",
        value: "no-repeat"
      },
      {
        label: "miRepeat",
        value: "repeat"
      },
      {
        label: "miInherit",
        value: "inherit"
      }
    ]
  },
  {
    name: BLOCK_MI_NAMES.backgroundPosition,
    label: "miBackgroundPosition",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "backgroundPosition",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label: "miInherit",
        value: "inherit"
      },
      {
        label: "miCenter",
        value: "center"
      },
      {
        label: "miTop",
        value: "top"
      },
      {
        label: "miBottom",
        value: "bottom"
      },
      {
        label: "miLeft",
        value: "left"
      },
      {
        label: "miRight",
        value: "right"
      }
    ]
  }
];