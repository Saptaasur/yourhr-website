import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'https://yourhr-backend-4edy.onrender.com/api/signup'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  signUpUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
