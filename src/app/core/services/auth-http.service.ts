import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthModel } from '../../shared/models/auth.model';
import { ResponseInfo } from '../../shared/models/response-info.model';
import { UserModel } from '../../shared/models/user.model';
import { UserRespose } from '../../shared/models/user-responde.models';

const API_USERS_URL = `${environment.apiUrl}/v1/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // public methods
  login(email: string, password: string): Observable<ResponseInfo<AuthModel>> {
    return this.http.post<ResponseInfo<AuthModel>>(`${API_USERS_URL}/sign-in`, {
      email,
      password,
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<ResponseInfo<UserRespose>> {
    return this.http.post<ResponseInfo<UserRespose>>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<ResponseInfo<UserRespose>> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseInfo<UserRespose>>(`${API_USERS_URL}/current-user`, {
      headers: httpHeaders,
    });
  }
}
