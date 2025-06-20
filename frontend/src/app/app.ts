import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard'; // ← ✔️ remplace l'import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './app.html',
})
export class AppComponent {}
