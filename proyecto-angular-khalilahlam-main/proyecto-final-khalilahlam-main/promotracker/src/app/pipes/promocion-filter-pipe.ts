import { Pipe, PipeTransform } from '@angular/core';
import { Promocion } from '../interfaces/promocion';

@Pipe({
  name: 'promocionFilter',
})
export class PromocionFilterPipe implements PipeTransform {

  // Método principal del pipe
  // promociones → lista completa de promociones
  // searchText → texto del buscador
  // categoria → categoría seleccionada
  // soloActivas → filtro para mostrar solo activas
  transform(
    promociones: Promocion[],
    searchText: string,
    categoria: string,
    soloActivas: boolean
  ): Promocion[] {

    // Variable donde se guardará el resultado filtrado
    let resultado = promociones;

    // Filtro 1: Si hay texto de búsqueda
    // trim() elimina espacios en blanco al inicio y final
    if (searchText && searchText.trim() !== '') {
      // Convertimos a minúsculas para evitar problemas con mayúsculas/minúsculas
      const search = searchText.toLowerCase();

      // Filtramos por título o descripción
      resultado = resultado.filter(promo =>
        promo.title.toLowerCase().includes(search) ||
        promo.description.toLowerCase().includes(search)
      );
    }

    // Filtro 2: Si hay categoría seleccionada
    if (categoria && categoria !== '') {
      // Filtramos solo las promociones de esa categoría
      resultado = resultado.filter(promo =>
        promo.categoria === categoria
      );
    }

    // Filtro 3: Si soloActivas es true
    if (soloActivas) {
      // Mostramos solo promociones activas
      resultado = resultado.filter(promo => promo.activa === true);
    }

    // Devolvemos la lista filtrada
    return resultado;
  }

}
