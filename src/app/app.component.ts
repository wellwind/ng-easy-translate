import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTranslate } from './i18n/type';
import { TranslateService } from './translate/translate.service';
import { ROOT_TRANSLATE } from './translate/consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  get currentLanguage() { return this.translateService.currentLanguage; }
  get translate() { return this.rootTranslate; }

  constructor(
    private translateService: TranslateService,
    @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<AppTranslate>
  ) { }

  ngOnInit() { }

  changeLang(lang: string) {
    this.translateService.changeCurrentLanguage(lang);
  }
}
