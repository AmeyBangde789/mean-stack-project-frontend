import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { address } from '../data-type';
import { Address } from 'cluster';
import { apiOrder } from '../validators/api.order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  constructor() { }

  orderDetails(orderDetailsObj: any) {
    return this.http.post<any>(`${apiOrder.orderApiService}order-data`, orderDetailsObj)
  }

  orderList() {
    let userStore = localStorage.getItem('user_id')
    let userId = userStore && JSON.parse(userStore)._id
    return this.http.get(`${apiOrder.orderApiService}/getbyid/${userId}`)
  }

  address() {
    let userStore = localStorage.getItem('user_id');
    let userId = userStore && JSON.parse(userStore)._id
    return this.http.get(`${apiOrder.orderApiService}/getaddress/${userId}`)
  }

  postAddress(address: address) {
    return this.http.post<address>(`${apiOrder.orderApiService}/address`, address)
  }

  updateAddress(id: string, data: Address) {
    return this.http.put(`${apiOrder.orderApiService}/update/${id}`, data)
  }

  getAddByid(id: string) {
    return this.http.get<any>(`${apiOrder.orderApiService}/getAddressbyid/${id}`)
  }

  deleteAddByid(id: string) {
    return this.http.delete<any>(`${apiOrder.orderApiService}/delete/${id}`)
  }

  bestSellers(id:string){
    return this.http.get<any>(`${apiOrder.orderApiService}/bestsellers/${id}`)
  }
  bestSellersAll(){
    return this.http.get<any>(`${apiOrder.orderApiService}/bestsellersall`)
  }
}