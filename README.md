# VetCita
Sistema integral de gestión veterinaria (citas, pacientes e historial clínico) construido con arquitectura de monolito modular usando Spring Boot (Modulith) y Angular.

VetCita es una aplicación integral diseñada para la administración eficiente de clínicas veterinarias. Permite la gestión de usuarios (Administradores, Recepcionistas, Veterinarios y Clientes), control de pacientes (mascotas), agendamiento de citas e historias clínicas.

Este proyecto está construido bajo una arquitectura de **Monolito Modular** para asegurar la escalabilidad y el bajo acoplamiento entre dominios de negocio.

## 🚀 Tecnologías (Stack Tecnológico)

**Backend:**
* Java 17 / 21
* Spring Boot 3.x
* Spring Modulith (Estructura modular)
* Spring Security + JWT (Autenticación Stateless)
* Spring Data JPA / Hibernate
* Maven

**Frontend:**
* Angular

**Base de Datos & DevOps:**
* PostgreSQL (Supabase)
* Docker & Docker Compose
* GitHub Actions (CI/CD)

## 📦 Estructura de Módulos (Spring Modulith)

El backend está dividido en los siguientes dominios de negocio:
1. `users`: Gestión de usuarios, roles y autenticación (Registro y Login).
2. `pets`: Registro y gestión de mascotas/pacientes *(Próximamente)*.
3. `appointments`: Agenda y gestión de citas veterinarias *(Próximamente)*.
4. `clinical`: Historial médico y diagnósticos *(Próximamente)*.

## 🛠️ Configuración y Ejecución Local

### Prerrequisitos
* Java JDK 17 o superior.
* Maven instalado.
* Docker (opcional, si usas base de datos local).
