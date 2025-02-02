import { Routes } from '@angular/router';
import { TasksBoardComponent } from './app/components/tasks-board/tasks-board.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'backlog',
		pathMatch: 'full',
	},
	{
		path: '',
		component: TasksBoardComponent,
		children: [
			{
				path: 'backlog',
				loadComponent: () => import('./app/components/todo-list/todo-list.component').then((c) => c.TodoListComponent),
				children: [
					{
						path: 'task/:id',
						loadComponent: () => import('./app/components/todo-item-view/todo-item-view.component').then((c) => c.TodoItemViewComponent),
					},
				],
			},
			{
				path: 'board',
				loadComponent: () => import('./app/components/board/board.component').then((c) => c.BoardComponent),
			},
		],
	},
	{
		path: '**',
		redirectTo: 'backlog',
	},
];