import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChorusFocus } from './chorus-focus';

describe('ChorusFocus', () => {
  let component: ChorusFocus;
  let fixture: ComponentFixture<ChorusFocus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChorusFocus],
    }).compileComponents();

    fixture = TestBed.createComponent(ChorusFocus);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('language', 'english');
    fixture.componentRef.setInput('accent', 'america');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
