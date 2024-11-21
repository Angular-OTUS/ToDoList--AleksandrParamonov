import { Component, Input } from '@angular/core';
import { ITodoButton } from "../../interfaces/todo.interface";
import { NgStyle } from '@angular/common';
@Component({
    selector: 'otus-button',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() button!: ITodoButton;
    @Input() disabled?: boolean = false;
}
