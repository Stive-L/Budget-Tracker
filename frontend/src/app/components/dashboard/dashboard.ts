import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseListComponent } from '../depense-list/depense-list';
import { AjouterDepenseComponent } from '../ajouter-depense/ajouter-depense';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DepenseListComponent, AjouterDepenseComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  afficherFormulaire = false;
  afficherCalendrier = false;
  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }
}
