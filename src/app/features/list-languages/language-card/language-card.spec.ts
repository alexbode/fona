import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCard } from './language-card';

describe('LanguageCard', () => {
  let component: LanguageCard;
  let fixture: ComponentFixture<LanguageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
