import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';
import { AutoResizeDirective } from './directives/auto-resize.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterModule, CountdownComponent, AutoResizeDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
}