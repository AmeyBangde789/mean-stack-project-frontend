import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClothingService } from '../../service/clothing.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, RouterModule],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.css'
})
export class ClothingComponent {
  public productList :any ;
  constructor(private api : ClothingService){}

    ngOnInit(): void{
      this.api.getProduct()
      .subscribe(res=>{
        this.productList= res;
      })
    }

    faIndianRupeeSign=faIndianRupeeSign

}
