import { Pipe, PipeTransform, Inject, Optional, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ROOT_TRANSLATE, FEATURE_TRANSLATE } from './tokens';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

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
export class TranslatePipe implements PipeTransform, OnDestroy {

  latestValue: string;
  subscription: Subscription;

  constructor(
    @Optional() @Inject(ROOT_TRANSLATE) private rootTranslate: Observable<any>,
    @Optional() @Inject(FEATURE_TRANSLATE) private featureTranslate: Observable<any>,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  transform(key: string): any {
    if (!this.subscription) {
      this.subscription = combineLatest(
        [
          !!this.rootTranslate ? this.rootTranslate.pipe(startWith({})) : of({}),
          !!this.featureTranslate ? this.featureTranslate.pipe(startWith({})) : of({})
        ]
      ).pipe(
        map(([rootTranslate, featureTranslate]) => {
          const rootResult = findByKey(key, rootTranslate);
          const featureResult = findByKey(key, featureTranslate);

          return featureResult || rootResult;
        }),
        // trigger change detection to resolve OnPush strategy.
        tap(() => this.changeDetectorRef.markForCheck())
      ).subscribe(result => this.latestValue = result);
    }

    return this.latestValue;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
