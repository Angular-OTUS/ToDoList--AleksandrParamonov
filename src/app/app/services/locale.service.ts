import { Injectable } from '@angular/core';
import { ILocale } from '../interfaces/locale.interface';

@Injectable({
    providedIn: 'root',
})
export class LocaleService {
    public locales: ILocale[] = [
        {
            id: 'en',
            name: 'EN',
            url: 'http://localhost:4200',
        },
        {
            id: 'ru',
            name: 'RU',
            url: 'http://localhost:4201',
        },
    ];

    public get currentLocale(): string {
        return this.locales.find((locale) => window.location.href.includes(locale.url))?.id || 'en';
    }

    public onChange(localeId: string) {
        const url = this.locales.find((locale) => locale.id === localeId)?.url;
        if (url) {
            window.location.href = url;
        }
    }
}
