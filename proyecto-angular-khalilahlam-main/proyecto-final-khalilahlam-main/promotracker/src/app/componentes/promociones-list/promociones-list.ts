import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promocion } from '../../interfaces/promocion';
import { FormsModule } from '@angular/forms';
import { PromocionService } from '../../services/promocion/promocion';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { PromocionFilterPipe } from '../../pipes/promocion-filter-pipe';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-promociones-list',
  imports: [CommonModule, FormsModule, PromocionFilterPipe, RouterModule],
  templateUrl: './promociones-list.html',
  styleUrl: './promociones-list.css',
})
export class PromocionesList implements OnInit {

  // Título que se muestra en el HTML
  title = 'Promociones Disponibles';

  // Variables para los filtros
  searchText = '';
  categoriaSeleccionada = '';
  soloActivas = false;

  ordenarPor = 'fecha-desc';

  promociones: Promocion[] = [];

  constructor(
    // Servicio para obtener y gestionar promociones
    private promocionService: PromocionService,

    public authService: AuthService,

    private router: Router,

    private cdr: ChangeDetectorRef
  ) {}

  // ngOnInit se ejecuta cuando el componente se carga
  ngOnInit(): void {
    console.log('Inicio component initialized');

    // Cargamos promociones desde el servicio
    this.promocionService.cargarPromociones().subscribe(response => {

      // Guardamos las promociones en el componente
      this.promociones = response;

      console.log('Promociones fetched:', this.promociones);

      // Forzamos actualización de la vista (útil en detección de cambios)
      this.cdr.markForCheck();
    });
  }

  // Método para eliminar una promoción
  eliminarPromocion(id: string) {

    // Si el usuario no está logueado → lo manda a login
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }

    // Confirmación antes de eliminar
    if (confirm('¿Seguro que deseas eliminar?')) {


      this.promocionService.deletePromocion(id);


      setTimeout(() => {

        this.promocionService.cargarPromociones().subscribe(response => {


          this.promociones = response;

          this.cdr.markForCheck();
        });

      }, 300);
    }
  }

  get promocionesOrdenadas() {

    // Creamos copia del array para no modificar el original
    let promos = [...this.promociones];

    // Ordenación por fecha descendente (más reciente primero)
    if (this.ordenarPor === 'fecha-desc') {
      return promos.sort((a, b) => b.date.localeCompare(a.date));
    }

    if (this.ordenarPor === 'fecha-asc') {
      return promos.sort((a, b) => a.date.localeCompare(b.date));
    }

    // Ordenación por precio menor a mayor
    if (this.ordenarPor === 'precio-asc') {
      return promos.sort((a, b) => a.price - b.price);
    }

    if (this.ordenarPor === 'precio-desc') {
      return promos.sort((a, b) => b.price - a.price);
    }

    return promos;
  }
}
