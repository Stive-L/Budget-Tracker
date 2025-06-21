import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseListComponent } from '../depense-list/depense-list';
import { AjouterDepenseComponent } from '../ajouter-depense/ajouter-depense';
import { GraphiqueRepartitionComponent } from '../graphique-repartition/graphique-repartition';
import { AjouterAbonnementComponent } from '../ajouter-abonnement/ajouter-abonnement';
import { CalendrierComponent } from '../calendrier/calendrier';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DepenseListComponent, AjouterDepenseComponent,GraphiqueRepartitionComponent,AjouterAbonnementComponent, CalendrierComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  afficherFormulaire = false;
  afficherCalendrier = false;
  afficherFormulaireAbonnement = false;

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
