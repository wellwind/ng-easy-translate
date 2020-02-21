# NgxEasyTranslate

An easy to use, strong typed i18n Angular library.

## Feature

- Internationalization.
- STRONG TYPED supported.
- Lazy load languages supported.
- Lazy load languages by seperated feature modules suppported.

## Getting Started

### Basic Usage

1. Install package

```shell
npm install @wellwind/ngx-easy-translate
```

2. Prepare your language loader, and register to `NgxEasyTranslateModule`.

```typescript
import { NgxEasyTranslateModule } from '@wellwind/ngx-easy-translate';
import { of } from 'rxjs';

@NgModule({
  ...,
  imports: [
    ...,
    NgxEasyTranslateModule.forRoot(
      defaultLang: 'en',
      loader: (lang: string) => {
        if(lang === 'en') {
          return of({
            title: 'Home',
            profile: {
              name: 'Your Name'
            },
            sayHi: (name) => `Greeting, ${name}.`
          });
        } else if(lang === 'zh'){
          return of({
            title: '首頁',
            profile: {
              name: '你的名字',
            },
            sayHi: (name) => `哈囉，${name}。`
          });
        }
      }
    })
  ]
})
```

3. Inject `ROOT_TRANSLATE` to get language, it's an Observable.

4. If need change language, inject `NgxEasyTranslateService` and call `changeCurrentLanguage()`.

```typescript
import { Component, OnInit, Inject } from '@angular/core';
import { NgxEasyTranslateService, ROOT_TRANSLATE } from '@wellwind/ngx-easy-translate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ (translate | async)?.title }}</h1>
    <button (click)="changeLang('en')">EN</button>
    <button (click)="changeLang('zh')">ZH</button>
  `,
})
export class AppComponent {
  get translate() { return this.rootTranslate; }

  constructor(
    private translateService: NgxEasyTranslateService,
    @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<any>) { }

  changeLang(lang: string) {
    this.translateService.changeCurrentLanguage(lang);
  }
}
```

5. There are also a `translate` pipe, then we don't have to inject anything.

```html
{{ 'profile.name' | translate }}
```

6. Because languages are writing in TypeScript, not just a json, so we can programing anything.

```typescript
const greeting = this.rootTranslate.sayHi('Mike');
```

### Support Strong Type

Because all languages are in TypeScript file, is't easy to make it strong typed.

Here are simple steps to make translation strong typed.

1. Writing first translation in TypeScript.

* in `i18n/en.ts`

```typescript
export const lang = {
  title: 'Home'
}
```

2. Define type.

* in `i18n/type.ts`

```typescript
import { en } from './en';
export type Translate = typeof en;
```

3. In another translation file, use the type defined above.

* in `i18n/zh.ts`

```typescript
import { Translate } from './type';
export const lang: Translate = {
  title: '首頁'
}
```

4. Refactor the module.

```typescript
import { en } from './i18n/en';
import { zh } from './i18n/zh';
import { of } from 'rxjs';

...

NgxEasyTranslateModule.forRoot(
  defaultLang: 'en',
  loader: (lang: string) => {
    if(lang === 'en') {
      return of(en);
    } else if(lang === 'zh'){
      return of(zh);
    }
})
```

5. Now we can use the type we defined

```typescript
import { Translate } from './type';

export class AppComponent {
 constructor(
    @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<Translate>) { }
}
```

### Support Lazy Loading

The key point is the loader function, we can write any logic to load translation content, and thanks for dynamic import, it's very easy to seperate language file by using `import()`.

```typescript
NgxEasyTranslateModule.forRoot(
  defaultLang: 'en',
  loader: (lang: string) => {
    if(lang === 'en') {
      return from(import('./i18n/en').then(result => result.lang));
    } else if(lang === 'zh'){
      return from(import('./i18n/zh').then(result => result.lang));
    }
});
```

Or just like this:

```typescript
loader: (lang: string) => from(import(`./i18n/${lang}`)).pipe(map(result => result.lang))
```

The important thing is now `en.ts`, `zh.ts` was never used explicitly, we will got errors when compile the project.

We have to include these files in `tsconfig.app.json`.

```json
"include": [
  ...
  "src/app/**/i18n/**/*.ts"
]
```

### Support Lazy Loading By Feature Module

We may not want to write all translation content in one file (imagine 1000+ pages), sometimes we need lazily load languages by every feature module.

To acheieve that, put your loader to `NgxEasyTranslateModule.forFeature()`

```typescript
NgxEasyTranslateModule.forFeature((lang) => from(import(`./i18n/${lang}`).then(result => result.lang)))
```

Then we can write own own translate file for seperated feature module.

In component, we can inject `FEATURE_TRANSLATE` to get the current language translaction for the feature.

```typescript
import { ROOT_TRANSLATE, FEATURE_TRANSLATE } from '@wellwind/ngx-easy-translate';

export class FeatureComponent {
  
  constructor(
    @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<LayoutTranslate>,
    @Inject(FEATURE_TRANSLATE) private featureTranslate: Observable<LayoutTranslate>) { }
}
```


## Release Notes

### v1.0.0

* Just publish package.

## Help Wanted

Because English is not my major language. This document should have many incorrect things. If you think this package is useful, please proofread and send a PR to me. Thank you :)

### LICENSE

MIT
