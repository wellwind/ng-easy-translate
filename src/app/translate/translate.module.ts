import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from './translate.service';
import { TranslateLoader, ROOT_TRANSLATE, DEFAULT_LANGUAGE, FEATURE_TRANSLATE_LOADER, FEATURE_TRANSLATE } from './consts';
import { switchMap } from 'rxjs/operators';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [TranslatePipe],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe]
})
export class TranslateModule {
  constructor() { }

  static forRoot(config: { defaultLang: string, loader: TranslateLoader }): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        {
          provide: DEFAULT_LANGUAGE,
          useValue: config.defaultLang
        },
        {
          provide: FEATURE_TRANSLATE_LOADER,
          useValue: config.loader
        },
        {
          provide: ROOT_TRANSLATE,
          useFactory: (service: TranslateService, loader: TranslateLoader) =>
            service.currentLanguage$.pipe(switchMap(language => loader(language))),
          deps: [TranslateService, FEATURE_TRANSLATE_LOADER]
        }
      ]
    };
  }

  static forFeature(loader: TranslateLoader): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        {
          provide: FEATURE_TRANSLATE_LOADER,
          useValue: loader
        },
        {
          provide: FEATURE_TRANSLATE,
          useFactory: (service: TranslateService, translateLoader: TranslateLoader) =>
            service.currentLanguage$.pipe(switchMap(language => translateLoader(language))),
          deps: [TranslateService, FEATURE_TRANSLATE_LOADER]
        }
      ]
    };
  }
}
