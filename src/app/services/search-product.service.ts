import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apisearchProduct } from '../validators/api.search-product';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {
  [x: string]: any;
  http = inject(HttpClient);

  constructor() { }
  searchProduct(key:string){
    return this.http.get<any[]>(`${apisearchProduct.searchProductServiceApi}${key}`)
  }

  searchproductbyid(id:string){
    return this.http.get<any[]>(`${apisearchProduct.searchproductbyid}${id}`)
  }
}

