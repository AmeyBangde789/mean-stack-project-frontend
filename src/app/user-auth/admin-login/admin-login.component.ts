import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

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

  ngOnInit(): void {
   this.loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
   },
   );
  }

  login(){
    this.authService.adminLoginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Admin Login Successfully!");
        localStorage.setItem("Admin_id",JSON.stringify(res.data));
        this.router.navigate(['']);
        this.loginForm.reset();
      },
      error:(err)=>{
        console.log(err);
        alert("Email or password is incorrect !!!")
      }
    })
  }
}