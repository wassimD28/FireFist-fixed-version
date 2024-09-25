import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BodyDiagram } from '../../models/interfaces/bodyDiagram.interface';

@Injectable({
  providedIn: 'root'
})
export class BodyDiagramService {
  private apiUrl = 'http://localhost:3000/api/bodyDiagram';

  constructor(private http : HttpClient) { }

  getAllBodyDiagrams(token?: string): Observable<BodyDiagram[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<BodyDiagram[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching categories', error);
        return throwError(error);
      })
    );
  }
}

