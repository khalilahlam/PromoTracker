import { PromocionService } from './services/promocion/promocion';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './componentes/navbar/navbar';
import { Footer } from './componentes/footer/footer';
import { Promocion } from './interfaces/promocion';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,Navbar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'PromoTracker';
}
