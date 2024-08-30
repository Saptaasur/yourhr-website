import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiUrl = 'https://yourhr-backend-4edy.onrender.com/api/educations';

  constructor(private http: HttpClient) {}

  /**
   * Method to create a new education entry or multiple entries.
   * @param educationData - The data for the new education entry or entries.
   * @returns An Observable with the response from the backend.
   */
  createEducation(educationData: any[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, educationData);
  }

  /**
   * Method to get all education entries.
   * @returns An Observable with the list of education entries.
   */
  getAllEducations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Method to get a specific education entry by ID.
   * @param id - The ID of the education entry.
   * @returns An Observable with the education entry.
   */
  getEducationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Method to update an existing education entry.
   * @param id - The ID of the education entry.
   * @param educationData - The updated data for the education entry.
   * @returns An Observable with the updated education entry.
   */
  updateEducation(id: string, educationData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, educationData);
  }

  /**
   * Method to delete an education entry.
   * @param id - The ID of the education entry.
   * @returns An Observable with the result of the deletion.
   */
  deleteEducation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
