import { Component, signal, input, computed } from '@angular/core';
import { BasicInputComponent } from '@app/shared/components/HTMLBasics/basicInput/basicInput.component';
import { PrimaryButtonComponent } from '@app/shared/components/HTMLBasics/primaryButton/primaryButton.component';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';

@Component({
  selector: 'app-menu-sidebar',
  standalone: true,
  imports: [BasicInputComponent, PrimaryButtonComponent, IconComponent],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.css'
})
export class MenuSidebarComponent {
  map = input.required<string>();
  formattedMapName = computed(() => {
    const currentMap = this.map();
    return this.mapDisplayNames[currentMap] || currentMap;
  });

  private readonly mapDisplayNames: Readonly<Record<string, string>> = {
    'de_mirage': 'Mirage',
    'de_nuke': 'Nuke',
    'de_overpass': 'Overpass',
    'de_train': 'Train',
    'de_inferno': 'Inferno',
    'de_dust2': 'Dust 2',
    'de_cache': 'Cache',
    'de_ancient': 'Ancient',
    'de_vertigo': 'Vertigo',
    'de_anubis': 'Anubis',
  };
}
