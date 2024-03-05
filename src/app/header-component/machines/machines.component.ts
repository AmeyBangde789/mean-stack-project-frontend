import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { MachinesService } from '../../service/machines.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, RouterModule],
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

    faIndianRupeeSign=faIndianRupeeSign
}
