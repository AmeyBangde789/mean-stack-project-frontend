import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { address } from '../data-type';
import { Address } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  constructor() { }

  orderDetails(orderDetailsObj: any) {
    return this.http.post<any>('http://localhost:8100/api/order-data', orderDetailsObj)
  }

  orderList() {
    let userStore = localStorage.getItem('user_id')
    let userId = userStore && JSON.parse(userStore)._id
    return this.http.get(`http://localhost:8100/api/getbyid/${userId}`)
  }

  address() {
    let userStore = localStorage.getItem('user_id');
    let userId = userStore && JSON.parse(userStore)._id
    return this.http.get(`http://localhost:8100/api/getaddress/${userId}`)
  }

  postAddress(address: address) {
    return this.http.post<address>('http://localhost:8100/api/address', address)
  }

  updateAddress(id: string, data: Address) {
    return this.http.put(`http://localhost:8100/api/update/${id}`, data)
  }

  getAddByid(id: string) {
    return this.http.get<any>(`http://localhost:8100/api/getAddressbyid/${id}`)
  }

  deleteAddByid(id: string) {
    return this.http.delete<any>(`http://localhost:8100/api/delete/${id}`)
  }

  bestSellers(){
    return this.http.get<any>('http://localhost:8100/api/bestsellers')
  }
}