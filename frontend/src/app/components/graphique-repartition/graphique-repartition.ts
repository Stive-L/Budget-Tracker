import { Component, OnInit } from '@angular/core';
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
export class GraphiqueRepartitionComponent implements OnInit {

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    this.depenseService.getDepenses().subscribe(depenses => {
      const parCategorie: { [key: string]: number } = {};

      depenses.forEach(d => {
        parCategorie[d.categorie] = (parCategorie[d.categorie] || 0) + d.montant;
      });

      const labels = Object.keys(parCategorie);
      const data = Object.values(parCategorie);

      new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              '#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8'
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
  }
}
