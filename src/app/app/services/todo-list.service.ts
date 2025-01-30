import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodoTaskItem } from '../interfaces/todo.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})

export class TodoListService {
	private baseUrl: URL = new URL('http://localhost:3000/todos')

	constructor(private http: HttpClient) {}

	public addTaskItem(newTodoTask: ITodoTaskItem): Observable<ITodoTaskItem> {
		return this.http.post<ITodoTaskItem>(this.baseUrl.href, {...newTodoTask, id: newTodoTask.id.toString()});
	}

	public deleteTaskItem(taskId: number): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl.href}/${taskId}`);
	}

	public updateTaskItem(newTodoTask: ITodoTaskItem): Observable<ITodoTaskItem> {
		return this.http.put<ITodoTaskItem>(`${this.baseUrl.href}/${newTodoTask.id}`, newTodoTask);
	}

	public getTaskItems(): Observable<ITodoTaskItem[]> {
		return this.http.get<ITodoTaskItem[]>(this.baseUrl.href);
	}
}