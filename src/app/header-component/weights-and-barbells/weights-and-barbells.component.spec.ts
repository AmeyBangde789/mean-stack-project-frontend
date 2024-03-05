import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightsAndBarbellsComponent } from './weights-and-barbells.component';

describe('WeightsAndBarbellsComponent', () => {
  let component: WeightsAndBarbellsComponent;
  let fixture: ComponentFixture<WeightsAndBarbellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightsAndBarbellsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightsAndBarbellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
