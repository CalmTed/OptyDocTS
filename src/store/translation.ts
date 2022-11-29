import wordsEN from "../localization/en";
import wordsUA from "../localization/ua";

const words = {
  en: wordsEN,
  ua: wordsUA
};

export const LANG_CODES:LanguageType[] = Object.keys(words) as LanguageType[];

export type LanguageType = keyof typeof words;

export type WordType = keyof typeof wordsEN;

const createT = (language: LanguageType) => {
  return (w: WordType) => {
    // console.log(words);
    // console.log(language);
    return words[language]?.[w] || w;
  };
};

export default createT;