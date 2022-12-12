import { WordType } from "../store/translation";

const wordsUA: Record<WordType, string> = {
  name: "OptyDoc",

  //topBar

  //sideBar
  sideBarEdit: "Макет",
  sideBarCopy: "Копії",

  //ui
  //confirms, prompts
  uiConfirmNewTemplateHeader: "Підтрердіть дію",
  uiConfirmNewTemplateText: "Впевнені що хочете перезаписати цей макет?",
  uiPasteHeader: "Vsavte sudy",
  uiPasteText: "No znaishov krashogo vohodu",
  //toasts
  uiNewTemplateCreated: "Новий мекет створено",
  uiNoBlockSelected: "Niyakogo bloku ne vidileno",
  uiBlockCopiedToClipboard: "Blok skopiyovano", 
  uiBlockDecodingProblem: "Pomilka shifruvaniya bloku",
  uiOk: "Ок",
  uiCancel: "Відминити",
  uiConfirm: "Підтвердити",
  uiProseed: "Продовжити",

  //mi
  miPageSize: "Розмір аркуша",
  miPageOrientation: "Орієнтація сторінки",
  horizontal: "Горизонтально",
  vertical: "Вертикально",
  miPadding: "Відступи",
  miLastChangeTime: "Час останьої зміни",
  miName: "Назва",
  miContent: "Kontent",
  miDisplay: "Tip",
  miDisplayInline: "Stroka",
  miDisplayBlock: "Blok Tverdy",
  miDisplayFlex: "Blok Myakiy",
  miDisplayNone: "Pryhovano",
  miDisplayInherit: "Nasliduye",
  miWidth: "Shirota",
  miHeight: "Vysota",
  miFlexAlignHorizontal: "Flex align horizontal",
  miFlexAlignVertical: "Flex align vertical",
  A4: "A4",
  A5: "A5",
  A3: "A3",
  undefined: ""
};

export default wordsUA;