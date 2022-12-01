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
  undefined: ""
};

export default wordsUA;