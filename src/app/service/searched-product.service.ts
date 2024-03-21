import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { apisearchProduct } from '../validators/api.search-product';

@Injectable({
  providedIn: 'root'
})
export class SearchedProductService {

  constructor(private http: HttpClient) { }
  getProduct(key:any){
    return this.http.get<any>(`${apisearchProduct.searchProductServiceApi}products/${key}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

