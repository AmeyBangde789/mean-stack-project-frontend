import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {

  faIndianRupeeSign = faIndianRupeeSign
  relatedProducts: any
  show=false
  constructor(private activatedRoute: ActivatedRoute, private getAllproducts: GetAllProductsService) { }

  ngOnInit() {
    let productType = this.activatedRoute.snapshot.paramMap.get('type');
    let productId = this.activatedRoute.snapshot.paramMap.get('id')
    productType && productId && this.getAllproducts.getRelatedProducts(productType, productId).subscribe((res) => {
      this.relatedProducts = res
      if(res.length>0){
        this.show=true
      }
    })
  }
}
