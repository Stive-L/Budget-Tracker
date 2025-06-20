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

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    this.depenseService.getDepenses().subscribe(data => {
      this.depenses = data;
    });
  }
}
