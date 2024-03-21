import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { product } from '../../data-type';
import { CartService } from '../../services/cart.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm !: FormGroup;
  dumbbell=faDumbbell

  constructor(private product: CartService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    },
    );
  }

  login() {
    this.authService.loginService(this.loginForm.value)
      .subscribe({
        next: (res) => {
          alert("Login Successfully!");
          
          localStorage.setItem('user_id', JSON.stringify(res.data));
          this.router.navigate(['']);
          this.loginForm.reset();
          this.localCartToRemoteCart()
        },
        error: (err) => {
          console.log(err);

          alert("Email or password is incorrect !!!")


        }
      })
  }


  localCartToRemoteCart() {
    let data = localStorage.getItem('cartProducts');
    let user = localStorage.getItem('user_id');
    let userId = user && JSON.parse(user)._id;

    if (data) {
      let cartDataList = JSON.parse(data);
      cartDataList.forEach((product: product, index: number) => {
        let cartData: any = {
          ...product,
          productId: product._id,
          userId,
          quantiy: undefined
        };
        delete cartData._id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            console.log("item stored in db");
          }
        })
        if (cartDataList.length === index + 1) {
          localStorage.removeItem("cartProducts")
        }
      })
    }
    this.product.getCartList(userId)
  }
}

