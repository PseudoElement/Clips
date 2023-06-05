import { Injectable } from "@angular/core";
import { Languages } from "../shared/types";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import en from "../../assets/i18n/en.json";
import ru from "../../assets/i18n/ru.json";
import fr from "../../assets/i18n/fr.json";

@Injectable({
    providedIn: "root",
})
export class LanguageService {
    selectedLanguage$ = new BehaviorSubject<Languages>("ru");

    constructor(public translate: TranslateService) {
        translate.addLangs(["ru", "en", "fr"]);
        translate.setDefaultLang("ru");
    }

    public changeLanguage(lang: Languages) {
        this.selectedLanguage$.next(lang);
        this.translate.use(lang);
    }

    public getTranslation(lang: Languages) {
        if (lang === "en") return en;
        else if (lang === "ru") return ru;
        else return fr;
    }
    public translation$(): Observable<typeof en> {
        return this.selectedLanguage$.pipe(map((lang) => (lang === "en" ? en : lang === "ru" ? ru : fr)));
    }
}
