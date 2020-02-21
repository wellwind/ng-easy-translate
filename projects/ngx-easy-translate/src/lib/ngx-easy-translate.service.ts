import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DEFAULT_LANGUAGE } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class NgxEasyTranslateService {
  currentLanguage: string;
  currentLanguage$ = new ReplaySubject<string>(1);

  get defaultLanguage() {
    return this.defaultLang;
  }

  constructor(@Inject(DEFAULT_LANGUAGE) private defaultLang: string) {
    this.changeCurrentLanguage(this.defaultLanguage);
  }

  changeCurrentLanguage(language: string) {
    this.currentLanguage = language;
    this.currentLanguage$.next(language);
  }
}
