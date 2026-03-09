import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Servicio disponible globalmente en la aplicación
})
export class AuthService {

  // URL de la API donde están los usuarios
  private apiUrl = 'https://promotracker-api.onrender.com/usuarios';

  // Inyectamos HttpClient para poder comunicarnos con la API
  constructor(private http: HttpClient) {}

  // Método login
  // Busca un usuario con el username y password en la API
  login(username: string, password: string): Observable<any[]> {

    // Petición GET con parámetros de búsqueda
    // JSON Server permite filtrar usando ?campo=valor
    return this.http.get<any[]>(
      `${this.apiUrl}?username=${username}&password=${password}`
    );
  }

  // Guarda el usuario en el almacenamiento del navegador
  // localStorage mantiene los datos incluso si se recarga la página
  guardarSesion(username: string) {
    localStorage.setItem('user', username);
  }

  // Verifica si hay un usuario guardado en localStorage
  // Devuelve true si hay sesión activa
  estaLogueado(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Cierra la sesión eliminando el usuario del localStorage
  cerrarSesion() {
    localStorage.removeItem('user');
  }

  // Devuelve el usuario actual logueado
  // Puede devolver string o null si no hay sesión
  getUsuarioActual(): string | null {
    return localStorage.getItem('user');
  }
}
