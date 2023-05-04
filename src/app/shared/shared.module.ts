import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorTransformerPipe } from "./pipes/error-transformer.pipe";

@NgModule({
    declarations: [ErrorTransformerPipe],
    imports: [CommonModule],
    exports: [ErrorTransformerPipe],
})
export class SharedModule {}
