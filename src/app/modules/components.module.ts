import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestComponent } from "../components/test/test.component";
import { PostComponent } from "../components/post/post.component";
import { NavComponent } from "../components/nav/nav.component";
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
     declarations: [TestComponent, PostComponent, NavComponent, ModalComponent],
     imports: [CommonModule],
     exports: [TestComponent, PostComponent, NavComponent, ModalComponent],
})
export class ComponentsModule {}
