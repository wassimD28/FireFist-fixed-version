import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Difficulty } from '../../models/interfaces/difficulty.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  private apiUrl = 'http://localhost:3000/api/difficulty';

  constructor(private http : HttpClient) { }

  getAllDifficulties(token?: string): Observable<Difficulty[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Difficulty[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching difficulties', error);
        return throwError(error);
      })
    );
  }
}
