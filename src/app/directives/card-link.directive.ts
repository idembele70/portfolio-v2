import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { NavigationUtility } from '../utilities/navigation.utility';

@Directive({
  selector: '[appCardLink]',
  standalone: true
})
export class CardLinkDirective implements AfterViewInit {
  private href: string | null = null;
  constructor(private readonly el: ElementRef, @Inject(DOCUMENT) private readonly document: Document) { }

  ngAfterViewInit(): void {
    this.href = this.el.nativeElement.getAttribute('data-href') as string;
  }

  @HostListener('click') onClick() {
    NavigationUtility.openLink(this.document, this.href);
  }

  @HostListener('keyup', ['$event']) onEnter(e:KeyboardEvent) {
    if (e.key !== 'Enter') return
    NavigationUtility.openLink(this.document, this.href);
  }
}
