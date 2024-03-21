import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachinesService } from '../../service/machines.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent {
  public productList :any ;
  constructor(private api :MachinesService){}

    ngOnInit(): void{
      this.api.getProduct()
      .subscribe(res=>{
        this.productList= res;
      })
    }
}
