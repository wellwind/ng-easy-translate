import { Component, OnInit, Inject } from '@angular/core';
import { LayoutTranslate } from './i18n/type';
import { Observable } from 'rxjs';
import { TranslateService } from '../translate/translate.service';
import { FEATURE_TRANSLATE } from '../translate/consts';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  get currentLanguage() { return this.translateService.currentLanguage; }
  get translate() { return this.featureTranslate; }

  constructor(
    private translateService: TranslateService,
    @Inject(FEATURE_TRANSLATE) private featureTranslate: Observable<LayoutTranslate>) { }

  ngOnInit() {
  }

}
