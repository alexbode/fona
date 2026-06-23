import { Directive, input, computed } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-base outline-none select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'font-semibold hover:opacity-90 bg-brand text-brand-foreground rounded-lg',
        secondary:
          'font-medium border border-border hover:border-primary/30 hover:bg-secondary text-fofrench/paris/pairs-quizreground',
      },
      size: {
        none: '',
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-6',
        lg: 'px-8 py-6',
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
  },
})
export class ButtonDirective {
  readonly variant = input<NonNullable<ButtonVariants['variant']>>('primary');
  readonly size = input<NonNullable<ButtonVariants['size']>>('md');

  protected readonly computedClasses = computed(() =>
    buttonVariants({ variant: this.variant(), size: this.size() }),
  );
}
