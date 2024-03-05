import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { CardioService } from '../../service/cardio.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cardio',
  standalone: true,
  imports: [CommonModule,  FontAwesomeModule, RouterModule],
  templateUrl: './cardio.component.html',
  styleUrl: './cardio.component.css'
})
export class CardioComponent {
  public productList :any ;
  constructor(private api :CardioService){}

    ngOnInit(): void{
      this.api.getProduct()
      .subscribe(res=>{
        this.productList= res;
      })
    }

    faIndianRupeeSign=faIndianRupeeSign

}
