import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  fb = inject(FormBuilder);
  router= inject(Router);
  loginForm !: FormGroup;
  authService = inject(AuthService);
  dumbbell=faDumbbell
  show=false
  check=faCircleCheck
  popup=false
  isBlur=false

  ngOnInit(): void {
   this.loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
   },
   );
   setTimeout(() => {
    if(this.popup=true){
      this.popup=false
      this.isBlur=false
    }
   }, 2000);
  }

  login(){
    this.authService.adminLoginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        localStorage.setItem("Admin_id",JSON.stringify(res.data));
        this.loginForm.reset();
        this.isBlur=true
        this.popup=true
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },
      error:(err)=>{
        console.log(err);
        this.show=true
        this.loginForm.reset()
      }
    })
  }
}
