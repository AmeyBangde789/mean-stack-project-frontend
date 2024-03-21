import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchProductService } from '../services/search-product.service';
import { LocalCartService } from '../services/local-cart.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  standalone: true,
  // Other properties...
  templateUrl: './header.component.html',
  imports: [CommonModule, FontAwesomeModule, RouterModule, HttpClientModule]
})
export class HeaderComponent implements OnInit {

 

  faMagnifyingGlass = faMagnifyingGlass;
  faCircleUser = faUserCircle;
  faCartShopping = faCartShopping;
  cross = faXmark

  faBars = faBars
  faXmark = faXmark;
  router: any;
  searchResult: undefined | any;
  noResult: any;
  Router = inject(Router);
  cartItems = 0;
  change: undefined | any

  searchBox = false
  menuBar = false

  constructor(private cartService: CartService, private product: SearchProductService, private localCart: LocalCartService) { }

  ngOnInit(): void {

    let cartData = localStorage.getItem('cartProducts');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
      this.localCart.cartData.subscribe((items) => {
        this.cartItems = items.length
        this.localCart.getCart()
        this.cartService.currentCart()

      })
    }
    this.cartService.cartData.subscribe((items) => {
      this.cartItems = items.length
      this.localCart.getCart()
    });

    if (localStorage.getItem("user_id")) {
      let userStore = localStorage.getItem("user_id");
      let userData = userStore && JSON.parse(userStore);
      this.cartService.getCartList(userData._id)
      this.localCart.getCart()
    } else {
      this.localCart.getCart()
    }

    this.checkScreenSize
  }

  isVisible = false;
  iscartVisible = true;

  isLoggedIn() {
    return !!localStorage.getItem("user_id");
  }

  isAdminLoggedIn() {
    return !!localStorage.getItem("Admin_id");
  }


  searchProduct(key: KeyboardEvent) {
    if (key) {
      const element = key.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        console.log(result)
        if (result.length > 5) {
          result.length = 7
        }
        if (!result.length) {
          this.noResult = true

        }
        else if (result.length) {
          this.noResult = false
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }
  submitSearch(val: string) {
    this.Router.navigate([`search/${val}`])
    this.searchBox=false
  }


  search() {
    this.searchBox = !this.searchBox
    this.change=!this.change
  }
 
  menu() {
    this.menuBar = !this.menuBar
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 450;
    let user = localStorage.getItem('user_id');
    let admin = localStorage.getItem('Admin_id');
    // if (isMobile && user) {
    //   this.Router.navigate(['accounts']); // Navigate to mobile route
    // } 
    // else if(user){
    //   this.Router.navigate(['accounts']);
    // }
    // else {
    //   this.Router.navigate(['profile-info']); // Navigate to default route
    // }   

    // if(isMobile && admin){
    //   this.Router.navigate(['admin-accounts']);
    // }
    // else if(admin){
    //   this.Router.navigate(['admin-profile']);
    // }
    // else{
    //   this.Router.navigate(['admin-profile']);
    // }
  }

  productDetails(){
    console.log('working')
  }
}