import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxEasyTranslateModule } from 'ngx-easy-translate';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEasyTranslateModule.forRoot({
      defaultLang: 'en',
      loader: (lang: string) => from(import(`./i18n/${lang}`)).pipe(map(result => result.default))
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
