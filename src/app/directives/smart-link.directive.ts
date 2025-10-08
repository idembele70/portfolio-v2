import { NavigationUtility } from './../utilities/navigation.utility';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSmartLink]',
  standalone: true
})
export class SmartLinkDirective implements OnChanges {
  @Input('appSmartLink') href = ''
  @Input() key!: string;
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly  document: Document
  ) { }

  ngOnChanges(): void {
      if (!this.href) return;

      this.renderer.setAttribute(this.el.nativeElement, 'href', this.href);

      if (this.href.includes('assets')){
        this.renderer.setAttribute(this.el.nativeElement, 'download', '')
        return;
      }
      this.renderer.setAttribute(this.el.nativeElement, 'target', '_blank');
      this.renderer.setAttribute(this.el.nativeElement, 'rel', 'noopener noreferrer');
  }

  @HostListener('document:keyup', ['$event']) onKeyUp(e: KeyboardEvent) {
    if (e.key === this.key)
      NavigationUtility.openLink(this.document, this.href);
  }

}
