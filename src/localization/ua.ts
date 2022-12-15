import { WordType } from "../store/translation";

const wordsUA: Record<WordType, string> = {
  name: "OptyDoc",

  //topBar
  topBarAddBlock: "Dodaty blok",
  topBarRemoveBlock: "Vydalyty blok",
  topBarCopyBlock: "Kopiyuvaty",
  topBarPasteInside: "Vstavity vseredinu",
  topBarPasteBefore: "Vstavity pered vydilenym",
  topBarImportTemplate: "Importuvaty maket",
  topBarExportTemplate: "Eksportuvaty maket",
  topBarNewTemplate: "Novy maket",
  topBarChangeTheme: "Zminyty temu",
  topBarChangeLanguage: "Zminyty movu",
  topBarCutBlock: "Virevaty blok",
  topBarDuplicateBlock: "Dublyuvaty blok",
  //sideBar
  sideBarEdit: "Макет",
  sideBarCopy: "Копії",

  //ui
  //confirms, prompts
  uiConfirmNewTemplateHeader: "Підтрердіть дію",
  uiConfirmNewTemplateText: "Впевнені що хочете перезаписати цей макет?",
  uiPasteHeader: "Vsavte tekst sudy",
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
  A4: "A4",
  A5: "A5",
  A3: "A3",
  miPageOrientation: "Орієнтація сторінки",
  horizontal: "Горизонтально",
  vertical: "Вертикально",
  miPadding: "Відступи",
  miLastChangeTime: "Час останьої зміни",
  miName: "Назва",
  miContent: "Kontent",
  miDisplay: "Vidobrajannya",
  miDisplayInline: "Strokoy",
  miDisplayBlock: "Blokom",
  miDisplayFlex: "Fleks",
  miDisplayNone: "Pryhovano",
  miInherit: "Nasliduye",
  miWidth: "Shirota",
  miHeight: "Vysota",
  miFlexAlignHorizontal: "Fleks align horizontal",
  miFlexAlignVertical: "Fleks align vertical",
  miAlignTop: "Zverhu",
  miAlignBottom: "Znizu",
  miAlignCenter: "Po centru",
  miAlignRight: "Zprava",
  miAlignLeft: "Zliva",
  miContentType: "Tip kontentu",
  miFixed: "Statychny",
  miVariable: "Zminna",
  miSelect: "Vibir",
  miCopyFrom: "Kopiyuvaty z",
  miBackground: "Fon",
  miBackgroundImage: "Zobrazhennya fonu",
  miBackgroundSize: "Rozmir fonu",
  miEditMiList: "Zminyty spisok styliv",
  miTextColor: "Kolir tekstu",
  miFontFamily: "Shrift",
  miFlexWrap: "Fleks perenos blokov",
  miWrap: "Perenosit'",
  miNoWrap: "Ne perenosit'",
  undefined: ""
};

export default wordsUA;