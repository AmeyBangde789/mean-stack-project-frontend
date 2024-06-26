import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedProductsComponent } from './searched-products.component';

describe('SearchedProductsComponent', () => {
  let component: SearchedProductsComponent;
  let fixture: ComponentFixture<SearchedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
