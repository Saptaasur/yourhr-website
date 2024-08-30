import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'https://yourhr-backend-4edy.onrender.com/api/upload'; // Backend API URL

  constructor(private http: HttpClient) { }

  uploadFile(fileData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, fileData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('File upload error:', error);
    return throwError(() => new Error('File upload failed. Please try again later.'));
  }
}
