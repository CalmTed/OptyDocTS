
import { CONTENT_TYPE, CSS_DISPLAY_TYPE, INPUT_TYPES, MI_LISTITEM_TYPE, ZERO } from "./constants";
import { MenuItemBlockListItemModel} from "./types";

export enum BLOCK_MI_NAMES{
  name = "blockName",
  content = "blockContent",
  display = "blockDisplay",
  width = "width",
  height = "height",
  flexAlignHorizontal = "flexAlignHorizontal",
  flexAlignVertical = "flexAlignVertical",
  flexAlignContentVertical = "flexAlignContentVertical",
  flexWrap = "flexWrap",
  contentType = "contentType",
  variableLabel = "variableLabel",
  referenceId = "referenceId",
  backgroundColor = "backgroundColor",
  backgroundImage = "backgroundImage",
  backgroundSizeOptions = "backgroundSizeOptions",
  backgroundRepeat = "backgroundRepeat",
  backgroundPosition = "backgroundPosition",
  fontColor = "fontColor",
  fontSize = "fontSize",
  fontFamily = "fontFamily",
  fontWeight = "fontWeight",
  fontStyle = "fontStyle",
  fontIndent = "fontIndent",
  border = "border",
  borderTop = "borderTop",
  borderBottom = "borderBottom",
  borderLeft = "borderLeft",
  borderRight = "borderRight",
  padding = "padding",
  margin = "margin"
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
    inputOptions: [],
    conditions:[{
      type: "prop",
      propName: "contentType",
      blackList: [CONTENT_TYPE.copyFrom],
      whiteList: []
    },
    {
      type: "prop",
      propName: "uuid",
      propProp: "hasChildren",
      blackList: [],
      whiteList: [ZERO]
    }
    ]
    
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
    name: BLOCK_MI_NAMES.variableLabel,
    label: "miVariableLabel",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "variableLabel",
    defaultValue: "",
    isReadonly: false,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: [],
    conditions: [{
      type: "prop",
      propName: "contentType",
      blackList: [],
      whiteList: [CONTENT_TYPE.variable, CONTENT_TYPE.select]
    }]
  },
  {
    name: BLOCK_MI_NAMES.referenceId,
    label: "miReferenceId",
    miType: MI_LISTITEM_TYPE.blockParam,
    paramName: "referenceId",
    defaultValue: "",
    isReadonly: false,
    isAddable: true,
    inputType: INPUT_TYPES.blockSelect,
    inputOptions: [],
    conditions: [{
      type: "prop",
      propName: "contentType",
      blackList: [],
      whiteList: [CONTENT_TYPE.copyFrom]
    }]
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
        label: "miSpaceBetween",
        value: "space-between"
      },
      {
        label: "miSpaceAround",
        value: "space-around"
      },
      {
        label: "miSpaceEvenly",
        value: "space-evenly"
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
    name: BLOCK_MI_NAMES.flexAlignContentVertical,
    label: "miFlexAlignContentVertical",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "alignContent",
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
        label: "miSpaceBetween",
        value: "space-between"
      },
      {
        label: "miSpaceAround",
        value: "space-around"
      },
      {
        label: "miSpaceEvenly",
        value: "space-evenly"
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
    name: BLOCK_MI_NAMES.fontFamily,
    label: "miFontFamily",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "fontFamily",
    CSSDefaultValue: "#000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label:"miSerif",
        value:"serif"
      },
      {
        label:"miSansSerif",
        value:"sans-serif"
      },
      {
        label:"miMonospace",
        value:"monospace"
      } 
    ]
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
    name: BLOCK_MI_NAMES.fontWeight,
    label: "miFontWeight",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "fontWeight",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label:"miInherit",
        value:"inherit"
      },
      {
        label:"miNormal",
        value:"normal"
      },
      {
        label:"miBold",
        value:"bold"
      } 
    ]
  },
  {
    name: BLOCK_MI_NAMES.fontStyle,
    label: "miFontStyle",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "fontStyle",
    CSSDefaultValue: "inherit",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.options,
    inputOptions: [
      {
        label:"miInherit",
        value:"inherit"
      },
      {
        label:"miNormal",
        value:"normal"
      },
      {
        label:"miItalic",
        value:"italic"
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
    name: BLOCK_MI_NAMES.fontIndent,
    label: "miFontIndent",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "textIndent",
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
  },
  {
    name: BLOCK_MI_NAMES.border,
    label: "miBorder",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "border",
    CSSDefaultValue: "1px solid #000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.borderTop,
    label: "miBorderTop",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "borderTop",
    CSSDefaultValue: "1px solid #000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.borderBottom,
    label: "miBorderBottom",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "borderBottom",
    CSSDefaultValue: "1px solid #000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.borderLeft,
    label: "miBorderLeft",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "borderLeft",
    CSSDefaultValue: "1px solid #000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.borderRight,
    label: "miBorderRight",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "borderRight",
    CSSDefaultValue: "1px solid #000",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.margin,
    label: "miMargin",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "margin",
    CSSDefaultValue: "0px",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  },
  {
    name: BLOCK_MI_NAMES.padding,
    label: "miPadding",
    miType: MI_LISTITEM_TYPE.blockCSS,
    CSSParam: "padding",
    CSSDefaultValue: "0px",
    isCopylinkable: true,
    isAddable: true,
    inputType: INPUT_TYPES.text,
    inputOptions: []
  }
];