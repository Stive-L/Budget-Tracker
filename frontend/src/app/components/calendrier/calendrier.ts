import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseService } from '../../services/depense';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendrier.html',
  styleUrls: ['./calendrier.css']
})
export class CalendrierComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  daysInMonth: any[] = [];

  abonnements: any[] = [];
  abonnementsDuMois: any[] = [];
  abonnementsGroupesParJour: { date: string, color: string, abonnements: any[] }[] = [];

  couleurCache: { [key: string]: string } = {};

  constructor(private depenseService: DepenseService) {}

  ngOnInit(): void {
    this.depenseService.getAbonnements().subscribe(data => {
      this.abonnements = data;
      this.updateCalendar();
    });
  }

  updateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const days: any[] = [];

    const today = new Date();
    const abosThisMonth = this.getAbonnementsForCurrentMonth();
    this.abonnementsDuMois = abosThisMonth;

    // Groupement pour la légende
    const groupes: { [date: string]: any[] } = {};
    for (const abo of abosThisMonth) {
      if (!groupes[abo.dateDebut]) groupes[abo.dateDebut] = [];
      groupes[abo.dateDebut].push(abo);
    }

    this.abonnementsGroupesParJour = Object.entries(groupes).map(([date, abonnements]) => ({
      date,
      color: this.getColorForDate(date),
      abonnements
    }));

    for (let i = 0; i < (startingDay === 0 ? 6 : startingDay - 1); i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${this.currentYear}-${this.format(this.currentMonth + 1)}-${this.format(i)}`;
      const hasAbonnement = abosThisMonth.some(a => a.dateDebut === dateStr);
      const color = hasAbonnement ? this.getColorForDate(dateStr) : null;
      const isToday =
        i === today.getDate() &&
        this.currentMonth === today.getMonth() &&
        this.currentYear === today.getFullYear();

      days.push({
        day: i,
        abonnement: hasAbonnement,
        isToday: isToday,
        color: color
      });
    }

    this.daysInMonth = days;
  }

  getAbonnementsForCurrentMonth(): any[] {
    return this.abonnements.map(abo => {
      const originalDate = new Date(abo.dateDebut);
      const day = originalDate.getDate();
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const safeDay = Math.min(day, lastDayOfMonth);
      const projectedDate = new Date(this.currentYear, this.currentMonth, safeDay);

      const dateStr = projectedDate.toLocaleDateString('fr-CA'); // 'YYYY-MM-DD'

      return {
        ...abo,
        dateDebut: dateStr,
        color: this.getColorForDate(dateStr)
      };
    });
  }

  format(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.updateCalendar();
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.updateCalendar();
  }

  getMonthName(): string {
    return this.currentDate.toLocaleString('fr-FR', { month: 'long' });
  }

  getColorForDate(dateStr: string): string {
    if (this.couleurCache[dateStr]) return this.couleurCache[dateStr];

    const day = new Date(dateStr).getDate();
    const hue = (day * 47) % 360;
    const color = `hsl(${hue}, 80%, 50%)`;

    this.couleurCache[dateStr] = color;
    return color;
  }

  getFullDate(day: number): string {
    return `${this.currentYear}-${this.format(this.currentMonth + 1)}-${this.format(day)}`;
  }

  getDayFromDate(dateStr: string): number {
    return new Date(dateStr).getDate();
  }
  
  supprimerAbonnement(id: number): void {
    if (confirm('Supprimer cet abonnement ?')) {
      this.depenseService.supprimerAbonnement(id).subscribe(() => {
        // Mise à jour locale
        this.abonnements = this.abonnements.filter(a => a.id !== id);
        this.updateCalendar();
      });
    }
  }
}
