import { Directive, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';
import { FontSizeService } from '../services/fontsize.service';
import { ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appAutoResize]',
  standalone: true,
})
export class AutoResizeDirective implements AfterViewInit {
  @Input('appAutoResize') container!: HTMLElement;

  private observer: MutationObserver;

  constructor(private el: ElementRef, private fontSizeService: FontSizeService, private cdr: ChangeDetectorRef
  ) { 
    this.observer = new MutationObserver(() => {
      this.adjustSize();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.adjustSize();
      }, 100);

      this.observer.observe(this.el.nativeElement, {
        childList: true,
        subtree: true,
        characterData: true
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustSize();
  }

  private adjustSize() {
    if (this.container) {
      this.fontSizeService.adjustFontSize(this.el.nativeElement, this.container);
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
