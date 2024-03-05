import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { AccessoriesService } from '../../service/accessories.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.css'
})
export class AccessoriesComponent {

    public productList :any ;
    constructor(private api :AccessoriesService){}
  
      ngOnInit(): void{
        this.api.getProduct()
        .subscribe(res=>{
          this.productList= res;
        })
      }
  
      faIndianRupeeSign=faIndianRupeeSign
}
