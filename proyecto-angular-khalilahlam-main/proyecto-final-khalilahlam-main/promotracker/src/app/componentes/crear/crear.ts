import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Promocion } from '../../interfaces/promocion';
import { PromocionService } from '../../services/promocion/promocion';
import { AuthService } from '../../services/auth/auth';


@Component({
  selector: 'app-crear',

  imports: [CommonModule, FormsModule],

  templateUrl: './crear.html',
  styleUrl: './crear.css',
})
export class Crear implements OnInit {

  newPromocion: Promocion = {
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
    // Detector de cambios para actualizar la vista manualmente
    private cdr: ChangeDetectorRef,

    // Servicio para gestionar promociones
    private promocionService: PromocionService,

    // Router para redirección
    private router: Router,

    // Servicio de autenticación
    private authService: AuthService
  ) {}

  // Se ejecuta cuando el componente se carga
  ngOnInit() {

    // Protección de ruta → solo usuarios logueados pueden crear promociones
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  addPromocion() {

    // Validación básica → título y fecha obligatorios
    if (!this.newPromocion.title || !this.newPromocion.date) return;

    // Generamos un id único usando timestamp
    this.newPromocion.id = Date.now().toString();

    // Enviamos la promoción al servicio (y a la API)
    this.promocionService.addPromocion(this.newPromocion);

    // Reiniciamos el formulario después de crear la promoción
    this.newPromocion = {
      id: '',
      title: '',
      description: '',
      image: '',
      price: 0,
      date: '',
      activa: true,
      categoria: ''
    };

    // Volvemos a la lista de promociones
    this.router.navigate(['/promociones']);
  }

  // Método para cambiar la imagen de la promoción
  changeImage(fileInput: HTMLInputElement) {

    // Si no hay archivo seleccionado → salir
    if (!fileInput.files || fileInput.files.length === 0) return;

    // FileReader permite leer archivos del navegador
    const reader = new FileReader();

    // Convertimos la imagen a Base64
    reader.readAsDataURL(fileInput.files[0]);

    // Cuando termina de cargar la imagen
    reader.addEventListener('loadend', () => {

      // Guardamos la imagen en la promoción
      this.newPromocion.image = reader.result as string;

      this.cdr.detectChanges();
    });
  }
}
