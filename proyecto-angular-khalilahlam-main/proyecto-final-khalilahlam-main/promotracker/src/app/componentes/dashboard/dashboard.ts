import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PromocionService } from '../../services/promocion/promocion';
import { AuthService } from '../../services/auth/auth';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',

  imports: [CommonModule, RouterModule],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  // Referencias a los canvas del HTML donde se dibujan las gráficas
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  totalPromociones = 0;
  promoActivas = 0;
  promoInactivas = 0;

  // Objeto que almacena conteo de promociones por categoría
  categorias: { [key: string]: number } = {};

  ultimasPromociones: any[] = [];

  constructor(
    private promocionService: PromocionService,

    private authService: AuthService,

    private cdr: ChangeDetectorRef,

    private router: Router
  ) {}

  // Se ejecuta cuando el componente se inicializa
  ngOnInit() {

    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarDatos();
  }

  cargarDatos() {

    // Obtenemos promociones desde el signal del servicio
    const data = this.promocionService.promociones();

    // Total de promociones
    this.totalPromociones = data.length;

    // Reset de contadores antes de recalcular
    this.promoActivas = 0;
    this.promoInactivas = 0;
    this.categorias = {};

    // Recorremos todas las promociones para calcular estadísticas
    for (let promo of data) {

      // Contamos activas e inactivas
      if (promo.activa) {
        this.promoActivas++;
      } else {
        this.promoInactivas++;
      }

      // Contamos promociones por categoría
      if (this.categorias[promo.categoria]) {
        this.categorias[promo.categoria]++;
      } else {
        this.categorias[promo.categoria] = 1;
      }
    }

    this.ultimasPromociones = data.slice(-2).reverse();

    this.cdr.markForCheck();

    setTimeout(() => {
      this.crearGrafica();
      this.crearGraficaBar();
    }, 100);
  }

  crearGrafica() {

    if (this.pieChart) {

      new Chart(this.pieChart.nativeElement, {
        type: 'pie',

        data: {
          labels: ['Activas', 'Inactivas'],
          datasets: [{
            data: [this.promoActivas, this.promoInactivas],
            backgroundColor: ['#10b981', '#ef4444']
          }]
        }
      });
    }
  }

  crearGraficaBar() {

    if (this.barChart) {

      const labels = Object.keys(this.categorias);
      const valores = Object.values(this.categorias);

      const colores = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

      new Chart(this.barChart.nativeElement, {
        type: 'bar',

        data: {
          labels: labels,
          datasets: [{
            label: 'Promociones',
            data: valores,
            backgroundColor: colores,
            borderColor: colores,
          }]
        },

        options: {
          plugins: {
            legend: {
              display: false
            }
          },

          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }
}
