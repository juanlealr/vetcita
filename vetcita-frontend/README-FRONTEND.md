# Vetcita Frontend

Frontend en Angular para la aplicación Vetcita - Plataforma de servicios veterinarios.

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Panel principal después de autenticarse
│   │   ├── login/              # Formulario de inicio de sesión
│   │   ├── register/           # Formulario de registro
│   │   ├── forgot-password/    # Solicitar recuperación de contraseña
│   │   ├── reset-password/     # Restablecer contraseña
│   │   └── home/               # Componente de inicio que redirecciona
│   ├── services/
│   │   └── auth.service.ts     # Servicio de autenticación
│   ├── interceptors/
│   │   └── auth.interceptor.ts # Interceptor para agregar JWT a las peticiones
│   ├── guards/
│   │   └── auth.guard.ts       # Guard para proteger rutas
│   ├── app.ts                  # Componente raíz
│   ├── app.routes.ts           # Configuración de rutas
│   ├── app.config.ts           # Configuración de la aplicación
│   └── app.html/css            # Templates y estilos
├── main.ts                      # Punto de entrada
├── index.html                   # HTML principal
└── styles.css                   # Estilos globales (Tailwind CSS)
```

## Funcionalidades Implementadas

### Autenticación
- ✅ **Registro**: Crear nueva cuenta con validación de datos
- ✅ **Login**: Iniciar sesión con email y contraseña
- ✅ **Recuperación de contraseña**: Solicitar enlace de reset
- ✅ **Reset de contraseña**: Cambiar contraseña con token

### Seguridad
- ✅ **JWT Token**: Almacenamiento en localStorage
- ✅ **Auth Interceptor**: Agrega automáticamente el token a las peticiones
- ✅ **Auth Guard**: Protege las rutas que requieren autenticación
- ✅ **Rutas Públicas y Privadas**: Separación clara de acceso

### UI/UX
- ✅ **Diseño responsivo** con Tailwind CSS
- ✅ **Validación en tiempo real** de formularios
- ✅ **Mensajes de error y éxito**
- ✅ **Carga de estados** en botones
- ✅ **Dashboard** con elementos interactivos

## Configuración

### Requisitos
- Node.js 18+
- npm 11+
- Angular 21.2.0

### Instalación

```bash
# Navegar al directorio del frontend
cd vetcita/vetcita-frontend

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# La aplicación estará disponible en: http://localhost:4200
```

### Compilación

```bash
# Build para producción
npm run build

# Archivos generados en: dist/vetcita-frontend/
```

## Variables de Entorno

El backend se configura con la URL:
```
http://localhost:8080/api/auth
```

Si necesitas cambiar esta URL, edita el archivo `src/app/services/auth.service.ts`:
```typescript
private readonly API_URL = 'http://localhost:8080/api/auth';
```

## Flujo de Autenticación

1. **Registro**: El usuario proporciona datos → Se crea cuenta → Recibe JWT
2. **Login**: Email y contraseña → Recibe JWT → Se guarda en localStorage
3. **Peticiones**: El interceptor agrega automáticamente el JWT al header `Authorization: Bearer <token>`
4. **Dashboard**: Solo accesible con JWT válido (protegido por authGuard)
5. **Logout**: Se elimina el JWT → Se redirecciona a login
6. **Recuperación**: Email → Token de recuperación → Nuevo password

## Endpoints Consumidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/forgot-password` | Solicitar reset de contraseña |
| POST | `/api/auth/reset-password` | Restablecer contraseña |

## DTOs Esperados

### RegisterRequestDTO
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  identificationType: string;  // CC, CE, PP
  identificationNumber: string;
}
```

### LoginRequestDTO
```typescript
{
  email: string;
  password: string;
}
```

### ForgotPasswordRequestDTO
```typescript
{
  email: string;
}
```

### ResetPasswordRequestDTO
```typescript
{
  token: string;
  password: string;
  confirmPassword: string;
}
```

### AuthResponseDTO
```typescript
{
  token: string;
}
```

## Próximos Pasos (Funcionalidades Sugeridas)

- [ ] Componente de gestión de mascotas
- [ ] Componente de agendamiento de citas
- [ ] Historial médico
- [ ] Sistema de pagos/facturación
- [ ] Perfil de usuario editable
- [ ] Notificaciones
- [ ] Chat con veterinarios
- [ ] Upload de documentos

## Notas Importantes

- El token JWT se almacena en `localStorage` bajo la clave `auth_token`
- El interceptor agrega automáticamente el header de autorización a todas las peticiones
- Al cerrar sesión, se elimina el token del localStorage
- Las rutas protegidas redireccionan a login si no hay autenticación
- El backend debe estar ejecutándose en `localhost:8080`

## Troubleshooting

### CORS Errors
Si ves errores de CORS, asegúrate de que el backend esté configurado para permitir requests desde `http://localhost:4200`

### Token Expirado
Los tokens JWT tienen una duración configurada en el backend. Si expira, el usuario debe iniciar sesión nuevamente.

### LocalStorage
Si tienes problemas con el almacenamiento, verifica que localStorage esté habilitado en el navegador.
