import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { from } from 'rxjs';
import { NgxEasyTranslateModule } from 'ngx-easy-translate';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    NgxEasyTranslateModule.forFeature(lang => from(import(`./i18n/${lang}`).then(result => result.lang)))
  ]
})
export class AboutModule { }
