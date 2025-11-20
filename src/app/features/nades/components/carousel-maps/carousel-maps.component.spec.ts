import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMapsComponent } from './carousel-maps.component';

describe('CarouselMapsComponent', () => {
  let component: CarouselMapsComponent;
  let fixture: ComponentFixture<CarouselMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselMapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
