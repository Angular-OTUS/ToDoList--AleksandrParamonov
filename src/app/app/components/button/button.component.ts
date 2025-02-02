import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'otus-button',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() color?: string;
    @Input() background?: string;
    @Input() disabled?: boolean = false;
}