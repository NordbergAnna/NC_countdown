import { Component, OnInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontSizeService } from '../services/fontsize.service';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  title: string = '';
  date: string = '';
  countdown: string = '';
  countdownInterval: any;

  @ViewChild('titleElement') titleElement!: ElementRef;
  @ViewChild('countdownElement') countdownElement!: ElementRef;
  @ViewChild('countdownContainer') countdownContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private fontSizeService: FontSizeService) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
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
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   */
    ngAfterViewInit() {
        setTimeout(() => {
            this.fontSizeService.adjustFontSize(this.titleElement.nativeElement, this.countdownContainer.nativeElement);
            this.fontSizeService.adjustFontSize(this.countdownElement.nativeElement, this.countdownContainer.nativeElement);
        }, 100);
    }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.fontSizeService.adjustFontSize(this.titleElement.nativeElement, this.countdownContainer.nativeElement);
    this.fontSizeService.adjustFontSize(this.countdownElement.nativeElement, this.countdownContainer.nativeElement);
  }

  /**
   * Updates the countdown based on the date set by the user.
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
    this.fontSizeService.adjustFontSize(this.countdownElement.nativeElement, this.countdownContainer.nativeElement);
  }

  /**
   * Saves the title and date to the local storage.
   */
  saveToLocalStorage() {
    localStorage.setItem('title', this.title);
    localStorage.setItem('date', this.date);
  }

  /**
   * Loads the title and date from the local storage.
   */
  loadFromLocalStorage() {
    this.title = localStorage.getItem('title') || '';
    this.date = localStorage.getItem('date') || '';
  }

  /**
   * Handles the title change event.
   */
  onTitleChange() {
    this.saveToLocalStorage();
    this.cdr.detectChanges();
    this.fontSizeService.adjustFontSize(this.titleElement.nativeElement, this.countdownContainer.nativeElement);
}

/**
 * Handles the date change event.
 */
  onDateChange() {
    this.saveToLocalStorage();
    this.cdr.detectChanges();
    this.updateCountdown();
    this.restartCountdown();
    this.fontSizeService.adjustFontSize(this.titleElement.nativeElement, this.countdownContainer.nativeElement);
  }

  /**
   * Restarts the countdown interval.
   */
   restartCountdown() {
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
}
