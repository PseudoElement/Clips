import { Component, Input } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";
import { IOption } from "src/app/shared/types";

@Component({
    selector: "app-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent {
    @Input() options: IOption[] = [];
    @Input() onSelect: (value: any) => void = () => "";
    @Input() className?: string;

    activeSelect!: IOption;
    isOpenDropdown = false;

    constructor(public languageService: LanguageService) {}

    ngOnInit() {
        this.activeSelect = this.options[0];
    }

    onWrapperHover() {
        this.isOpenDropdown = true;
    }

    onWrapperLeave() {
        this.isOpenDropdown = false;
    }

    onSelectClick(option: IOption) {
        this.activeSelect = {
            text: option.text,
            url: option.url,
            value: option.value,
        };
        this.onSelect(option.value);
    }
}
