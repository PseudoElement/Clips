import { Injectable } from "@angular/core";
import { Languages } from "../shared/types";
import { TranslateService } from "@ngx-translate/core";
import { useTranslate } from "../shared/helpers/useTranslate";

@Injectable({
    providedIn: "root",
})
export class LanguageService {
    selectedLanguage: Languages = "ru";
    translateJSON = useTranslate("ru");

    constructor(public translate: TranslateService) {
        translate.addLangs(["ru", "en", "fr"]);
        translate.setDefaultLang("ru");
    }

    public changeLanguage(lang: Languages) {
        this.selectedLanguage = lang;
        this.translateJSON = useTranslate(lang);
        this.translate.use(lang);
    }
}
