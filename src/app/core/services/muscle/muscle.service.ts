import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Muscle } from '../../models/interfaces/muscle.interface';

@Injectable({
  providedIn: 'root'
})
export class muscleService {
  private apiUrl = 'http://localhost:3000/api/muscle';

  constructor(private http : HttpClient) { }

  getAllMuscles(token?: string): Observable<Muscle[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Muscle[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching categories', error);
        return throwError(error);
      })
    );
  }
}
