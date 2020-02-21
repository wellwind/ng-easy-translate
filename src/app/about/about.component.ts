import { Component, OnInit, Inject } from '@angular/core';
import { FEATURE_TRANSLATE } from '@wellwind/ngx-easy-translate';
import { AboutTranslate } from './i18n/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  get translate() {
    return this.featureTranslate;
  }

  constructor(@Inject(FEATURE_TRANSLATE) private featureTranslate: Observable<AboutTranslate>) { }

  ngOnInit(): void {
  }

}
