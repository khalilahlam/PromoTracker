import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
@Component({
  selector: 'app-login',


  imports: [CommonModule, FormsModule],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  error = '';

  constructor(
    private authService: AuthService,

    private router: Router
  ) {}

  login() {

    // Llamada al servicio para verificar usuario
    this.authService.login(this.username, this.password).subscribe(data => {

      // Si la API devuelve resultados → usuario existe
      if (data.length > 0) {

        // Guardamos sesión en localStorage
        this.authService.guardarSesion(this.username);

        // Redirigimos al usuario al index
        this.router.navigate(['/index']);

      } else {

        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
