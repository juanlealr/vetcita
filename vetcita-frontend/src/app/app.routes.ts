import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/profile.component';
import { authGuard } from './guards/auth.guard';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { PetFormComponent } from './components/pets/pet-form/pet-form.component';
import { PetListComponent } from './components/pets/pet-list/pet-list.component';
import { ScheduleAppointmentComponent } from './components/appointments/schedule-appointment.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
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
      
      // { path: 'perfil', component: UserProfileComponent },
    ]
  },
  { path: '**', redirectTo: '' } 
];
