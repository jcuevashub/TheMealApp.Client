import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthModel } from '../../shared/models/auth.model';
import { ResponseInfo } from '../../shared/models/response-info.model';
import { UserModel } from '../../shared/models/user.model';
import { UserRespose } from '../../shared/models/user-responde.models';

const API_URL = 'http://localhost:5188/v1/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ResponseInfo<AuthModel>> {
    return this.http.post<ResponseInfo<AuthModel>>(`${API_URL}/sign-in`, {
      email,
      password,
    });
  }

  createUser(user: UserModel): Observable<ResponseInfo<UserRespose>> {
    return this.http.post<ResponseInfo<UserRespose>>(API_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<ResponseInfo<UserRespose>> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ResponseInfo<UserRespose>>(`${API_URL}/current-user`, {
      headers: httpHeaders
    });
  }
}
