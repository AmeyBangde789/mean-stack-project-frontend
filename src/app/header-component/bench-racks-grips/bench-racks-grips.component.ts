import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchRackGripService } from '../../service/bench-rack-grip.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bench-racks-grips',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bench-racks-grips.component.html',
  styleUrl: './bench-racks-grips.component.css'
})
export class BenchRacksGripsComponent {

  show=true
  public productList :any ;
  constructor(private api:BenchRackGripService, private cartService: CartService){}

    ngOnInit(): void{
      this.api.getProduct()
      .subscribe(res=>{
        this.productList= res;
      })
    }
}
