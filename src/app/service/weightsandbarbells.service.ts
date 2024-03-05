import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'



@Injectable({
    providedIn: 'root'
  })

  export class weights_barbellsService{
    constructor(private http: HttpClient) {}

    getProduct(){
      return this.http.get<any>("http://localhost:8800/api/route/weights_and_barbells")
      .pipe(map((res:any)=>{
        return res;
      }))
    }
  }
