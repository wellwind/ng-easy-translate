import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { from } from 'rxjs';
import { NgxEasyTranslateModule } from '@wellwind/ngx-easy-translate';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxEasyTranslateModule.forFeature((lang) => from(import(`./i18n/${lang}`).then(result => result.lang)))
  ]
})
export class LayoutModule { }
