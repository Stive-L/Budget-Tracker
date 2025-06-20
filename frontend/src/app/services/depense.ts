import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private apiUrl = 'http://localhost:8081/api/depenses';

  constructor(private http: HttpClient) {}

  getDepenses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
