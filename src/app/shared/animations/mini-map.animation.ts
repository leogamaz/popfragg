import { trigger, transition, style, animate } from '@angular/animations';

export const MiniMapAnimation = trigger('miniMap', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'scale(1.1) translateY(20px)' 
    }),
    
    // A ANIMAÇÃO:
    animate(
      '600ms cubic-bezier(0.22, 1, 0.36, 1)', 
      style({ 
        opacity: 1, 
        transform: 'scale(1) translateY(0)' 
      })
    )
  ]),
  transition(':leave', [
    style({ 
      opacity: 1, 
      transform: 'scale(1) translateY(0)' 
    }),
    animate(
      '200ms ease-in', 
      style({ 
        opacity: 0, 
        transform: 'scale(0.95) translateY(10px)' 
      })
    )
  ])
]);