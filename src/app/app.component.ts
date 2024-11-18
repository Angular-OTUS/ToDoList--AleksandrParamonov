import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodoListComponent} from "./app/components/todo-list/todo-list.component";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'otus-app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, MatButton, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatIcon, MatInput, MatLabel, MatMiniFabButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
