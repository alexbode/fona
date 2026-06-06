import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceText } from './sentence-text';

describe('SentenceText', () => {
  let component: SentenceText;
  let fixture: ComponentFixture<SentenceText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceText],
    }).compileComponents();

    fixture = TestBed.createComponent(SentenceText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
