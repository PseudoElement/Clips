import { Component } from "@angular/core";

@Component({
     selector: "app-root",
     templateUrl: "./app.component.html",
     styleUrls: ["./app.component.scss"],
})
export class AppComponent {
     title = "hosting-ang";
     name = "Luis";
     imgURL = "https://picsum.photos/id/237/500/500";
     getName() {
          return this.name;
     }
     changeImage(e: Event) {
          this.imgURL = (e.target as HTMLInputElement).value;
     }
}
