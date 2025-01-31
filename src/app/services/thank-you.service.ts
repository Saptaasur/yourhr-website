import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThankYouService {
  private apiUrl = 'https://yourhr-backend-4edy.onrender.com/api/thankyou'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getSummary(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
