import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestroyerComponent } from '../../classes/destroyer.class';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ITodoTaskItem } from '../../interfaces/todo.interface';
import { TodoListService } from '../../services/todo-list.service';
import { ToastService } from '../../services/toast.service';
import { ToastMessages } from '../../types/toast.messages';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { SpinnerComponent } from '../spinner/spinner.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'otus-todo-item-view',
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        SpinnerComponent,
        CommonModule,
    ],
    templateUrl: './todo-item-view.component.html',
    styleUrl: './todo-item-view.component.scss'
})
export class TodoItemViewComponent extends DestroyerComponent implements OnInit, OnDestroy {
    todoTaskItem: BehaviorSubject<ITodoTaskItem | null> = new BehaviorSubject<ITodoTaskItem | null>(null);
    todoTaskItem$: Observable<ITodoTaskItem | null> = this.todoTaskItem.asObservable();
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoading.asObservable();
    
    constructor(
        private route: ActivatedRoute,
        private readonly todoListService: TodoListService,
        private readonly toastService: ToastService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.getTodoTask(params['id']);
        });
    }

    getTodoTask(todoTaskId: number) {
        this.isLoading.next(true);
        this.todoListService.getTaskItemById(todoTaskId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (todoTask): void => {
                this.todoTaskItem.next(todoTask);
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
