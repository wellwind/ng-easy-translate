import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule } from './i18n/translate.module';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLang: 'en',
      loader: (lang: string) => from(import(`./i18n/${lang}`)).pipe(map(result => result.default))
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
