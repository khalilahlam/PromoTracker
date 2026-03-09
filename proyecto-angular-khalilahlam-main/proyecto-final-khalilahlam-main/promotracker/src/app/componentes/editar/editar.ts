import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Promocion } from '../../interfaces/promocion';
import { PromocionService } from '../../services/promocion/promocion';
import { AuthService } from '../../services/auth/auth';



@Component({
  selector: 'app-editar',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {

  promocion: Promocion = {
    id: '',
    title: '',
    description: '',
    image: '',
    price: 0,
    date: '',
    activa: true,
    categoria: ''
  };

  constructor(
    private promocionService: PromocionService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
     // Obtenemos el id de la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Buscamos la promoción en el servicio
      const promo = this.promocionService.getPromocionById(id);

      if (promo) {
        // Clonamos el objeto para evitar modificar el original directamente
        this.promocion = { ...promo };
      }
    }
  }
// Guarda los cambios de la promoción
  guardarCambios() {
    this.promocionService.updatePromocion(this.promocion);
    this.router.navigate(['/promociones']);
  }
}
