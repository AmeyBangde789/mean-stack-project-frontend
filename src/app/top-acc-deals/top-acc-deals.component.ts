import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { GetAllProductsService } from '../services/get-all-products.service';

@Component({
  selector: 'app-top-acc-deals',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterModule],
  templateUrl: './top-acc-deals.component.html',
  styleUrl: './top-acc-deals.component.css'
})
export class TopAccDealsComponent {
  faChevronRight = faChevronRight
  faIndianRupeeSign = faIndianRupeeSign
  products:any
  selectedTagIndex: string | null = null;

  constructor(private getAllproducts:GetAllProductsService){}

  ngOnInit(){
    return this.getAllproducts.getaccTypeDiscount("Gloves and Wrist Straps").subscribe((res)=>{
      this.products = res
      this.selectedTagIndex='Gloves and Wrist Straps'
      this.products = this.products.slice(0, 6);
    })
  }

  function(types:string){
    this.selectedTagIndex =types
    return this.getAllproducts.getaccTypeDiscount(types).subscribe((res)=>{
        this.products = res
      this.products = this.products.slice(0, 6);
    })
  }
  viewAll(){
    window.open(`${this.selectedTagIndex}`, '_blank');
  }
}
