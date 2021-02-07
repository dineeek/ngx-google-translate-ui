import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationResultsComponent } from './translation-results.component';

describe('TranslationResultsComponent', () => {
  let component: TranslationResultsComponent;
  let fixture: ComponentFixture<TranslationResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
