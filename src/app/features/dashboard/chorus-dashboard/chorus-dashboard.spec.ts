import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChorusDashboard } from './chorus-dashboard';

describe('ChorusDashboard', () => {
  let component: ChorusDashboard;
  let fixture: ComponentFixture<ChorusDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChorusDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ChorusDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
