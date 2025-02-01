import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'otus-tasks-board',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './tasks-board.component.html',
    styleUrl: './tasks-board.component.scss'
})
export class TasksBoardComponent {}
