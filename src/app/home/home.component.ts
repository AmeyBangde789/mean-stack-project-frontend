import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { BestSellersComponent } from '../best-sellers/best-sellers.component';
import { ShopByCategoryComponent } from '../shop-by-category/shop-by-category.component';
import { TopDealsComponent } from '../top-deals/top-deals.component';
import { WhyFitessentialsComponent } from '../why-fitessentials/why-fitessentials.component';
import { ShopByBrandsComponent } from '../shop-by-brands/shop-by-brands.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterModule,BestSellersComponent, ShopByCategoryComponent,TopDealsComponent,WhyFitessentialsComponent,ShopByBrandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft

  constructor() { }

  ngOnInit() {
    
  }

}


