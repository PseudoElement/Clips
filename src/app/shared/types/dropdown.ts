import { Languages } from "./languageService";

export interface IOption {
    value: string;
    text: string;
    url: string;
}

export interface IOptionLanguage extends IOption {
    value: Languages;
}
