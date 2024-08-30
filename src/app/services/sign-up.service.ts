import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'http://localhost:5000/api/signup'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  signUpUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
