import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairSentence } from './pair-sentence';

describe('PairSentence', () => {
  let component: PairSentence;
  let fixture: ComponentFixture<PairSentence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PairSentence],
    }).compileComponents();

    fixture = TestBed.createComponent(PairSentence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
