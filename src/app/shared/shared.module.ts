import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorTransformerPipe } from "./pipes/error-transformer.pipe";
import { EventBlockerDirective } from "./directives/event-blocker.directive";
import { SafeURLPipe } from './pipes/safe-url.pipe';

@NgModule({
    declarations: [ErrorTransformerPipe, EventBlockerDirective, SafeURLPipe],
    imports: [CommonModule],
    exports: [ErrorTransformerPipe, EventBlockerDirective, SafeURLPipe],
})
export class SharedModule {}
