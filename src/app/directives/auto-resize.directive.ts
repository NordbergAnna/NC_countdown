import { Directive, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';
import { FontSizeService } from '../services/fontsize.service';
import { ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appAutoResize]',
  standalone: true,
  providers: [FontSizeService]
})
export class AutoResizeDirective implements AfterViewInit {
  @Input('appAutoResize') container!: HTMLElement;
/**
 * The MutationObserver instance that will observe changes to the element's content.
 */
  private observer: MutationObserver;

  constructor(private el: ElementRef, private fontSizeService: FontSizeService, private cdr: ChangeDetectorRef
  ) { 
    /**
     * Create a new MutationObserver to adjust the font size of the element when the content changes.
     */
    this.observer = new MutationObserver(() => {
      this.adjustSize();
    });
  }

  /**
   * Adjust the font size of the element to fit the container after the view has been initialized.
   */

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

  /**
   * Adjust the font size of the element to fit the container.
   */ 
  private adjustSize() {
    if (this.container) {
      this.fontSizeService.adjustFontSize(this.el.nativeElement, this.container);
      this.cdr.detectChanges();
    }
  }

  /**
   * Clean up the observer when the directive is destroyed.
   */
  ngOnDestroy() {
    this.observer.disconnect();
  }
}
