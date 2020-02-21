import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxEasyTranslateModule } from '@wellwind/ngx-easy-translate';
import { from } from 'rxjs';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxEasyTranslateModule.forFeature(lang => from(import(`./i18n/${lang}`).then(result => result.lang)))
  ]
})
export class HomeModule { }
