import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-top-deals-products',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterModule],
  templateUrl: './top-deals-products.component.html',
  styleUrl: './top-deals-products.component.css'
})
export class TopDealsProductsComponent {

  faIndianRupeeSign=faIndianRupeeSign
  productList:any
  constructor(private getallproducts:GetAllProductsService , private activatedroute:ActivatedRoute){}

  ngOnInit(){
    let productType= this.activatedroute.snapshot.paramMap.get('key')
    productType && this.getallproducts.getProductsByType(productType).subscribe((res)=>{
      this.productList=res
      window.scrollTo({top:0,behavior:"auto"})
    })

    let productBrand=this.activatedroute.snapshot.paramMap.get('brand')
    productBrand && this.getallproducts.getProductsByBrand(productBrand).subscribe((res)=>{
      this.productList=res
      window.scrollTo({top:0,behavior:"auto"})
    })
    
    let category=this.activatedroute.snapshot.paramMap.get('category')
    category && this.getallproducts.getSuppDiscount(category).subscribe((res)=>{
      this.productList=res
      window.scrollTo({top:0,behavior:"auto"})
    })
  }

}
