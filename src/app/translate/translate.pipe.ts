import { Pipe, PipeTransform, Inject, Optional } from '@angular/core';
import { ROOT_TRANSLATE, FEATURE_TRANSLATE } from './consts';
import { Observable, of, Subscription, combineLatest, iif } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export const findByKey = (key: string, obj: any) => {
  let result = obj;
  key.split('.').forEach(chunk => {
    result = (result || {})[chunk];
  });
  return result;
};

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  latestValue: string;
  subscription: Subscription;

  constructor(
    @Optional() @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<any>,
    @Optional() @Inject(FEATURE_TRANSLATE) private featureTranslate: Observable<any>) {
  }

  transform(key: string): any {
    if (!this.subscription) {
      this.subscription = combineLatest(
        [
          !!this.rootTranslate ? this.rootTranslate.pipe(startWith({})) : of({}),
          !!this.featureTranslate ? this.featureTranslate.pipe(startWith({})) : of({})
        ]
      ).pipe(map(([rootTranslate, featureTranslate]) => {
        const rootResult = findByKey(key, rootTranslate);
        const featureResult = findByKey(key, featureTranslate);

        return featureResult || rootResult;
      })).subscribe(result => this.latestValue = result);
    }

    return this.latestValue;
  }

}
