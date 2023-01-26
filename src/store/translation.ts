import wordsEN from "../localization/en";
import wordsUA from "../localization/ua";

const words = {
  ua: wordsUA,
  en: wordsEN
};

export const LANG_CODES:LanguageType[] = Object.keys(words) as LanguageType[];

export type LanguageType = keyof typeof words;

export type WordType = keyof typeof wordsEN;

const createT = (language: LanguageType) => {
  return (w: WordType) => {
    if(words[language]?.[w]) {
      return words[language][w];
    }else{
      console.warn("no translation for string:", w);
      return w;
    }
  };
};

export default createT;