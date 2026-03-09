import { Routes } from '@angular/router';
import { PromocionesList } from './componentes/promociones-list/promociones-list';
import { Dashboard } from './componentes/dashboard/dashboard';
import { Crear } from './componentes/crear/crear';
import { Index } from './componentes/index/index';
import { Privacidad } from './componentes/privacidad/privacidad';
import { Terminos } from './componentes/terminos/terminos';
import { Cookies } from './componentes/cookies/cookies';
import { Contacto } from './componentes/contacto/contacto';
import { Error404 } from './componentes/error404/error404';
import { Login } from './componentes/login/login';
import { Editar } from './componentes/editar/editar';




export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'promociones', component: PromocionesList },
  { path: 'crear', component: Crear },
  { path: 'index', component: Index },
  { path: 'privacidad', component: Privacidad },
  { path: 'terminos', component: Terminos },
  { path: 'contacto', component: Contacto },
  { path: 'cookies', component: Cookies },
  { path: 'error404', component: Error404 },
  { path: 'login',component: Login },
{
  path: 'editar/:id',
  component: Editar,
  title: 'Editar'
} , { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: 'error404' }
];
