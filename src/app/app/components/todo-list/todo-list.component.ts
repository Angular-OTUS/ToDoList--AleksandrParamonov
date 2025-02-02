import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, EMPTY, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
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
import { DestroyerComponent } from '../../classes/destroyer.class';

@Component({
    selector: 'otus-todo-list',
    standalone: true,
    imports: [
    CommonModule,
    RouterOutlet,
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
export class TodoListComponent extends DestroyerComponent implements OnInit, OnDestroy {
    todoListTitle: string = 'ToDoList';
    todoTaskItems: BehaviorSubject<ITodoTaskItem[]> = new BehaviorSubject<ITodoTaskItem[]>([]);
    todoTaskItems$: Observable<ITodoTaskItem[]> = this.todoTaskItems.asObservable();
    todoTaskItemId?: number;
    todoTaskStatus = TodoTaskStatusTypes;

    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoading.asObservable();

    selectOptions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['All', ...Object.values(TodoTaskStatusTypes)]);
    selectOptions$ = this.selectOptions.asObservable();

    selectedOption: BehaviorSubject<string> = new BehaviorSubject<string>('All');
    selectedOption$ = this.selectedOption.asObservable();

    filteredTodoTaskItems$: Observable<ITodoTaskItem[] | null> = EMPTY;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private readonly todoListService: TodoListService,
        private readonly toastService: ToastService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.getTodoTaskItems();
        this.filteredTodoTaskItems$ = combineLatest([this.todoTaskItems$, this.selectedOption$]).pipe(
            map(([todoTaskItems, selectedOption]) => {
                return selectedOption === 'All'? todoTaskItems : todoTaskItems.filter((todoTask) => todoTask.status === selectedOption);
            }),
        );
        this.route.firstChild?.params.pipe(takeUntil(this.destroy$)).subscribe(params => this.todoTaskItemId = Number(params['id']));
    }

    setSelectedToDoTaskItem(taskId: number): void {
        this.router.navigate([`backlog/task/${taskId}`]);
    }

    setSelectedOption(option: string): void {
        this.selectedOption.next(option);
    }

    addTodoTaskItem(newTodoTask: { title: string, description: string }) {
        const id = 1 + Math.max(0, ...this.todoTaskItems.value.map(todoTask => todoTask.id));
        this.todoListService.addTaskItem({ id: id ,title: newTodoTask.title, description: newTodoTask.description, status: TodoTaskStatusTypes.inProgress })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
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
                this.todoTaskItems.next(todoTaskItems);
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