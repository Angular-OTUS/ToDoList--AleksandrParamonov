import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoButton, ITodoTaskItem } from '../../interfaces/todo.interface';
import { TodoTaskStatusTypes } from '../../types/todo.types';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'otus-todo-list-item',
    standalone: true,
    imports: [
        NgClass,
        FormsModule,
        ButtonComponent,
        TooltipDirective,
        MatLabel,
        MatInput,
        MatFormField,
        MatCardActions,
        MatCheckboxModule,
    ],
    templateUrl: './todo-list-item.component.html',
    styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
    @Input({ required: true }) todoTaskItem!: ITodoTaskItem;
    @Input() isSelected?: boolean = false;
    @Input() isChecked?: boolean = false;
    @Output() updateTodoTaskItem: EventEmitter<ITodoTaskItem> = new EventEmitter<ITodoTaskItem>();
    @Output() deleteToDoTaskItem: EventEmitter<number> = new EventEmitter<number>();
    @Output() setSelectedToDoTaskItem: EventEmitter<number> = new EventEmitter<number>();

    newTodoTaskTitle: string = '';
    isUpdateTodoTaskTitle: boolean = false;

    deleteButton: ITodoButton = {
        color: '#FFFFFF',
        background: '#E20F0F',
    }

    updateButton: ITodoButton = {
        color: '#FFFFFF',
        background: '#36E20F',
    }

    updateTodoTaskTitle(todoTask: ITodoTaskItem): void {
        todoTask.title = this.newTodoTaskTitle;
        this.updateTodoTaskItem.emit(todoTask);
        this.newTodoTaskTitle = '';
    }

    updateTodoTaskStatus(event: Event, todoTask: ITodoTaskItem): void {
        todoTask.status = todoTask.status !== TodoTaskStatusTypes.completed ? TodoTaskStatusTypes.completed : TodoTaskStatusTypes.inProgress;
        this.updateTodoTaskItem.emit(todoTask);
        event.stopPropagation();
    }

    deleteTodoItem(event: Event, taskId: number): void {
        this.deleteToDoTaskItem.emit(taskId);
        event.stopPropagation();
    }

    setSelectedTodoItem(taskId: number): void {
        this.setSelectedToDoTaskItem.emit(taskId);
    }
}
