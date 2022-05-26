//https://www.bezkoder.com/angular-12-jwt-auth/#Add_Bootstrap_to_Angular_project
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
const AUTH_API = 'http://localhost:4000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(userName: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      userName,
      email,
      password
    }, httpOptions);
  }

  refreshToken(refreshToken: string) {
    return this.http.post(AUTH_API + 'refreshToken', {
      refreshToken: refreshToken
    }, httpOptions);
  }
}
