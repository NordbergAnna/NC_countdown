import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontSizeService {
  constructor() {}

  adjustFontSize(element: HTMLElement, container: HTMLElement) {
    const containerWidth = container.clientWidth - 48;
    let fontSize = 10;
    element.style.fontSize = `${fontSize}px`;
    while (element.scrollWidth <= containerWidth && fontSize < 200) {
      fontSize++;
      element.style.fontSize = `${fontSize}px`;
    }
    element.style.fontSize = `${fontSize - 1}px`;
  }
}