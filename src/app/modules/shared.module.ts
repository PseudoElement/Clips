import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorTransformerPipe } from "../shared/pipes/error-transformer.pipe";
import { EventBlockerDirective } from "../shared/directives/event-blocker.directive";
import { SafeURLPipe } from "../shared/pipes/safe-url.pipe";
import { FbTimestampPipe } from "../shared/pipes/fb-timestamp.pipe";

@NgModule({
    declarations: [ErrorTransformerPipe, EventBlockerDirective, SafeURLPipe, FbTimestampPipe],
    imports: [CommonModule],
    exports: [ErrorTransformerPipe, EventBlockerDirective, SafeURLPipe, FbTimestampPipe],
})
export class SharedModule {}
