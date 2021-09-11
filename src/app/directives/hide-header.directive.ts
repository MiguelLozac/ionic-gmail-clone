import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  @Input('appHideHeader') header: any;
  saveY = 0;
  constructor() { }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrolltop;
    if (this.saveY > $event.detail.currentY) {
      console.log('Down');
    } else {
      console.log('up');
    }
    this.saveY = $event.detail.currentY;
  }
}
