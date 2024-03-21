import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { apiProducts } from '../validators/api.products';

@Injectable({
  providedIn: 'root'
})
export class BenchRackGripService {

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get<any>(`${apiProducts.productApiService}route/benches_racks_grips`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
