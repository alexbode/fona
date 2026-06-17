import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipa } from './ipa';

describe('Ipa', () => {
  let component: Ipa;
  let fixture: ComponentFixture<Ipa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipa],
    }).compileComponents();

    fixture = TestBed.createComponent(Ipa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
