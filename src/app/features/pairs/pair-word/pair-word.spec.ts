import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairWord } from './pair-word';

describe('PairWord', () => {
  let component: PairWord;
  let fixture: ComponentFixture<PairWord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PairWord],
    }).compileComponents();

    fixture = TestBed.createComponent(PairWord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
