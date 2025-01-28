import { Injectable } from '@angular/core';
import { ITodoTaskItem } from '../interfaces/todo.interface';

@Injectable({
	providedIn: 'root',
})

export class TodoListService {
	private todoTaskItems: ITodoTaskItem[] = [
		{ id: 0, title: 'Bye a new gaming laptop', description: 'Description for Bye a new gaming laptop' },
		{ id: 1, title: 'Complete previous task', description: 'Description for Complete previous task' },
		{ id: 2, title: 'Create some angular app', description: 'Description for Create some angular app' },
	];

	public addTodoTaskItem(newTodoTask: { title: string; description: string }): void {
		const id = 1 + Math.max(0, ...this.todoTaskItems.map(todoTask => todoTask.id));
		this.todoTaskItems.push({ id: id, title: newTodoTask.title, description: newTodoTask.description });
	}

	public deleteTodoTaskItem(taskId: number): void {
		this.todoTaskItems = this.todoTaskItems.filter(todoTask => todoTask.id !== taskId);
	}

	public updateTodoTaskTitle(updateTodoTask: { id: number, title: string }): void {
		this.todoTaskItems = this.todoTaskItems.map(todoTask => ({ ...todoTask, title: todoTask.id === updateTodoTask.id ? updateTodoTask.title : todoTask.title }));
	}

	public getTodoTaskItems() {
		return this.todoTaskItems;
	}
}