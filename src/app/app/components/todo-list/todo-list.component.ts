import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ITodoTaskItem } from '../../interfaces/todo.interface';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoListService } from '../../services/todo-list.service';
import { TodoCreateItemComponent } from '../todo-create-item/todo-create-item.component';
import { TodoTaskStatusTypes } from '../../types/todo.types';
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
    MatFormField,
    MatSelectModule,
    TodoListItemComponent,
    SpinnerComponent,
    TodoCreateItemComponent
],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
    todoListTitle: string = 'ToDoList';
    todoTaskItems: ITodoTaskItem[] = [];
    todoTaskStatus = TodoTaskStatusTypes;
    selectedItemId: number | null = null;
    isLoading: boolean = true;

    selectOptions: string[] = ['All', ...Object.values(TodoTaskStatusTypes)];
    selectedOption: string = this.selectOptions[0];

    constructor(
        private readonly todoListService: TodoListService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit(): void {
        setTimeout(() => this.isLoading = false, 500);
        this.getTodoTaskItems();
    }

    setSelectedToDoTaskItem(taskId: number): void {
        this.selectedItemId = taskId;
    }

    get selectedToDoTaskItem(): ITodoTaskItem {
        return <ITodoTaskItem>this.todoTaskItems.find(todoTask => todoTask.id === this.selectedItemId);
    }

    addTodoTaskItem(newTodoTask: { title: string, description: string }) {
        const id = 1 + Math.max(0, ...this.todoTaskItems.map(todoTask => todoTask.id));
        this.todoListService.addTaskItem({ id: id ,title: newTodoTask.title, description: newTodoTask.description, status: TodoTaskStatusTypes.inProgress }).subscribe({
            next: (): void => {
                this.getTodoTaskItems();
                this.toastService.showToast(ToastMessages.success);
            },
            error: (): void => {
                this.toastService.showToast(ToastMessages.error);
            },
        });
    }

    deleteTodoTaskItem(taskId: number): void {
        this.todoListService.deleteTaskItem(taskId).subscribe({
            next: (): void => {
                this.getTodoTaskItems();
                this.toastService.showToast(ToastMessages.deleted);
            },
            error: (): void => {
                this.toastService.showToast(ToastMessages.error);
            },
        });
    }

    updateTodoTaskItem(updateTodoTask: ITodoTaskItem): void {
        this.todoListService.updateTaskItem(updateTodoTask).subscribe({
            next: (): void => {
                this.getTodoTaskItems();
                this.toastService.showToast(ToastMessages.update);
            },
            error: (): void => {
                this.toastService.showToast(ToastMessages.error);
            },
        });
    }

    getTodoTaskItems() {
        this.isLoading = true;
        this.todoListService.getTaskItems().subscribe({
            next: (todoTaskItems): void => {
                this.todoTaskItems = todoTaskItems;
                this.isLoading = false;
            },
            error: (): void => {
                this.isLoading = false;
                this.toastService.showToast(ToastMessages.error);
            },
        });
    }

    get filteredTodoTaskItems(): ITodoTaskItem[] {
        return this.selectedOption === this.selectOptions[0] ?  this.todoTaskItems : this.todoTaskItems.filter((todoTask) => todoTask.status === this.selectedOption);
    }
}
