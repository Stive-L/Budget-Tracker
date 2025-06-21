import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepenseListComponent } from '../depense-list/depense-list';
import { AjouterDepenseComponent } from '../ajouter-depense/ajouter-depense';
import { GraphiqueRepartitionComponent } from '../graphique-repartition/graphique-repartition';
import { AjouterAbonnementComponent } from '../ajouter-abonnement/ajouter-abonnement';
import { CalendrierComponent } from '../calendrier/calendrier';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DepenseListComponent,
    AjouterDepenseComponent,
    GraphiqueRepartitionComponent,
    AjouterAbonnementComponent,
    CalendrierComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  afficherFormulaire = false;
  afficherCalendrier = false;
  afficherFormulaireAbonnement = false;

  // Format attendu par les composants enfants : 'YYYY-MM'
  moisSelectionne: string = new Date().toISOString().slice(0, 7);

  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }

  toggleCalendrier() {
    this.afficherCalendrier = !this.afficherCalendrier;
  }

  toggleFormulaireAbonnement() {
    this.afficherFormulaireAbonnement = !this.afficherFormulaireAbonnement;
  }
}
