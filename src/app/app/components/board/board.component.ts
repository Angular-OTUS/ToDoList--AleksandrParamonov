import { Component, OnInit, OnDestroy } from '@angular/core';
import { DestroyerComponent } from '../../classes/destroyer.class';
import { takeUntil } from 'rxjs/operators';
import { ITodoTaskItem } from '../../interfaces/todo.interface';
import { TodoTaskStatusTypes } from '../../types/todo.types';
import { TodoListService } from '../../services/todo-list.service';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { ToastService } from '../../services/toast.service';
import { ToastMessages } from '../../types/toast.messages';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    selector: 'otus-board',
    standalone: true,
    imports: [
        TodoListItemComponent,
        SpinnerComponent,
    ],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent extends DestroyerComponent implements OnInit, OnDestroy {
    filteredTodoTaskItems: { [key: string]: ITodoTaskItem[] } = {
        inProgressTasks: [],
        completedTasks: []
    };
    todoTaskStatus = TodoTaskStatusTypes;
    isLoading: boolean = true;

    constructor(
        private readonly todoListService: TodoListService,
        private readonly toastService: ToastService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.getTodoTaskItems();
    }

    filterTodoTasks() {
        
    }

    deleteTodoTaskItem(taskId: number): void {
        this.todoListService.deleteTaskItem(taskId).pipe(takeUntil(this.destroy$)).subscribe({
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
        this.todoListService.updateTaskItem(updateTodoTask).pipe(takeUntil(this.destroy$)).subscribe({
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
        this.todoListService.getTaskItems().pipe(takeUntil(this.destroy$)).subscribe({
            next: (todoTaskItems): void => {
                this.filteredTodoTaskItems = {
                    inProgressTasks: todoTaskItems.filter(task => task.status === TodoTaskStatusTypes.inProgress),
                    completedTasks: todoTaskItems.filter(task => task.status === TodoTaskStatusTypes.completed)
                };
                this.isLoading = false;
            },
            error: (): void => {
                this.isLoading = false;
                this.toastService.showToast(ToastMessages.error);
            },
        });    
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
