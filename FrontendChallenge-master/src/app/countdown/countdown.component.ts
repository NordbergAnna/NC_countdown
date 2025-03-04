import { Component, OnInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadFromLocalStorage();
    if (this.date) {
        this.restartCountdown();
        this.updateCountdown();
    } else {
      this.countdown = 'Please set a valid date to start the countdown.';
    }
  }

    ngAfterViewInit() {
        setTimeout(() => {
        this.adjustFontSize(this.titleElement.nativeElement);
        this.adjustFontSize(this.countdownElement.nativeElement);
        }, 100);
    }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustFontSize(this.titleElement.nativeElement);
    this.adjustFontSize(this.countdownElement.nativeElement);
  }

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
    this.adjustFontSize(this.countdownElement.nativeElement);
  }

  saveToLocalStorage() {
    localStorage.setItem('title', this.title);
    localStorage.setItem('date', this.date);
  }

  loadFromLocalStorage() {
    this.title = localStorage.getItem('title') || '';
    this.date = localStorage.getItem('date') || '';
  }

  adjustFontSize(element: HTMLElement) {
    const containerWidth = this.countdownContainer.nativeElement.clientWidth - 48;
    let fontSize = 20;
    element.style.fontSize = `${fontSize}px`;
    while (element.scrollWidth <= containerWidth && fontSize < 200) {
      fontSize++;
      element.style.fontSize = `${fontSize}px`;
    }
    element.style.fontSize = `${fontSize - 1}px`;
    this.cdr.detectChanges();
  }

  onTitleChange() {
    this.saveToLocalStorage();
    this.cdr.detectChanges();
    this.adjustFontSize(this.titleElement.nativeElement);
}

  onDateChange() {
    this.saveToLocalStorage();
    this.cdr.detectChanges();
    this.updateCountdown();
    this.restartCountdown();
    this.adjustFontSize(this.countdownElement.nativeElement);
  }

   restartCountdown() {
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
}
