import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Exercise, ExerciseFormData } from '../../models/interfaces/exercise.interface';
import { TargetedMuscle, TargetedMusclePayload } from '../../models/interfaces/targetedMuscle.interface';

@Injectable({
  providedIn: 'root'
})
export class TargetedMuscleService {
  private apiUrl = 'http://localhost:3000/api/targetedMuscle';

  constructor(private http : HttpClient) { }

  getTargetedMusclesByExerId(exercise_id : number,token?: string): Observable<TargetedMuscle[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<TargetedMuscle[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching exercises', error);
        return throwError(error);
      })
    );
  }

  createTargetedMuscle(targetedMusclePayload : TargetedMusclePayload, token?: string): Observable<TargetedMusclePayload> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<TargetedMusclePayload>(this.apiUrl, targetedMusclePayload, { headers }).pipe(
      catchError(error => {
        console.error('Error creating targeted muscle', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        return throwError(error);
      })
    );
  }
}
