import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ValueCounter } from '../../models/interfaces/valueCounter.interface';

@Injectable({
  providedIn: 'root'
})
export class ValueCounterService {
  private apiUrl = 'http://localhost:3000/api/valueCounter'
  constructor(private http : HttpClient) { }

  getAllValueCounters(token?:string) : Observable<ValueCounter[]>{
    let headers = new HttpHeaders();
    if (token){
      headers = headers.set('Authorization',`Bearer ${token}`);
    }
    return this.http.get<ValueCounter[]>(this.apiUrl, { headers }).pipe(
      catchError((error)=>{
        console.error('Error retrieving value counters', error);
        return throwError(error)
      })
    )
  }
}
