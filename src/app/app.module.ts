import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';
import { AutoResizeDirective } from './directives/auto-resize.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AutoResizeDirective,
    CountdownComponent
  ],
  providers: []
})
export class AppModule { }