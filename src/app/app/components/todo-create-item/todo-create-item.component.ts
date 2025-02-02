import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITodoButton } from '../../interfaces/todo.interface';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { MatCardActions } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'otus-todo-create-item',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        TooltipDirective,
        MatLabel,
        MatInput,
        MatError,
        MatFormField,
        MatCardActions,
    ],
    templateUrl: './todo-create-item.component.html',
    styleUrl: './todo-create-item.component.scss'
})
export class TodoCreateItemComponent {
    form: FormGroup;
    @Output() addTodoTaskItem: EventEmitter<{ title: string, description: string }> = new EventEmitter<{ title: string, description: any }>();

    addButton: ITodoButton = {
        color: '#FFFFFF',
        background: '#36E20F',
    }

    constructor(
        private readonly formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
        });
    }

    addTodoTask(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }

        this.addTodoTaskItem.emit({ title: this.form.value.title, description: this.form.value.description });
        this.form.reset();
    }
}
