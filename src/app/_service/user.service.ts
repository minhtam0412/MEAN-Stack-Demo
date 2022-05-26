import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + '/api/test/user', {responseType: 'text'});
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/api/test/all', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + '/api/test/mod', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + '/api/test/admin', {responseType: 'text'});
  }
}
