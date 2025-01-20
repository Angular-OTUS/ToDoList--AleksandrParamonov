import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { ITodoButton, ITodoTaskItem } from '../../interfaces/todo.interface';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { NgClass } from '@angular/common';

@Component({
    selector: 'otus-todo-list-item',
    standalone: true,
    imports: [
        MatIcon,
        MatMiniFabButton,
        ButtonComponent,
        TooltipDirective,
        NgClass
    ],
    templateUrl: './todo-list-item.component.html',
    styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
    @Input({ required: true }) todoTaskItem?: ITodoTaskItem;
    @Input() isSelected?: boolean = false;
    @Output() deleteToDoTaskItem: EventEmitter<number> = new EventEmitter<number>;
    @Output() setSelectedToDoTaskItem: EventEmitter<number> = new EventEmitter<number>();

    deleteButton: ITodoButton = {
        title: 'Delete',
        color: '#FFFFFF',
        background: '#E20F0F',
    }

    deleteTodoItem(event: Event, taskId?: number): void {
        this.deleteToDoTaskItem.emit(taskId)
        event.stopPropagation();
    }

    setSelectedTodoItem(taskId?: number): void {
        this.setSelectedToDoTaskItem.emit(taskId)
    }
}
