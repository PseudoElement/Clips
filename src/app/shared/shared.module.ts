import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorTransformerPipe } from "./pipes/error-transformer.pipe";
import { EventBlockerDirective } from "./directives/event-blocker.directive";

@NgModule({
    declarations: [ErrorTransformerPipe, EventBlockerDirective],
    imports: [CommonModule],
    exports: [ErrorTransformerPipe, EventBlockerDirective],
})
export class SharedModule {}
