import { Pipe, PipeTransform } from "@angular/core";
import { ErrorDictionaryKey, IErrorDictionary, errorDictionary } from "../constants/errorDictionary";

@Pipe({
    name: "errorTransformer",
})
export class ErrorTransformerPipe implements PipeTransform {
    transform(value: ErrorDictionaryKey): string {
        return errorDictionary[value];
    }
}
