import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { GetAllProductsService } from '../services/get-all-products.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-supp-deals',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterModule],
  templateUrl: './top-supp-deals.component.html',
  styleUrl: './top-supp-deals.component.css'
})
export class TopSuppDealsComponent {
  faIndianRupeeSign = faIndianRupeeSign
  faChevronRight =faChevronRight 
  products:any
  selectedTagIndex: string | null = null;

  constructor(private getAllproducts:GetAllProductsService, private router:Router){}
 
  ngOnInit(){
    return this.getAllproducts.getsuppTypeDiscount("Protine").subscribe((res)=>{
      this.products = res
      this.selectedTagIndex='Protine'
      this.products = this.products.slice(0, 6);
    })
  }


  function(types:string){
    this.selectedTagIndex =types
    return this.getAllproducts.getsuppTypeDiscount(types).subscribe((res)=>{
        this.products = res
      this.products = this.products.slice(0, 6);
    })
  }

  viewAll(){
    this.router.navigate([ `${this.selectedTagIndex}`]);
  }
}
