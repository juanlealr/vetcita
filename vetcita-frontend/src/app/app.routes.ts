import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/user/profile.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './core/guards/public-guard';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { PetFormComponent } from './components/pets/pet-form/pet-form.component';
import { PetListComponent } from './components/pets/pet-list/pet-list.component';
import { ScheduleAppointmentComponent } from './components/appointments/schedule-appointment.component'; 
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ClientListComponent } from './components/admin-clients/client-list.component';
import { ClientDetailComponent } from './components/admin-clients/client-detail.component';
import { ClientFormComponent } from './components/admin-clients/client-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'reset-password', 
    component: ResetPasswordComponent,
    canActivate: [publicGuard] 
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  
  // ==========================================
  // RUTAS DEL ADMINISTRADOR
  // ==========================================
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'clientes', component: ClientListComponent },
      { path: 'clientes/nuevo', component: ClientFormComponent },
      { path: 'clientes/editar/:id', component: ClientFormComponent },
      { path: 'clientes/:id', component: ClientDetailComponent },
      
      // { path: 'servicios', component: ServicesListComponent },
      // { path: 'veterinarios', component: VetListComponent },
      // { path: 'recepcionistas', component: ReceptionistListComponent },
    ]
  },

  // ==========================================
  // RUTAS DEL CLIENTE FINAL
  // ==========================================
  {
    path: 'client',
    component: ClientLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
      { path: 'citas', component: AppointmentsComponent },
      { path: 'mascotas', component: PetListComponent }, 
      { path: 'mascotas/nueva', component: PetFormComponent },
      { path: 'perfil', component: ProfileComponent },
      { path: 'agendar', component: ScheduleAppointmentComponent },
    ]
  },
  
  { path: '**', redirectTo: '' } 
];
