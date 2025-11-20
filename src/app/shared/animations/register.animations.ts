import {
  animate,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

export const StepAnimation = trigger('stepAnimation', [
  state('enter', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
  state(
    'exit',
    style({ opacity: 0, transform: 'scale(0.95) translateX(-30px)' })
  ),

  transition('enter => exit', [
    animate(
      '300ms ease-in',
      style({
        opacity: 0,
        transform: 'scale(0.9) translateX(-40px)',
        filter: 'blur(2px)',
      })
    ),
  ]),

  transition('exit => enter', [
    style({
      opacity: 0,
      transform: 'scale(0.9) translateX(40px)',
      filter: 'blur(2px)',
    }),
    animate(
      '300ms ease-out',
      style({
        opacity: 1,
        transform: 'scale(1) translateX(0)',
        filter: 'blur(0)',
      })
    ),
  ]),
]);
