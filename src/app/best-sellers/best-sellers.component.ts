import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft
  products: any
  selectedTagIndex: any
  constructor(private orderService: OrderService, private router: Router) { }


  ngOnInit() {
    return this.orderService.bestSellers('Weights and Barbells').subscribe((res) => {
      this.products = res
      this.selectedTagIndex = 'Weights and Barbells'

      this.products = this.products.slice(0, 6);
    })

  }
  function(category: string) {
    this.selectedTagIndex = category
    return this.orderService.bestSellers(category).subscribe((res) => {
      this.products = res
      this.products = this.products.slice(0, 6);
    })
  }
  viewAll() {
    this.router.navigate(['best-seller-products'])
    window.scrollTo({top:0, behavior:"auto"})
  }
}

