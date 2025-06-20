import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepenseService } from '../../services/depense';

@Component({
  selector: 'app-ajouter-depense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-depense.html',
   styleUrls: ['./ajouter-depense.css']
})
export class AjouterDepenseComponent {
  nouvelleDepense = {
    categorie: '',
    description: '',
    montant: null,
    date: ''
  };

  constructor(private depenseService: DepenseService) {}

  ajouterDepense() {
    this.depenseService.ajouterDepense(this.nouvelleDepense).subscribe(() => {
      alert("Dépense ajoutée !");
      this.nouvelleDepense = { categorie: '', description: '', montant: null, date: '' };
    });
  }
}
