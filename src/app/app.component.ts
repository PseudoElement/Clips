import { Component } from "@angular/core";

@Component({
     selector: "app-root",
     templateUrl: "./app.component.html",
     styleUrls: ["./app.component.scss"],
})
export class AppComponent {
     log() {
          console.log(1);
     }
}
