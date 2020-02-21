import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTranslate } from './i18n/type';
import { NgxEasyTranslateService, ROOT_TRANSLATE } from '@wellwind/ngx-easy-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  get currentLanguage() { return this.translateService.currentLanguage; }
  get translate() { return this.rootTranslate; }

  constructor(
    private translateService: NgxEasyTranslateService,
    @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<AppTranslate>
  ) { }

  ngOnInit() { }

  changeLang(lang: string) {
    this.translateService.changeCurrentLanguage(lang);
  }
}
