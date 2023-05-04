import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestComponent } from "../components/test/test.component";
import { PostComponent } from "../components/post/post.component";
import { NavComponent } from "../components/nav/nav.component";
import { ModalComponent } from "../components/modal/modal.component";
import { TabsContainerComponent } from "../components/tabs-container/tabs-container.component";
import { TabComponent } from "../components/tab/tab.component";
import { InputComponent } from "../components/input/input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@NgModule({
    declarations: [TestComponent, PostComponent, NavComponent, ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
    imports: [CommonModule, ReactiveFormsModule, SharedModule, NgxMaskDirective, NgxMaskPipe],
    exports: [TestComponent, PostComponent, NavComponent, ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
    providers: [provideNgxMask()],
})
export class ComponentsModule {}
