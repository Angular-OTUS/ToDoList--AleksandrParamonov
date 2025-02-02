import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LocaleService } from '../../services/locale.service';
import { ILocale } from '../../interfaces/locale.interface';

@Component({
    selector: 'otus-tasks-board',
    standalone: true,
    imports: [RouterModule, MatButtonToggleModule],
    templateUrl: './tasks-board.component.html',
    styleUrl: './tasks-board.component.scss'
})
export class TasksBoardComponent {
    constructor(
        private localeService: LocaleService,
    ) {}

    get locales(): ILocale[] {
        return this.localeService.locales;
    }

    get currentLocale(): string {
        return this.localeService.currentLocale;
    }

    onChange(locale: string) {
        this.localeService.onChange(locale);
    }
}
