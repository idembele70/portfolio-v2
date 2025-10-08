import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTiltCard]',
  standalone: true
})
export class TiltCardDirective implements OnInit, OnDestroy {
  private removeMouseMoveListener?: () => void;
  private removeMouseLeaveListener?: () => void;
  
  private readonly perspective = 900;
  private readonly rotateXFactor = 4;
  private readonly rotateYFactor = 6;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  ngOnInit(): void {
      this.removeMouseMoveListener = this.renderer.listen(this.document.body, 'mousemove', (e: MouseEvent) => {
        this.renderer.removeStyle(this.el.nativeElement, 'transition');

        const { innerWidth: W, innerHeight: H } = this.document.defaultView!;
        const x = (e.clientX - W / 2) / (W / 2);
        const y = (e.clientY - H / 2) / (H / 2);
        this.renderer.setStyle(this.el.nativeElement, 'transform', `perspective(${this.perspective}px) rotateX(${y * this.rotateXFactor}deg) rotateY(${x * this.rotateYFactor}deg)`);
      });

      this.removeMouseLeaveListener = this.renderer.listen(this.document.body, 'mouseleave', () => {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 3s ease');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'initial');
      })
  }

  ngOnDestroy(): void {
      this.removeMouseMoveListener?.();
      this.removeMouseLeaveListener?.();
  }
}
