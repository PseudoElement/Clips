import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBlockerDirective } from '../shared/directives/event-blocker.directive';



@NgModule({
  declarations: [
    EventBlockerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventBlockerDirective
  ]
})
export class DirectivesModule { }
