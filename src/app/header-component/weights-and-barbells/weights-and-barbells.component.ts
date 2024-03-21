import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { weights_barbellsService } from '../../service/weightsandbarbells.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-weights-and-barbells',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './weights-and-barbells.component.html',
  styleUrl: './weights-and-barbells.component.css'
})
export class WeightsAndBarbellsComponent {

  show=true
  public productList :any ;
  constructor(private api :weights_barbellsService, private cartService: CartService){}

    ngOnInit(): void{
      this.api.getProduct()
      .subscribe(res=>{
        this.productList= res;
      })
    }

}
