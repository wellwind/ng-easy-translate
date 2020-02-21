import { TestBed } from '@angular/core/testing';

import { NgxEasyTranslateService } from './ngx-easy-translate.service';

describe('NgxEasyTranslateService', () => {
  let service: NgxEasyTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxEasyTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
