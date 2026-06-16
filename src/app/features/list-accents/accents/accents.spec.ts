import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accents } from './accents';

describe('Accents', () => {
  let component: Accents;
  let fixture: ComponentFixture<Accents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accents],
    }).compileComponents();

    fixture = TestBed.createComponent(Accents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
