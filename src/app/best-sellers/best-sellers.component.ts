import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule , RouterModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  faIndianRupeeSign = faIndianRupeeSign
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft
  products: any
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    return this.orderService.bestSellers().subscribe((res) => {
      this.products = res
      this.products = this.products.slice(0, 5);
    })

  }

}

