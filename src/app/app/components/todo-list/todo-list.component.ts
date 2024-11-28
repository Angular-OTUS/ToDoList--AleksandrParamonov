import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ITodoButton, ITodoTaskItem } from '../../interfaces/todo.interface';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../directives/tooltip.directive';

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
        FormsModule,
        SpinnerComponent,
        ButtonComponent,
        TooltipDirective
    ],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
    todoListTitle: string = 'ToDoList';
    todoTaskItems: ITodoTaskItem[] = [
        { id: 0, title: 'Bye a new gaming laptop', description: 'Description for Bye a new gaming laptop' },
        { id: 1, title: 'Complete previous task', description: 'Description for Complete previous task' },
        { id: 2, title: 'Create some angular app', description: 'Description for Create some angular app' },
    ];
    newTodoTaskTitle: string = '';
    newTodoTaskDescription: string = '';
    selectedItemId: number | null = null;
    isLoading: boolean = true;

    addButton: ITodoButton = {
        title: 'Add task',
        color: '#FFFFFF',
        background: '#36E20F',
    }

    ngOnInit(): void {
        setTimeout(()=> this.isLoading = false,500)
    }

    deleteToDoTaskItem(taskId: number): void {
        this.todoTaskItems = this.todoTaskItems.filter(todoTask => todoTask.id !== taskId)
    }

    addToDoTaskItem(): void {
        const id = 1 + Math.max(0, ...this.todoTaskItems.map(item => item.id));
        const title = this.newTodoTaskTitle;
        const description = this.newTodoTaskDescription;
        this.todoTaskItems.push({ id, title, description });
        this.newTodoTaskTitle = '';
        this.newTodoTaskDescription = '';
    }

    setSelectedToDoTaskItem(taskId: number): void {
        this.selectedItemId = taskId;
    }

    get selectedToDoTaskItem(): ITodoTaskItem {
        return <ITodoTaskItem>this.todoTaskItems.find(todoTask => todoTask.id === this.selectedItemId)
    }
}
