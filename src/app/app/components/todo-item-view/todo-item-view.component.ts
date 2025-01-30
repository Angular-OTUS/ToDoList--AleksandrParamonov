import { Component, OnInit, OnDestroy } from '@angular/core';
import { DestroyerComponent } from '../../classes/destroyer.class';
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
    ],
    templateUrl: './todo-item-view.component.html',
    styleUrl: './todo-item-view.component.scss'
})
export class TodoItemViewComponent extends DestroyerComponent implements OnInit, OnDestroy {
    todoTaskItem?: ITodoTaskItem;
    isLoading: boolean = false;
    
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
        this.isLoading = true;
        this.todoListService.getTaskItemById(todoTaskId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (todoTask): void => {
                this.todoTaskItem = todoTask;
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
