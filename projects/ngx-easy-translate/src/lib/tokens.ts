import { InjectionToken } from '@angular/core';

export const DEFAULT_LANGUAGE = new InjectionToken('default translate language token');
export const ROOT_TRANSLATE_LOADER = new InjectionToken('root translate loader token');
export const FEATURE_TRANSLATE_LOADER = new InjectionToken('feature translate loader token');
export const ROOT_TRANSLATE = new InjectionToken('root translate injection token');
export const FEATURE_TRANSLATE = new InjectionToken('feature translate injection token');
