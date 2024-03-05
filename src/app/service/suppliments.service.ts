import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'



@Injectable({
    providedIn: 'root'
  })

  export class SupplimentsService{
    constructor(private http: HttpClient) {}

    getProduct(){
      return this.http.get<any>("http://localhost:8800/api/route/suppliments")
      .pipe(map((res:any)=>{
        return res;
      }))
    }
  }
