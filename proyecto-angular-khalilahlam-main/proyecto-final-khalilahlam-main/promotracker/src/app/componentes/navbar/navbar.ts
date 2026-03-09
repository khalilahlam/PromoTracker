import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',

  // Imports necesarios porque el componente es standalone
  imports: [RouterModule],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  title = 'PromoTracker';

  constructor(
    public authService: AuthService,

    private router: Router
  ) {}

  logout() {

    // Eliminamos la sesión del navegador
    this.authService.cerrarSesion();

    // Redirigimos al usuario al login
    this.router.navigate(['/login']);
  }
}
