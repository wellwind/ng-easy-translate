import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxEasyTranslateLoader } from './types';
import { DEFAULT_LANGUAGE, FEATURE_TRANSLATE_LOADER, ROOT_TRANSLATE, FEATURE_TRANSLATE } from './tokens';
import { switchMap } from 'rxjs/operators';
import { NgxEasyTranslateService } from './ngx-easy-translate.service';
import { TranslatePipe } from './translate.pipe';

export const loadLanguageFactory = (service: NgxEasyTranslateService, loader: NgxEasyTranslateLoader) => {
  return service.currentLanguage$.pipe(switchMap((language) => loader(language)));
};

// @dynamic
@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class NgxEasyTranslateModule {
  static forRoot(config: { defaultLang: string, loader: NgxEasyTranslateLoader }): ModuleWithProviders {
    return {
      ngModule: NgxEasyTranslateModule,
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
          useFactory: loadLanguageFactory,
          deps: [NgxEasyTranslateService, FEATURE_TRANSLATE_LOADER]
        }
      ]
    };
  }

  static forFeature(loader: NgxEasyTranslateLoader): ModuleWithProviders {
    return {
      ngModule: NgxEasyTranslateModule,
      providers: [
        {
          provide: FEATURE_TRANSLATE_LOADER,
          useValue: loader
        },
        {
          provide: FEATURE_TRANSLATE,
          useFactory: loadLanguageFactory,
          deps: [NgxEasyTranslateService, FEATURE_TRANSLATE_LOADER]
        }
      ]
    };
  }
}
