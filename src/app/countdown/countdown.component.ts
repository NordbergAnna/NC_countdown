import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoResizeDirective } from '../directives/auto-resize.directive';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [FormsModule, RouterModule, AutoResizeDirective],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  title: string = '';
  date: string = '';
  countdown: string = '';
  countdownInterval: any;

  /**
   * The container element that will be used to adjust the font size of the countdown.
  */
  @ViewChild('countdownContainer') countdownContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   *  Initialize the countdown component.
   */
  ngOnInit() {
    this.loadFromLocalStorage();
    if (this.date) {
      this.restartCountdown();
      this.updateCountdown();
    } else {
      this.countdown = 'Please set a valid date to start the countdown.';
    }
  }
/**
 * Update the countdown to the target date.
 */
  updateCountdown() {
    if (this.date) {
      const targetDate = new Date(this.date).getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.countdown = `${days} days, ${hours} h, ${minutes}m, ${seconds}s`;
      } else {
        this.countdown = 'The date has passed, please enter a new date.';
      }
    } else {
      this.countdown = 'Please set a valid date to start the countdown.';
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('title', this.title);
    localStorage.setItem('date', this.date);
  }

  loadFromLocalStorage() {
    this.title = localStorage.getItem('title') || '';
    this.date = localStorage.getItem('date') || '';
  }

  onTitleChange() {
    this.saveToLocalStorage();
    this.cdr.detectChanges();
  }

  onDateChange() {
    this.saveToLocalStorage();
    this.cdr.detectChanges();
    this.updateCountdown();
    this.restartCountdown();
  }

  /**
   * Restart the countdown interval.
   */
  restartCountdown() {
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
}
