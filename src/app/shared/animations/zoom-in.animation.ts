import { animate, style, transition, trigger } from "@angular/animations";

export const zoomInAnimation = trigger('zoomIn', [
    transition(':enter', [
        style({ transform: 'scale({{startScale}})', opacity: '{{startOpacity}}' }),
        animate('{{time}} ease-in-out', style({ transform: 'scale(1)', opacity: 1 }))
    ], {
        params: {
            time: '0.5s',
            startScale: 0.5,
            startOpacity: 0
        }
    })
]);
