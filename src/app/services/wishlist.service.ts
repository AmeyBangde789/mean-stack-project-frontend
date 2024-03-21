import { Injectable, inject } from '@angular/core';
import { cart, wishList } from '../data-type';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { apiCart } from '../validators/api.cart';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http=inject(HttpClient)

  constructor() { }

  addTowishList(wishListData:wishList){
    return this.http.post(`${apiCart.cartApiService}addtowishlist`,wishListData)
  }

  getwishListProduct():Observable<wishList[]>{
    let userStore = localStorage.getItem('user_id');
    let userData = userStore && JSON.parse(userStore);

    if (userData && userData._id) {
      let userId = userData._id;
      return this.http.get<wishList[]>(`${apiCart.cartApiService}wishlistbyuserid/${userId}`);
    } 
    else{
      return new Observable<wishList[]>();
    }
  }

  getbyuserIdandproductId(productId:string,userId:string){
    return this.http.get<wishList[]>(`${apiCart.cartApiService}userid/${productId}/${userId}`)
  }

  deleteWishlistProduct(productId:string,userId:string){
    return this.http.delete<cart[]>(`${apiCart.cartApiService}wishlistProductdelete/${productId}/${userId}`)
  }
}

