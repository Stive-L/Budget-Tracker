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

  getAbonnementsPasses() {
  return this.http.get<any[]>('http://localhost:8081/api/abonnements/passes');
  }
  ajouterDepense(depense: any) {
  return this.http.post(this.apiUrl, depense);
  }
  ajouterAbonnement(abonnement: any) {
  return this.http.post('http://localhost:8081/api/abonnements', abonnement);
  }
  getAbonnements(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8081/api/abonnements');
  }
  supprimerAbonnement(id: number) {
    return this.http.delete(`http://localhost:8081/api/abonnements/${id}`);
  }
  supprimerDepense(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
