import { Component } from '@angular/core';
import { DepenseService } from '../../services/depense';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-abonnement',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './ajouter-abonnement.html',
  styleUrls: ['./ajouter-abonnement.css']
})
export class AjouterAbonnementComponent {
  nouvelAbonnement = {
    nom: '',
    montant: null,
    frequence: '',
    dateDebut: ''
  };

  constructor(private depenseService: DepenseService) {}

  ajouterAbonnement() {
    this.depenseService.ajouterAbonnement(this.nouvelAbonnement).subscribe(() => {
      alert('Abonnement ajouté !');
      this.nouvelAbonnement = { nom: '', montant: null, frequence: '', dateDebut: '' };
    });
  }
}