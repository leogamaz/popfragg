import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTextAreaComponent } from './basic-text-area.component';

describe('BasicTextAreaComponent', () => {
  let component: BasicTextAreaComponent;
  let fixture: ComponentFixture<BasicTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTextAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
