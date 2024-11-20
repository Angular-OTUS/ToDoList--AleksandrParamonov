import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ITodoTaskItem } from '../../interfaces/todo.interface';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
    selector: 'otus-todo-list',
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatCardActions,
        MatButton,
        MatIcon,
        MatMiniFabButton,
        MatFormField,
        MatInput,
        MatLabel,
        TodoListItemComponent,
        FormsModule
    ],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
    todoTaskItems: ITodoTaskItem[] = [
        { id: 0, text: 'Bye a new gaming laptop' },
        { id: 1, text: 'Complete previous task' },
        { id: 2, text: 'Create some angular app' },
    ];
    newTodoTask: string = '';

    deleteToDoTaskItem(taskId: number): void {
        this.todoTaskItems = this.todoTaskItems.filter(todoTask => todoTask.id !== taskId)
    }

    addToDoTaskItem(): void {
        const id = 1 + Math.max(0, ...this.todoTaskItems.map(item => item.id));
        const text = this.newTodoTask;
        this.todoTaskItems.push({ id, text });
        this.newTodoTask = '';
    }
}
