import { trigger, transition, style, animate } from '@angular/animations';

export const leftToRightAnimation = trigger('leftToRight', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('350ms ease-in-out', style({ transform: 'translateX(0)' })),
  ]),

  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('350ms ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);