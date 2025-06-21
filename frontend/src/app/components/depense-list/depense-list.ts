import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseService } from '../../services/depense';

@Component({
  selector: 'app-depense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depense-list.html',
  styleUrls: ['./depense-list.css']
})
export class DepenseListComponent implements OnInit, OnChanges {
  depenses: any[] = [];
  abonnements: any[] = [];

  depensesFiltrees: any[] = [];
  abonnementsFiltres: any[] = [];

  @Input() mois: string = '';

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    this.depenseService.getDepenses().subscribe(data => {
      this.depenses = data;
      this.filtrerDonnées();
    });

    this.depenseService.getAbonnementsPasses().subscribe(data => {
      this.abonnements = data;
      this.filtrerDonnées();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mois']) {
      this.filtrerDonnées();
    }
  }

  filtrerDonnées(): void {
    if (!this.mois) return;
    
    this.depensesFiltrees = this.depenses.filter(d => d.date?.startsWith(this.mois));
    this.abonnementsFiltres = this.abonnements.filter(a => a.dateDebut?.startsWith(this.mois));

    this.depensesFiltrees.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.abonnementsFiltres.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
  }

  categorieCouleurs: { [key: string]: string } = {
    'courses': '#007bff',
    'sorties': '#dc3545',
    'loisir': '#28a745',
    'transports': '#ffc107'
  };

  private stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }

  getCategorieStyle(categorie: string): any {
    const key = categorie.toLowerCase();
    const couleur = this.categorieCouleurs[key] || this.stringToColor(key);
    return { color: couleur, 'font-weight': 'bold' };
  }

  supprimerDepense(id: number) {
    this.depenseService.supprimerDepense(id).subscribe(() => {
      this.depenses = this.depenses.filter(d => d.id !== id);
      this.filtrerDonnées();
    });
  }

  supprimerAbonnement(id: number) {
    this.depenseService.supprimerAbonnement(id).subscribe(() => {
      this.abonnements = this.abonnements.filter(a => a.id !== id);
      this.filtrerDonnées();
    });
  }
}
