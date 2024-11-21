import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { ITodoButton, ITodoTaskItem} from '../../interfaces/todo.interface';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'otus-todo-list-item',
    standalone: true,
    imports: [
        MatIcon,
        MatMiniFabButton,
        ButtonComponent
    ],
    templateUrl: './todo-list-item.component.html',
    styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
    @Input({ required: true }) todoTaskItem!: ITodoTaskItem;
    @Output() deleteToDoTaskItem: EventEmitter<number> = new EventEmitter<number>;

    deleteButton: ITodoButton = {
        title: 'Delete',
        color: '#FFFFFF',
        background: '#E20F0F',
    }

    deleteTodoItem(taskId: number): void {
        this.deleteToDoTaskItem.emit(taskId)
    }
}
