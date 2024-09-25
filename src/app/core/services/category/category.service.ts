import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/interfaces/category.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/category';

  constructor(private http : HttpClient) { }

  getAllCategories(token?: string): Observable<Category[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Category[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching categories', error);
        return throwError(error);
      })
    );
  }
}
