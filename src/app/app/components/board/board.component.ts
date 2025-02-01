import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestroyerComponent } from '../../classes/destroyer.class';
import { BehaviorSubject, Observable } from 'rxjs';
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
        CommonModule,
        TodoListItemComponent,
        SpinnerComponent,
    ],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent extends DestroyerComponent implements OnInit, OnDestroy {
    filteredTodoTaskItems: BehaviorSubject<{ inProgressTasks: ITodoTaskItem[], completedTasks: ITodoTaskItem[] }> =
        new BehaviorSubject<{ inProgressTasks: ITodoTaskItem[], completedTasks: ITodoTaskItem[] }>({
            inProgressTasks: [],
            completedTasks: []
        });
    filteredTodoTaskItems$: Observable<{ inProgressTasks: ITodoTaskItem[], completedTasks: ITodoTaskItem[] }> = this.filteredTodoTaskItems.asObservable();
    todoTaskStatus = TodoTaskStatusTypes;

    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoading.asObservable();

    constructor(
        private readonly todoListService: TodoListService,
        private readonly toastService: ToastService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.getTodoTaskItems();
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
        this.isLoading.next(true);
        this.todoListService.getTaskItems().pipe(takeUntil(this.destroy$)).subscribe({
            next: (todoTaskItems): void => {
                this.filteredTodoTaskItems.next({
                    inProgressTasks: todoTaskItems.filter(task => task.status === TodoTaskStatusTypes.inProgress),
                    completedTasks: todoTaskItems.filter(task => task.status === TodoTaskStatusTypes.completed)
                });
                this.isLoading.next(false);
            },
            error: (): void => {
                this.isLoading.next(false);
                this.toastService.showToast(ToastMessages.error);
            },
        });    
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
