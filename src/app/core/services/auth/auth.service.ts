import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse, User } from '../../models/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRegister = 'http://localhost:3000/api/auth/register';
  private apiUrlLogin = 'http://localhost:3000/api/auth/login';
  private apiUrlRefreshToken = 'http://localhost:3000/api/auth/token';
  private apiUrlValidateToken = 'http://localhost:3000/api/auth/validate-token';
  private apiUrlLogout = 'http://localhost:3000/api/auth/logout';

  private ACCESS_TOKEN_KEY = 'access_token';
  private REFRESH_TOKEN_KEY = 'refresh_token';
  private USERNAME_KEY = 'username';
  private USER_ID_KEY = 'user_id';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlRegister, user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrlLogin, user).pipe(
      tap((response: LoginResponse) => {
        if (response.accessToken && response.refreshToken && response.user_id) {
          this.saveToken(response.accessToken, response.refreshToken);
          this.saveUsername(user.username);
          this.saveUserId(response.user_id);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return token !== null && !this.isTokenExpired(token);
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(this.apiUrlValidateToken, { token }).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }

  private saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  private saveUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }
  private saveUserId(userId: string): void {
    localStorage.setItem(this.USER_ID_KEY, userId);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  logout(): Observable<void> {
    const token = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return of(undefined);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(this.apiUrlLogout, {
      headers: headers,
      body: { token: refreshToken }
    }).pipe(
      tap(() => {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USERNAME_KEY);
      }),
      catchError((error) => {
        console.error('Logout failed', error);
        return of(undefined);
      })
    );
  }


  refreshAccessToken(): Observable<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of(null);
    }

    return this.http.post<LoginResponse>(this.apiUrlRefreshToken, { refreshToken }).pipe(
      map((response: LoginResponse) => {
        if (response.accessToken && response.refreshToken) {
          this.saveToken(response.accessToken, response.refreshToken);
          return response.accessToken;
        } else {
          return null;
        }
      }), catchError(() => {
        return of(null);
      })
    )
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
