import { Injectable, inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { cart, product, wishList } from '../data-type';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient)
  cartData = new EventEmitter<product[] | []>();

  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('cartProducts');
    if (!localCart) {
      localStorage.setItem('cartProducts', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('cartProducts', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('cartProducts');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item._id);
      console.log(items);
      localStorage.setItem('cartProducts', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:8700/api/addtocart', cartData)
  }

  getCartList(userId: string) {
    return this.http.get<product[]>('http://localhost:8700/api/userid/' + userId,
      { observe: 'response' }).subscribe((result) => {

        console.log(result);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }

      })
  }

  removeToCart(cartId: string) {
    return this.http.delete(`http://localhost:8700/api/deleteid/${cartId}`)
  }


  currentCart(): Observable<cart[]> {
    let userStore = localStorage.getItem('user_id');
    let userData = userStore && JSON.parse(userStore);

    if (userData && userData._id) {
      let userId = userData._id;
      return this.http.get<cart[]>(`http://localhost:8700/api/userid/${userId}`);
    } else {
      // Handle the case where userData or userData._id is not available
      return new Observable<cart[]>(); // or return null, throw an error, etc.
    }
  }

  incrementQuantity(itemId: string): Observable<cart> {
    return this.http.put<cart>(`http://localhost:8700/api/increment/${itemId}`, {});
  }

  decrementQuantity(itemId: string): Observable<cart> {
    return this.http.put<cart>(`http://localhost:8700/api/decrement/${itemId}`, {});
  }

  deleteAllcart(userId: string) {
    return this.http.delete<any>(`http://localhost:8700/api/deleteallcart/${userId}`)
  }

}

