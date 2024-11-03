import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Exercise, ExerciseFormData } from '../../models/interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'http://localhost:3000/api/exercise';

  constructor(private http : HttpClient) { }

  getAllExercises(user_id?: string,token?: string): Observable<Exercise[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Exercise[]>(`${this.apiUrl}/${user_id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching exercises', error);
        return throwError(error);
      })
    );
  }

  createExercise(exerciseData: FormData, token?: string): Observable<ExerciseFormData> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<ExerciseFormData>(this.apiUrl, exerciseData, { headers }).pipe(
      catchError(error => {
        console.error('Error creating exercise', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        return throwError(error);
      })
    );
  }

  deleteExercise(id: number, token?: string): Observable<void> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting exercise', error);
        return throwError(error);
      })
    );
  }
}
