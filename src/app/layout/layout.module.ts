import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { from } from 'rxjs';
import { TranslateModule } from '../translate/translate.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule.forFeature((lang) => from(import(`./i18n/${lang}`).then(result => result.default)))
  ]
})
export class LayoutModule { }
