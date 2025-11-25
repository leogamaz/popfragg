
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselMapsComponent } from '../../components/carousel-maps/carousel-maps.component';
import { MiniMapComponent } from '@app/shared/components/advanceds/mini-map/mini-map.component';
import { leftToRightAnimation } from '@app/shared/animations/lef-to-right.animation';
import { Nade } from '@app/features/nades/models/nade.model';
import { NadesService } from '../../services/nades.service';
import { MenuSidebarComponent } from '../../components/menu-sidebar/menu-sidebar.component';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';

@Component({
  selector: 'app-nades',
  standalone: true,
  imports: [CommonModule, CarouselMapsComponent, MiniMapComponent, MenuSidebarComponent, IconComponent],
  templateUrl: './nades.page.html',
  styleUrl: './nades.page.css',
  animations: [leftToRightAnimation]
})
export class NadesPage implements OnInit {
  public selectedMap: string | null = null;
  public mapVisible: boolean = false;
  public isNavigating: boolean = false;
  public isAddingNade: boolean = false;

  private ribbonFinished: boolean = false;
  private carouselFinished: boolean = false;

  public currentMapNades: Nade[] = [];
  allNades: Nade[] = [];
  private pendingMap: string | null = null;

  constructor(
    private nadesService: NadesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize from snapshot immediately to prevent flash
    const snapshotMap = this.route.snapshot.paramMap.get('mapName');
    if (snapshotMap) {
      this.selectMapFromRoute(snapshotMap);
    }

    this.nadesService.getAllNadesByUser().subscribe((nades) => {
      this.allNades = nades;

      // Update current map nades if we already selected a map
      if (this.selectedMap) {
        this.currentMapNades = this.allNades.filter(n => n.map === this.selectedMap);
      }

      // Subscribe for future changes
      this.route.paramMap.subscribe(params => {
        const mapName = params.get('mapName');
        // Only update if different and not already handled by snapshot
        if (mapName && mapName !== this.selectedMap) {
          this.selectMapFromRoute(mapName);
        } else if (!mapName && this.selectedMap) {
          this.resetToCarousel();
        }
      });
    });
  }

  onSelectMap(map: string | null) {
    if (map) {
      // Trigger exit animations
      this.isNavigating = true;
      this.pendingMap = map;
    } else {
      this.router.navigate(['nades']);
    }
  }

  onRibbonAnimationDone(event: any) {
    if (event.toState === 'void') {
      this.ribbonFinished = true;
      this.checkAndShowMap();
    }
  }

  onCarouselCollapseDone() {
    this.carouselFinished = true;
    if (this.pendingMap) {
      this.router.navigate(['nades', this.pendingMap]);
      this.pendingMap = null;
    } else {
      this.checkAndShowMap();
    }
  }

  private selectMapFromRoute(map: string) {
    this.selectedMap = map;
    this.mapVisible = true;
    this.ribbonFinished = true;
    this.carouselFinished = true;
    this.isNavigating = false;
    this.currentMapNades = this.allNades.filter(n => n.map === map);
  }

  private resetToCarousel() {
    this.selectedMap = null;
    this.mapVisible = false;
    this.isNavigating = false;
    this.currentMapNades = [];
  }

  private checkAndShowMap() {
    if (this.ribbonFinished && this.carouselFinished && this.selectedMap) {
      this.mapVisible = true;
    }
  }

  onAddNade() {
    this.isAddingNade = true;
  }

  onNadeCreated(event: { title: string; type: string; description: string; position: { x: number; y: number } }) {
    console.log('New Nade Created:', event);
    // TODO: Call service to save nade
    // const newNade: Nade = { ...event, map: this.selectedMap!, ... };
    // this.nadesService.createNade(newNade).subscribe(...);

    this.isAddingNade = false;
    alert(`Nade Created!\nTitle: ${event.title}\nType: ${event.type}\nPosition: ${event.position.x.toFixed(2)}%, ${event.position.y.toFixed(2)}%`);
  }

  onCancelAdd() {
    this.isAddingNade = false;
  }
}