import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchRacksGripsComponent } from './bench-racks-grips.component';

describe('BenchRacksGripsComponent', () => {
  let component: BenchRacksGripsComponent;
  let fixture: ComponentFixture<BenchRacksGripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenchRacksGripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenchRacksGripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
