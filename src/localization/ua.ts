import { WordType } from "../store/translation";

const wordsUA: Record<WordType, string> = {
  name: "ОптіДок",

  //topBar
  topBarAddBlock: "Додати блок",
  topBarRemoveBlock: "Видалити блок",
  topBarCopyBlock: "Копіювати",
  topBarPasteInside: "Вставити",
  topBarPasteBefore: "Вставити попереду",
  topBarImportTemplate: "Імпортувати макет",
  topBarExportTemplate: "Експортувати макет",
  topBarNewTemplate: "Новий макет",
  topBarChangeTheme: "Змінити тему",
  topBarChangeLanguage: "Змінити мову",
  topBarCutBlock: "Вирізати блок",
  topBarDuplicateBlock: "Дублювати блок",
  topBarPrint: "Друкувати",
  topBarAddCopy: "Add copy",
  topBarRemoveCopy: "Remove copy",
  topBarPreviusCopy: "Previus copy",
  topBarNextCopy: "Next copy",
  topBarImportCSV: "Import CSV file",
  topBarExportCSV: "Export copies as CSV file",
  //sideBar
  sideBarEdit: "Макет",
  sideBarCopy: "Копії",

  //ui
  //confirms, prompts
  uiConfirmNewTemplateHeader: "Підтрердіть дію",
  uiConfirmNewTemplateText: "Впевнені що хочете перезаписати цей макет?",
  uiPasteHeader: "Вставте текст сюди",
  uiPasteText: "Не знайшов надійнішого шляху",
  uiOk: "Ок",
  uiCancel: "Відминити",
  uiConfirm: "Підтвердити",
  uiProseed: "Продовжити",
  uiPrinted: "Nadrukovano",
  uiTemplateExportred: "Maket eksportovano",
  uiTemplateDecodingProblem: "Pomylka shyfruvannya maketu",
  uiTemplateImported: "Maket importovano",
  uiTemplateImporting: "Importuvannya maketu...",
  uiTemplateExporting: "Eksportuvannya maketu...",
  //toasts
  uiNewTemplateCreated: "Новий мaкет створено",
  uiNoBlockSelected: "Жодного блоку не виділено",
  uiBlockCopiedToClipboard: "Блок скопійовано", 
  uiBlockDecodingProblem: "Помилка шифрування",
  uiImageHasToBeLessThenMB: "Помилка: Зображення має бути розміром менше 3МБ",
  uiClickOnBlockToSelectAsReference: "Click on block to select as reference",
  uiDisclamerPrintingHeader: "Information for firefox users",
  uiDisclamerPrintingText: "For better printing experience use Chrome :)\n If no, set page background manualy and zoom to default 100%(ctrl+0)",

  //mi
  miPageSize: "Розмір аркуша",
  A4: "A4",
  A4Chrome: "A4 для Chrome",
  A4Firefox: "A4 для Firefox",
  A5: "A5",
  A3: "A3",
  miPageOrientation: "Орієнтація сторінки",
  horizontal: "Горизонтально",
  vertical: "Вертикально",
  miPadding: "Відступи",
  miLastChangeTime: "Час останьої зміни",
  miName: "Назва",
  miContent: "Контент",
  miDisplay: "Відображення",
  miDisplayInline: "Стокою",
  miDisplayBlock: "Блоком",
  miDisplayFlex: "Флекс блоком",
  miDisplayNone: "Приховати",
  miInherit: "Наслідує",
  miWidth: "Широта",
  miHeight: "Висота",
  miFlexAlignHorizontal: "Флекс горизонтальне рівняння",
  miFlexAlignVertical: "Флекс вертикальне рівняння",
  miTop: "Зверху",
  miBottom: "Знизу",
  miCenter: "Поцентру",
  miRight: "Зправа",
  miLeft: "Зліва",
  miSpaceEvenly: "Space evenly",
  miSpaceAround: "Space around",
  miSpaceBetween: "Space between",
  miContentType: "Тип контенту",
  miVariableLabel: "Variable label",
  miReferenceId: "ID referenta(?)",
  miFixed: "Статичний",
  miVariable: "Змінна",
  miSelect: "Вибір",
  miCopyFrom: "Копіювати з",
  miBackgroundColor: "Колір фону",
  miBackgroundImage: "Зображення фону",
  miBackgroundSize: "Розмір фону",
  miBackgroundRepeat: "Повторення фону",
  miBackgroundPosition: "Положення фону",
  miEditMiList: "Змінити список стилів",
  miFontFamily: "Шрифт",
  miFontColor: "Колір фришту",
  miFontSize: "Розмір фрифту",
  miFontWeight: "Font weight",
  miFontStyle: "Font style",
  miFlexWrap: "Флекс перенос блоків",
  miWrap: "Переносити",
  miNoWrap: "Не переносити",
  miContain: "По меншій стороні",
  miCover: "По більшій стороні",
  miNoRepeat: "Не повторювати",
  miRepeat: "Повторювати",
  miBorder: "Border",
  miBorderTop: "Border top",
  miBorderBottom: "Border bottom",
  miBorderRight: "Border right",
  miBorderLeft: "Border left",
  miMargin: "Margin",
  miSerif: "Serif",
  miSansSerif: "SansSerif",
  miMonospace: "Monospace",
  miNormal: "Normal",
  miBold: "Bold",
  miItalic: "Italic",
  undefined: ""
};

export default wordsUA;