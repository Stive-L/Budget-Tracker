import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepenseListComponent } from '../depense-list/depense-list';
import { AjouterDepenseComponent } from '../ajouter-depense/ajouter-depense';
import { GraphiqueRepartitionComponent } from '../graphique-repartition/graphique-repartition';
import { AjouterAbonnementComponent } from '../ajouter-abonnement/ajouter-abonnement';
import { CalendrierComponent } from '../calendrier/calendrier';
import { DepenseService } from '../../services/depense';

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
export class DashboardComponent implements OnInit {
  afficherFormulaire = false;
  afficherCalendrier = false;
  afficherFormulaireAbonnement = false;

  moisSelectionne: string = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

  toutesDepenses: any[] = [];
  tousAbonnements: any[] = [];

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    this.depenseService.getDepenses().subscribe(data => {
      this.toutesDepenses = data;
    });

    this.depenseService.getAbonnementsPasses().subscribe(data => {
      this.tousAbonnements = data;
    });
  }

  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }

  toggleCalendrier() {
    this.afficherCalendrier = !this.afficherCalendrier;
  }

  toggleFormulaireAbonnement() {
    this.afficherFormulaireAbonnement = !this.afficherFormulaireAbonnement;
  }

  get totalPourMois(): number {
    return this.depensesDuMois.reduce((sum, d) => sum + d.montant, 0)
         + this.abonnementsDuMois.reduce((sum, a) => sum + a.montant, 0);
  }

  get moisActuelTexte(): string {
    const date = new Date(`${this.moisSelectionne}-01`);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
  }

  get depensesDuMois(): any[] {
    return this.toutesDepenses.filter(d => d.date?.startsWith(this.moisSelectionne));
  }

  get abonnementsDuMois(): any[] {
    return this.tousAbonnements.filter(a => a.dateDebut?.startsWith(this.moisSelectionne));
  }
}
