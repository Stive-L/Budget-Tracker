import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { DepenseService } from '../../services/depense';

Chart.register(...registerables);

@Component({
  selector: 'app-graphique-repartition',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas id="pieChart"></canvas>`,
})
export class GraphiqueRepartitionComponent implements OnInit, OnChanges {
  @Input() mois: string = ''; // format '2025-06'

  private chartInstance: Chart | null = null;

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    if (this.mois) this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mois'] && !changes['mois'].firstChange) {
      this.loadData();
    }
  }

  loadData(): void {
    this.depenseService.getDepenses().subscribe(depenses => {
      const parCategorie: { [key: string]: number } = {};

      const filtres = depenses.filter(d => d.date?.startsWith(this.mois));

      filtres.forEach(d => {
        parCategorie[d.categorie] = (parCategorie[d.categorie] || 0) + d.montant;
      });

      const labels = Object.keys(parCategorie);
      const data = Object.values(parCategorie);

      const colors = labels.map(label => this.getCouleurCategorie(label));

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    });
  }

  getCouleurCategorie(categorie: string): string {
    const couleurs: { [key: string]: string } = {
      'courses': '#007bff',
      'sorties': '#dc3545',
      'loisir': '#28a745',
      'transports': '#ffc107'
    };

    const key = categorie.toLowerCase();
    if (couleurs[key]) return couleurs[key];

    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }
}
