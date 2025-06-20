import { Component } from '@angular/core';
import { DepenseListComponent } from './components/depense-list/depense-list'; // ← ajoute ça !


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DepenseListComponent],
  templateUrl: './app.html',
})
export class AppComponent {}
