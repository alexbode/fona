import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairsDashboard } from './pairs-dashboard';

describe('PairsDashboard', () => {
  let component: PairsDashboard;
  let fixture: ComponentFixture<PairsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PairsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(PairsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
