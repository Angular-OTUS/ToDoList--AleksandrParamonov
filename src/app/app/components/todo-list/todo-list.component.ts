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
import { TodoListService } from '../../services/todo-list.service';
import { ToastService } from '../../services/toast.service';
import { ToastMessages } from '../../types/toast.messages';

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
    todoTaskItems: ITodoTaskItem[] = [];
    newTodoTaskTitle: string = '';
    newTodoTaskDescription: string = '';
    selectedItemId: number | null = null;
    isLoading: boolean = true;

    addButton: ITodoButton = {
        title: 'Add task',
        color: '#FFFFFF',
        background: '#36E20F',
    }

    constructor(
        private readonly todoListService: TodoListService,
        private readonly toastService: ToastService,
    ) {
        this.todoTaskItems = this.todoListService.getTodoTaskItems();
    }

    ngOnInit(): void {
        setTimeout(() => this.isLoading = false, 500);
    }

    addTodoTaskItem(): void {
        this.todoListService.addTodoTaskItem({ title: this.newTodoTaskTitle, description: this.newTodoTaskDescription });
        this.newTodoTaskTitle = '';
        this.newTodoTaskDescription = '';
        this.toastService.showToast(ToastMessages.success);
    }

    deleteTodoTaskItem(taskId: number): void {
        this.todoListService.deleteTodoTaskItem(taskId);
        this.todoTaskItems = this.todoListService.getTodoTaskItems();
        this.toastService.showToast(ToastMessages.deleted);
    }

    setSelectedToDoTaskItem(taskId: number): void {
        this.selectedItemId = taskId;
    }

    get selectedToDoTaskItem(): ITodoTaskItem {
        return <ITodoTaskItem>this.todoTaskItems.find(todoTask => todoTask.id === this.selectedItemId);
    }

    updateTodoTaskTitle(updateTodoTask: { id: number, title: string }): void {
        this.todoListService.updateTodoTaskTitle(updateTodoTask);
        this.todoTaskItems = this.todoListService.getTodoTaskItems();
        this.toastService.showToast(ToastMessages.update);
    }
}
