import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- Navigation -->
      <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">Vetcita</h1>
          <button
            (click)="logout()"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Bienvenido a Vetcita</h2>
            <p class="text-gray-600">Tu plataforma para gestionar servicios veterinarios</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <!-- Card Template -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition">
              <div class="text-4xl mb-4">🐾</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Mis Mascotas</h3>
              <p class="text-gray-600 mb-4">Gestiona la información de tus mascotas</p>
              <button class="text-blue-600 hover:text-blue-700 font-medium">
                Ver más →
              </button>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 hover:shadow-lg transition">
              <div class="text-4xl mb-4">📅</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Citas</h3>
              <p class="text-gray-600 mb-4">Agenda o consulta tus citas veterinarias</p>
              <button class="text-green-600 hover:text-green-700 font-medium">
                Ver más →
              </button>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 hover:shadow-lg transition">
              <div class="text-4xl mb-4">💊</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Historial Médico</h3>
              <p class="text-gray-600 mb-4">Consulta el historial de tus mascotas</p>
              <button class="text-purple-600 hover:text-purple-700 font-medium">
                Ver más →
              </button>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 hover:shadow-lg transition">
              <div class="text-4xl mb-4">💰</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Facturación</h3>
              <p class="text-gray-600 mb-4">Consulta tus facturas y pagos</p>
              <button class="text-orange-600 hover:text-orange-700 font-medium">
                Ver más →
              </button>
            </div>

            <div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 hover:shadow-lg transition">
              <div class="text-4xl mb-4">👤</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Mi Perfil</h3>
              <p class="text-gray-600 mb-4">Actualiza tu información personal</p>
              <button class="text-pink-600 hover:text-pink-700 font-medium">
                Ver más →
              </button>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 hover:shadow-lg transition">
              <div class="text-4xl mb-4">❓</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Ayuda</h3>
              <p class="text-gray-600 mb-4">Contacta con nuestro equipo de soporte</p>
              <button class="text-red-600 hover:text-red-700 font-medium">
                Ver más →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verify user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
