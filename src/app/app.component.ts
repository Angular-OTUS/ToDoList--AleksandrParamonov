import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './app/components/todo-list/todo-list.component';
@Component({
    selector: 'otus-app-root',
    standalone: true,
    imports: [RouterOutlet, TodoListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

}
