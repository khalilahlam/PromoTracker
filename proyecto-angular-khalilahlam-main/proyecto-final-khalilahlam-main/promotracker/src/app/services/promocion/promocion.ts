import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promocion } from '../../interfaces/promocion';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' // Servicio global disponible en toda la app
})
export class PromocionService {

  // URL de la API donde están las promociones (backend en Render)
  private apiUrl = 'https://promotracker-api.onrender.com/promociones';

  // Signal que almacena el estado reactivo de las promociones
  // Cuando cambia, los componentes se actualizan automáticamente
  promociones = signal<Promocion[]>([]);

  // Constructor donde se inyecta HttpClient
  // Se cargan las promociones al iniciar el servicio
  constructor(private http: HttpClient) {
    this.cargarPromociones().subscribe();
  }

  // Método GET → obtiene todas las promociones de la API
  // Devuelve un Observable con la lista de promociones
  cargarPromociones(): Observable<Promocion[]> {

    return this.http.get<Promocion[]>(this.apiUrl).pipe(
      // tap se usa para guardar los datos en el signal sin modificarlos
      tap(data => this.promociones.set(data))
    );
  }

  // Método POST → crea una nueva promoción
  addPromocion(promocion: Promocion) {

    // Enviamos la promoción a la API
    this.http.post<Promocion>(this.apiUrl, promocion).subscribe(() => {
      // Después de crear, recargamos la lista de promociones
      this.cargarPromociones().subscribe();
    });
  }

  // Método DELETE → elimina una promoción por su id
  deletePromocion(id: string) {

    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      // Recargamos la lista después de eliminar
      this.cargarPromociones().subscribe();
    });
  }

  // Método PUT → actualiza una promoción completa
  updatePromocion(promocion: Promocion) {

    this.http.put<Promocion>(
      `${this.apiUrl}/${promocion.id}`,
      promocion
    ).subscribe(() => {
      // Recargamos la lista después de actualizar
      this.cargarPromociones().subscribe();
    });
  }

  // Busca una promoción dentro del signal por su id
  // No hace llamada a la API, busca en memoria (más rápido)
  getPromocionById(id: string): Promocion | undefined {

    return this.promociones().find(p => p.id === id);
  }
}
