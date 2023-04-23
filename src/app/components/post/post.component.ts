import {
     AfterContentInit,
     AfterViewChecked,
     AfterViewInit,
     Component,
     DoCheck,
     EventEmitter,
     Input,
     OnChanges,
     OnDestroy,
     OnInit,
     Output,
} from "@angular/core";

@Component({
     selector: "app-post",
     templateUrl: "./post.component.html",
     styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
     @Input("img") postImg = "";
     @Output() imgSelected = new EventEmitter<string>();
     constructor() {
          console.log("Contsructor called.");
     }
     ngOnInit() {
          console.log("OnInit called");
     }
     ngOnChanges() {
          console.log("ngOnChanges called");
     }
     ngDoCheck(): void {
          console.log("ngDoCheck called");
     }
     ngAfterContentInit(): void {}
     ngAfterViewInit(): void {}
     ngAfterViewChecked(): void {}
     ngOnDestroy(): void {}
}
