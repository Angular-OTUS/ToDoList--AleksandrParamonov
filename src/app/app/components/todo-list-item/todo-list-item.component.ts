import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { ITodoButton, ITodoTaskItem } from '../../interfaces/todo.interface';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'otus-todo-list-item',
    standalone: true,
    imports: [
        MatIcon,
        MatMiniFabButton,
        MatCardActions,
        MatFormField,
        MatLabel,
        MatInput,
        ButtonComponent,
        TooltipDirective,
        NgClass,
        FormsModule
    ],
    templateUrl: './todo-list-item.component.html',
    styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
    @Input({ required: true }) todoTaskItem!: ITodoTaskItem;
    @Input() isSelected?: boolean = false;
    @Output() deleteToDoTaskItem: EventEmitter<number> = new EventEmitter<number>();
    @Output() setSelectedToDoTaskItem: EventEmitter<number> = new EventEmitter<number>();
    @Output() updateTodoTaskTitle: EventEmitter<{ id: number, title: string }> = new EventEmitter<{ id: number, title: string }>();
    newTodoTaskTitle: string = '';
    isUpdateTodoTaskTitle: boolean = false;

    deleteButton: ITodoButton = {
        title: 'Delete',
        color: '#FFFFFF',
        background: '#E20F0F',
    }

    updateButton: ITodoButton = {
        title: 'Update',
        color: '#FFFFFF',
        background: '#36E20F',
    }

    deleteTodoItem(event: Event, taskId: number): void {
        this.deleteToDoTaskItem.emit(taskId);
        event.stopPropagation();
    }

    setSelectedTodoItem(taskId: number): void {
        this.setSelectedToDoTaskItem.emit(taskId);
    }

    updateTodoTitle(taskId: number): void {
        this.updateTodoTaskTitle.emit({ id: taskId, title:  this.newTodoTaskTitle });
        this.isUpdateTodoTaskTitle = !this.isUpdateTodoTaskTitle;
        this.newTodoTaskTitle = '';
    }
}
