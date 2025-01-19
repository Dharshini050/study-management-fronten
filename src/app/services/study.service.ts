import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private apiUrl = 'http://127.0.0.1:8000/api/studies/';  // Backend URL

  constructor(private http: HttpClient) {}

  logAction(action: string, details: any): Observable<any> {
    const logData = { action, details };
    return this.http.post('http://127.0.0.1:8000/api/logs/', logData);
  }
  
  // Fetch all studies (GET request)
  getStudies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new study (POST request)
  addStudy(study: any): Observable<any> {
    return this.http.post(this.apiUrl, study);
  }

  updateStudy(id: number, study: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, study);
  }

  // Delete a study (DELETE request)
  deleteStudy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getStudyWithSubjects(studyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${studyId}/`);
  }

  // Add new methods
  addSubject(newSubject: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/subjects/', newSubject);
  }
  
  deleteSubject(subjectId: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/subjects/${subjectId}/`);
  }
  
  getSubjects(studyId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/subjects/?study=${studyId}`);
  }

  // In study.service.ts

  getSubjectById(subjectId: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/subjects/${subjectId}`);
  }
  

  updateSubject(subjectId: number, subjectData: any): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/api/subjects/${subjectId}/`, subjectData);
  }


}
