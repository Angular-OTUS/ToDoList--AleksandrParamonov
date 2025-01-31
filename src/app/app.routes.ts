import { Routes } from '@angular/router';
import { TodoListComponent } from './app/components/todo-list/todo-list.component';
import { TodoItemViewComponent } from './app/components/todo-item-view/todo-item-view.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'tasks',
		pathMatch: 'full',
	},
	{
		path: 'tasks',
		component: TodoListComponent,
		children: [
			{
				path: ':id',
				component: TodoItemViewComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: '/',
	},
];