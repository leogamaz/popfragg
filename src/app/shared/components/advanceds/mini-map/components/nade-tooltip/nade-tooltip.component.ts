import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nade } from '@app/features/nades/models/nade.model';
import { SafeUrlPipe } from '@app/shared/pipes/safe-url.pipe';
import { zoomInAnimation } from '@app/shared/animations/zoom-in.animation';


@Component({
  selector: 'app-nade-tooltip',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  animations:
    [zoomInAnimation],
  templateUrl: './nade-tooltip.component.html'
})
export class NadeTooltipComponent {
  public nade = input.required<Nade>();
  public ratingStars = computed(() => Array(this.nade().rating).fill(0));

  public tooltipPosition = computed(() => {
    const y = this.nade().startPosition?.y || 0;
    // If nade is in the top 40% of the map, show tooltip below. Otherwise show above.
    return y < 40 ? 'bottom' : 'top';
  });
}
