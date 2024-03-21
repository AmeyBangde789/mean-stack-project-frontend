import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { SearchedProductService } from '../service/searched-product.service';

@Component({
  selector: 'app-searched-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './searched-products.component.html',
  styleUrl: './searched-products.component.css'
})
export class SearchedProductsComponent {
  public productList: any;
  faIndianRupeeSign = faIndianRupeeSign
  noResult: any

  constructor(private SearchedProductService: SearchedProductService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      const key = params['key']
      this.SearchedProductService.getProduct(key)
        .subscribe(res => {
          this.productList = res;
          if (!res.length) {
            this.noResult = true
          }
          else{
            this.noResult=false
          }

        })
    })
  }
}