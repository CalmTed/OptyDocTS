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
  topBarAddCopy: "Додати копію",
  topBarRemoveCopy: "Видалити копію",
  topBarPreviusCopy: "Попередня копія",
  topBarNextCopy: "Наступна копія",
  topBarImportCSV: "Імпортувати CSV файл",
  topBarExportCSV: "Експортувати копії у CSV файл",
  topBarVideo: "Відео-інструкція",
  topBarFeedback: "Залишити вігук",
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
  uiPrinted: "Надруковано",
  uiTemplateExportred: "Макет експортовано",
  uiTemplateDecodingProblem: "Помилка шифрування макету",
  uiTemplateImported: "Макет імпортовано",
  uiTemplateImporting: "Імпортування макету...",
  uiTemplateExporting: "Експортування макету...",
  uiNone: "Не обрано",
  uiBetterHorizontalHeader:"Вибач, це прототип, він непридатний для використання у вертикальному вигляді",
  uiBetterHorizontalText:"Краще відкрий на повноцінному екрані комп'ютера чи ноутбука",
  //toasts
  uiNewTemplateCreated: "Новий мaкет створено",
  uiNoBlockSelected: "Жодного блоку не виділено",
  uiBlockCopiedToClipboard: "Блок скопійовано", 
  uiBlockDecodingProblem: "Помилка шифрування",
  uiImageHasToBeLessThenMB: "Помилка: Зображення має бути розміром менше 3МБ",
  uiClickOnBlockToSelectAsReference: "Натиспість на блок, щоб обрати його як той, з якого копіювати дані",
  uiDisclamerPrintingHeader: "Інформація для користувачів Firefox",
  uiDisclamerPrintingText: "Для друку краще користуйтесь Chrome :)\n Якщо ні, тоді ставте вручну фон білим і масштаб сторінки за замовчуванням (ctrl+0)",
  uiCopyesDilitionConfirmationHeader: "Ця дія змінить структуру копіювання",
  uiCopyesDilitionConfirmationText: "Ви впевнені що хочете змінити тип контенту? Це призведе до видалення всіх копій",
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
  miPadding: "Відступи зсередини",
  miLastChangeTime: "Час останьої зміни",
  miName: "Назва",
  miContent: "Контент",
  miDisplay: "Відображення",
  miDisplayInline: "Стокою",
  miDisplayBlock: "Блоком",
  miDisplayFlex: "Флекс блоком",
  miDisplayNone: "Приховати",
  miInherit: "Наслідує",
  miWidth: "Ширина",
  miHeight: "Висота",
  miFlexAlignHorizontal: "Флекс горизонтальне рівняння",
  miFlexAlignVertical: "Флекс вертикальне рівняння",
  miFlexAlignContentVertical: "Флекс вертикальне рівняння блоків",
  miTop: "Зверху",
  miBottom: "Знизу",
  miCenter: "Поцентру",
  miRight: "Зправа",
  miLeft: "Зліва",
  miSpaceEvenly: "Рівні відступи",
  miSpaceAround: "Відступи навкруги",
  miSpaceBetween: "Відступи поміж",
  miContentType: "Тип контенту",
  miVariableLabel: "Назва змінної",
  miReferenceId: "Код блока для копіювання",
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
  miFontColor: "Колір шрифту",
  miFontSize: "Розмір шрифту",
  miFontWeight: "Жирність шрифту",
  miFontStyle: "Нахил шрифту",
  miFontIndent: "Відсутп параграфу",
  miFlexWrap: "Флекс перенос блоків",
  miWrap: "Переносити",
  miNoWrap: "Не переносити",
  miContain: "По меншій стороні",
  miCover: "По більшій стороні",
  miNoRepeat: "Не повторювати",
  miRepeat: "Повторювати",
  miBorder: "Грані",
  miBorderTop: "Грань зверху",
  miBorderBottom: "Грань знизу",
  miBorderRight: "Грань зправа",
  miBorderLeft: "Грань зліва",
  miMargin: "Відступ зовні",
  miSerif: "Із зарубками",
  miSansSerif: "Без зарубок",
  miMonospace: "З рівною шириною",
  miNormal: "Нормально",
  miBold: "Жирно",
  miItalic: "Під нахилом",
  undefined: ""
};

export default wordsUA;