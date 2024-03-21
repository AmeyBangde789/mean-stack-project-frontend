import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apiUrls } from '../validators/api.urls';
import { apiaddproduct } from '../validators/api.addproduct';
import { User } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  static isLoggedIn: any;


  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}auth/registration`, registerObj);
  }

  loginService(loginObj: User) {
    return this.http.post<any>(`${apiUrls.authServiceApi}auth/login`, loginObj, { withCredentials: true });
  }

  getUser(): Observable<any> {
    let userStore = localStorage.getItem('user_id');
    let userData = userStore && JSON.parse(userStore);
    let userId = userData._id
    return this.http.get<any>(`${apiUrls.authServiceApi}role/getOne/${userId}`);
  }
  getAdmin(): Observable<any> {
    let userStore = localStorage.getItem('Admin_id');
    let userData = userStore && JSON.parse(userStore);
    let userId = userData._id
    return this.http.get<any>(`${apiUrls.authServiceApi}role/getOne/${userId}`);
  }
  updateUser(userId:string,data:any){
    return this.http.put<any>(`${apiUrls.authServiceApi}role/updateUser/${userId}`, data);
  }
  adminLoginService(loginObj: User) {
    return this.http.post<any>(`${apiUrls.authServiceApi}auth/admin-login`, loginObj, { withCredentials: true });
  }

  addproductService(addproductObj: any) {
    return this.http.post<any>(`${apiaddproduct.addproductServiceApi}addproduct`, addproductObj);
  }

  sendEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}auth/send-email`, { email: email });

  }
  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}auth/reset-password`, resetObj);

  }

}

