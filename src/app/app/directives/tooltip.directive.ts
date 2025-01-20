import { Directive, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
    selector: '[otusTooltip]',
    standalone: true,
    providers: [MatTooltip]
})
export class TooltipDirective implements OnInit, OnDestroy {
    @Input('otusTooltip') tooltipText?: string;

    constructor(private readonly matTooltip: MatTooltip) {}

    ngOnInit() {
        if (this.tooltipText) {
            this.matTooltip.message = this.tooltipText;
        }
        this.matTooltip.position = 'below';
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.matTooltip.show();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.matTooltip.hide();
    }

    ngOnDestroy() {
        this.matTooltip.ngOnDestroy();
    }
}
