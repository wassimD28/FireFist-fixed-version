import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from '../../models/interfaces/equipment.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'http://localhost:3000/api/equipment';

  constructor(private http: HttpClient) { }

  getAllStandardEquipments(token?: string): Observable<Equipment[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Equipment[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching equipments', error);
        return throwError(error);
      })
    );
  }
  deleteEquipment(id ?: number,token?: string): Observable<Equipment[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete<Equipment[]>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting equipment', error);
        return throwError(error);
      })
    );
  }
  getAllCustomEquipments(user_id?: string,token?: string): Observable<Equipment[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Equipment[]>(`${this.apiUrl}/custom/${user_id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching equipments', error);
        return throwError(error);
      })
    );
  }

  createEquipment(equipmentData: FormData, token?: string): Observable<Equipment> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<Equipment>(this.apiUrl, equipmentData, { headers }).pipe(
      catchError(error => {
        console.error('Error creating equipment', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        return throwError(error);
      })
    );
  }
}
