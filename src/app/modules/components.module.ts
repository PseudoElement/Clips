import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestComponent } from "../components/test/test.component";
import { PostComponent } from "../components/post/post.component";
import { NavComponent } from "../components/nav/nav.component";
import { ModalComponent } from "../components/modal/modal.component";
import { TabsContainerComponent } from "../components/tabs-container/tabs-container.component";
import { TabComponent } from "../components/tab/tab.component";
import { InputComponent } from "../components/input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { AlertComponent } from "../components/alert/alert.component";

@NgModule({
    declarations: [TestComponent, PostComponent, NavComponent, ModalComponent, TabsContainerComponent, TabComponent, InputComponent, AlertComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule, NgxMaskDirective, NgxMaskPipe],
    exports: [TestComponent, PostComponent, NavComponent, ModalComponent, TabsContainerComponent, TabComponent, InputComponent, AlertComponent],
    providers: [provideNgxMask()],
})
export class ComponentsModule {}
