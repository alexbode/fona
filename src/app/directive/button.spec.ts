import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirective } from './button';

@Component({
  template: `
    <button id="defaultBtn" appButton>Click me</button>
    <button id="secondaryBtn" appButton variant="secondary">Click me</button>
    <button id="largeBtn" appButton size="lg">Click me</button>
  `,
  imports: [ButtonDirective],
})
class TestHostComponent {}

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply primary variant classes by default', () => {
    const btnEl = fixture.nativeElement.querySelector('#defaultBtn') as HTMLButtonElement;
    expect(btnEl.className).toContain('font-semibold');
    expect(btnEl.className).toContain('px-7');
    expect(btnEl.style.backgroundColor).toBe('rgb(75, 173, 200)'); // #4BADC8 in RGB
    expect(btnEl.style.color).toBe('rgb(12, 14, 20)'); // #0C0E14 in RGB
  });

  it('should apply secondary variant classes', () => {
    const btnEl = fixture.nativeElement.querySelector('#secondaryBtn') as HTMLButtonElement;
    expect(btnEl.className).toContain('font-medium');
    expect(btnEl.className).toContain('border');
    expect(btnEl.style.backgroundColor).toBe('');
  });

  it('should apply large size classes', () => {
    const btnEl = fixture.nativeElement.querySelector('#largeBtn') as HTMLButtonElement;
    expect(btnEl.className).toContain('px-8');
    expect(btnEl.className).toContain('py-4');
  });
});
