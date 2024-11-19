import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { TodoTaskItem } from '../../interfaces/todo.interface';

@Component({
    selector: 'otus-todo-list-item',
    standalone: true,
    imports: [
        MatIcon,
        MatMiniFabButton
    ],
    templateUrl: './todo-list-item.component.html',
    styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
    @Input({ required: true }) todoTaskItem!: TodoTaskItem;
    @Output() deleteToDoTaskItem = new EventEmitter<number>;

    deleteTodoItem(taskId: number): void {
        this.deleteToDoTaskItem.emit(taskId)
    }
}
