import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseService } from '../../services/depense';

@Component({
  selector: 'app-depense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depense-list.html',
  styleUrls: ['./depense-list.css']
})
export class DepenseListComponent implements OnInit {
  depenses: any[] = [];
  abonnements: any[] = [];

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    this.depenseService.getDepenses().subscribe(data => {
      this.depenses = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    this.depenseService.getAbonnementsPasses().subscribe(data => {
      this.abonnements = data.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
    });
  }
}
