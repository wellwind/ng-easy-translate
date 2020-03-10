import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { of } from 'rxjs';
import { NgxEasyTranslateModule } from '@wellwind/ngx-easy-translate';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxEasyTranslateModule.forRoot({ defaultLang: 'zh', loader: (_: string) => of({}) }),
        NgxEasyTranslateModule.forFeature((_: string) => of({}))
      ],
      declarations: [LayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
