import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductService } from '../services/search-product.service';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { cart, product } from '../data-type';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { faShield } from '@fortawesome/free-solid-svg-icons'; 
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { GetAllProductsService } from '../services/get-all-products.service';
import { RelatedProductsComponent } from '../related-products/related-products.component';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RelatedProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  faIndianRupee = faIndianRupee;
  faBoltLightning = faBoltLightning;
  faCartShopping = faCartShopping;
  faTrash = faTrash;
  faStar=faStar;
  faTruck=faTruck;
  faRotate=faRotate
  faShield=faShield
  check=faClipboardCheck
  up=faAngleUp
  down=faAngleDown


  productData: undefined | any;
  public productList: any;
  maxQuantity: any;
  productQuantity: number = 1;
  quantity: undefined | number
  productDiscount:undefined | number;
  removeCart: any;
  cartData: product | undefined;

  relatedProducts:any

  constructor(private activatedRoute: ActivatedRoute, private searchproductservice: SearchProductService, private product: CartService, private getAllproducts:GetAllProductsService) { }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(productId)
    productId && this.searchproductservice.searchproductbyid(productId)
      .subscribe(res => {
        this.productData = res;

        let cartData = localStorage.getItem('cartProducts');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => productId == item._id.toString())
          if (items.length) {
            this.removeCart = true
          }
          else {
            this.removeCart = false
          }
        }


        let user = localStorage.getItem("user_id");
        if (user) {
          let userId = user && JSON.parse(user)._id;
          this.product.getCartList(userId);

          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) => productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true
            }
          })
        }

      })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 9 && val === 'plus') {
      this.productQuantity++;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity--;
    }
    if (this.productQuantity > 8) {
      this.maxQuantity = true
    }
    else if (this.productQuantity < 9) {
      this.maxQuantity = false
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user_id')) {
        console.log(this.productData);
        this.product.localAddtoCart(this.productData);
        this.removeCart = true
      } else {
        console.log("user is logged in")
        let user = localStorage.getItem("user_id");
        let userId = user && JSON.parse(user)._id;
        console.log(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData._id,
        }
        delete cartData._id;
        console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
          }
        })
      }
    }
  }

  RemoveFromCart(productId: string) {
    if (!localStorage.getItem('user_id')) {
      this.product.removeItemFromCart(productId)
      this.removeCart=false;
    } else {
      let user = localStorage.getItem('user_id');
      let userId = user && JSON.parse(user)._id;
      console.log(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData._id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId)
        }
      })
      this.removeCart=false;
    }
  }

 
  show:any={
    features:false,
    description:false,
    info:false
  }
  togglefn(section:any){
    this.show[section]=!this.show[section]
  }
}

