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
     currentDate = new Date();
     cost = 2000;
     temperature = 25.7;
     pizza = {
          toppings: ["peperoni", "bacon"],
          size: "large",
     };
     blueClass = false;
     fontSize = 46;
     images = ["https://picsum.photos/id/237/500/500", "https://picsum.photos/id/23/500/500", "https://picsum.photos/id/29/500/500"];
     getName() {
          return this.name;
     }
     changeImage(e: Event) {
          this.imgURL = (e.target as HTMLInputElement).value;
     }
     logImg(e: string) {
          console.log(e);
     }
}
