import { Directive, input, computed } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-base outline-none select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'font-semibold hover:opacity-90',
        secondary:
          'font-medium border border-border hover:border-primary/30 hover:bg-secondary text-foreground',
      },
      size: {
        md: 'px-7 py-3.5',
        lg: 'px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[appButton]',
  host: {
    '[class]': 'computedClasses()',
    '[style.font-family]': '"\'Plus Jakarta Sans\', sans-serif"',
    '[style.background-color]': 'variant() === "primary" ? "#4BADC8" : null',
    '[style.color]': 'variant() === "primary" ? "#0C0E14" : null',
  },
})
export class ButtonDirective {
  readonly variant = input<NonNullable<ButtonVariants['variant']>>('primary');
  readonly size = input<NonNullable<ButtonVariants['size']>>('md');

  protected readonly computedClasses = computed(() =>
    buttonVariants({ variant: this.variant(), size: this.size() }),
  );
}
