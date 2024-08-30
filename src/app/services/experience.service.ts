// experience.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = 'https://yourhr-backend-4edy.onrender.com/api/experiences';

  constructor(private http: HttpClient) {}

  createExperience(experienceData: any[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, experienceData);
  }

  getAllExperiences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getExperienceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateExperience(id: string, experienceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, experienceData);
  }

  deleteExperience(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
