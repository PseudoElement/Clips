import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ErrorDictionaryKey } from "src/app/shared/constants";
import { InputTypes } from "./model";

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnChanges {
    @Input() label: string = "";
    @Input() placeholder?: string = "";
    @Input() control: FormControl = new FormControl();
    @Input() type?: InputTypes = "text";
    @Input() format = "";

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {}

    isError(): ErrorDictionaryKey {
        if (this.control?.dirty && this.control.touched && this.control?.invalid) {
            return Object.keys(this.control?.errors as {})[0] as ErrorDictionaryKey;
        } else {
            return "" as ErrorDictionaryKey;
        }
    }
    onClick() {
        // console.log(this.control);
    }
}
