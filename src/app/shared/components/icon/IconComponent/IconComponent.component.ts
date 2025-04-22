// icon.component.ts
import { Component, effect, input, signal } from '@angular/core';
import { SvgIconService } from '@Core/services/svg-icon.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'icon',
  template: `<span [innerHTML]="svg()"></span>`,
  standalone: true,
})
export class IconComponent {
  name = input<string>();
  classList = input<string>('');
  svg = signal<SafeHtml | null>(null);

  constructor(private iconService: SvgIconService) {
    effect(
      () => {
        const iconName = this.name();
        const classes = this.classList();
        if (!iconName) return;

        this.iconService.getIcon(iconName, classes).subscribe((res) => {
          this.svg.set(res);
        });
      },
      { allowSignalWrites: true }
    );
  }
}
