import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseService } from '../../services/depense'; // ajuste le chemin si besoin

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
    const startingDay = firstDayOfMonth.getDay(); // 0 = dimanche

    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const days: any[] = [];

    const today = new Date();

    for (let i = 0; i < (startingDay === 0 ? 6 : startingDay - 1); i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${this.currentYear}-${this.format(this.currentMonth + 1)}-${this.format(i)}`;
      const hasAbonnement = this.abonnements.some(a => a.dateDebut === dateStr);
      const isToday =
        i === today.getDate() &&
        this.currentMonth === today.getMonth() &&
        this.currentYear === today.getFullYear();

      days.push({
        day: i,
        abonnement: hasAbonnement,
        isToday: isToday,
        color: hasAbonnement ? this.getColorForDate(dateStr) : null
      });
    }

    this.daysInMonth = days;
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

    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    const color = `hsl(${hue}, 80%, 50%)`;
    this.couleurCache[dateStr] = color;
    return color;
  }

  get abonnementsDuMois(): any[] {
    return this.abonnements.filter(a => {
      const date = new Date(a.dateDebut);
      return date.getMonth() === this.currentMonth && date.getFullYear() === this.currentYear;
    });
  }
}
