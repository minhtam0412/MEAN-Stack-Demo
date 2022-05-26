import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {AuthService} from "./auth.service";

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  user: Observable<any> = this.userSubject.asObservable();

  constructor(private authService: AuthService) {
    this.userSubject = new BehaviorSubject<any>(this.getUser());
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  async signOut(): Promise<void> {
    //clear local storage on browser
    window.sessionStorage.clear();
    this.userSubject.next(null);

    //call api logout
    const src$ = this.authService.signout();
    await lastValueFrom(src$);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
