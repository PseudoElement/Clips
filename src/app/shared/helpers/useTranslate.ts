import { Languages } from "../types";
import en from "../../../assets/i18n/en.json";
import ru from "../../../assets/i18n/ru.json";
import fr from "../../../assets/i18n/fr.json";

export function useTranslate(lang: Languages) {
    if (lang === "en") return en;
    else if (lang === "ru") return ru;
    else return fr;
}
