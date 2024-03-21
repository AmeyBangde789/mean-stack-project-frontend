import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SupplimentsService } from '../../service/suppliments.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-suppliments',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './suppliments.component.html',
  styleUrl: './suppliments.component.css'
})
export class SupplimentsComponent {
  public productList :any ;
  constructor(private api : SupplimentsService){}

    ngOnInit(): void{
      this.api.getProduct()
      .subscribe(res=>{
        this.productList= res;
      })
    }

}
