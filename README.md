# NutriMenu UCAB 🍽️

Sistema de notificaciones interactivo para optimizar el consumo de alimentos en los restaurantes y ferias de la UCAB, implementando tres aspectos clave de programación: **POA** (Logging), **POE** (Eventos), y **PA** (Procesos Asíncronos).

## 📋 Descripción del Proyecto

NutriMenu UCAB es una aplicación web full-stack que conecta a los proveedores de alimentos de la universidad con la comunidad estudiantil, facilitando:

- 📢 Notificaciones de menús disponibles
- 🔥 Alertas de ofertas flash
- ⚠️ Avisos de stock bajo
- 🪑 Verificación de disponibilidad de mesas en tiempo real

### Aspectos Implementados

#### 🔍 POA - Programación Orientada a Aspectos (Logging de Auditoría)
- Registro automático de cada publicación de menú
- Logs almacenados en `backend/logs/audit.log`
- Formato: `[AUDITORÍA] {restaurant} publicó menú "{dish}" a las {time}`
- Implementado con **Winston**

#### 📅 POE - Programación Orientada a Eventos (Notificaciones Automáticas)
- Scheduler que dispara eventos en horarios clave:
  - **12:00 PM**: Notificaciones de almuerzo
  - **4:00 PM**: Ofertas flash
- Monitoreo continuo de stock bajo
- Implementado con **node-cron** y **EventEmitter**

#### ⏳ PA - Proceso Asíncrono (Verificación de Capacidad)
- Simulación de API de sensores con delay de 2 segundos
- Verificación de mesas disponibles sin congelar la interfaz
- Mensajes: "Verificando mesas..." → "Local con disponibilidad" / "Local lleno, pide para llevar"

## 🚀 Stack Tecnológico

### Frontend
- **React** 18 + **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router** (navegación)
- **Axios** (HTTP client)
- **Lucide React** (iconos)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Winston** (logging - POA)
- **node-cron** (scheduler - POE)
- **CORS** (comunicación frontend-backend)

## 📁 Estructura del Proyecto

```
NutriMenuUcab/
├── frontend/
│   ├── src/
│   │   ├── components/       # MenuCard, NotificationList, CapacityChecker
│   │   ├── pages/            # Dashboard, RestaurantPanel
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript interfaces
│   │   ├── data/             # Simulated data
│   │   └── App.tsx
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/      # menuController.ts
    │   ├── routes/           # menuRoutes.ts
    │   ├── services/
    │   │   ├── poa/          # auditLogger.ts (Winston)
    │   │   ├── poe/          # notificationScheduler.ts (node-cron)
    │   │   └── pa/           # capacityChecker.ts (async)
    │   ├── types/            # TypeScript interfaces
    │   ├── data/             # menuData.ts (in-memory storage)
    │   └── server.ts
    ├── logs/                 # audit.log (POA)
    └── package.json
```

## 🛠️ Instalación y Configuración

### 🐳 Ejecución con Docker (Recomendado)

1. **Asegúrate de tener Docker y Docker Compose instalados.**
2. **Construir y levantar los contenedores:**
   ```bash
   docker-compose up --build
   ```
3. **Acceder a la aplicación:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

### 🛠️ Configuración Manual

### Prerrequisitos
- Node.js 18+ y npm

### 1. Clonar el repositorio
```bash
cd NutriMenuUcab
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará corriendo en `http://localhost:3000`

### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

## 🌐 Navegación

- **Vista Estudiante**: `http://localhost:5173/` - Ver menús publicados y notificaciones
- **Vista Restaurante**: `http://localhost:5173/restaurant` - Publicar menús y gestionar ofertas

## 📡 API Endpoints

### Menús
- `GET /api/menus` - Obtener todos los menús
- `POST /api/menus/:id/publish` - Publicar un menú (activa POA)
- `GET /api/menus/:id/capacity` - Verificar capacidad (PA - 2s delay)

### Notificaciones
- `GET /api/notifications` - Obtener notificaciones recientes (POE)

### Health Check
- `GET /health` - Estado del servidor

## 🧪 Verificación de Aspectos

### POA - Audit Logging
1. Ir a la vista de restaurante (`/restaurant`)
2. Publicar un menú
3. Verificar logs en `backend/logs/audit.log`
4. Ver salida en consola del backend

**Ejemplo de log:**
```
2026-01-09 02:30:15 [INFO] [AUDITORÍA] Feria UCAB - Local A publicó menú "Pabellón Criollo Nutritivo" a las 02:30 PM
```

### POE - Event Scheduler
1. Iniciar el backend
2. Esperar a las 12:00 PM o 4:00 PM (o modificar el cron para testing)
3. Ver notificaciones automáticas en consola
4. Verificar en frontend (`/`) que aparecen las notificaciones

**Ejemplo de salida:**
```
🔔 [POE] Nueva notificación enviada a estudiantes:
   Tipo: menu
   Mensaje: ¡Ya puedes ver el menú de hoy en NutriMenu! Feria UCAB - Local A: Pabellón Criollo Nutritivo. Quedan 15 raciones.
   Hora: 12:00:00
```

### PA - Async Capacity Checker
1. En cualquier vista, hacer clic en "Verificar Disponibilidad"
2. Observar mensaje "Verificando mesas..." durante 2 segundos
3. Ver resultado: "Local con disponibilidad" o "Local lleno, pide para llevar"
4. La interfaz NO se congela durante la espera

## 🎨 Características de UI

- ✨ Diseño moderno con Tailwind CSS
- 🎨 Colores institucionales de UCAB
- 📱 Responsive design
- 🔔 Notificaciones con badges
- ⏳ Estados de carga (loading states)
- 🎯 Indicadores visuales de stock (colores)
- 🏷️ Categorías de menús (almuerzo, saludable, snack)

## 📊 Dataset Simulado

El proyecto incluye 4 menús de ejemplo:
- **Feria UCAB - Local A**: Pabellón Criollo Nutritivo ($4.50)
- **Nico Módulo 4**: Bowl Vegano de Granos ($3.75)
- **Cafetín Cincuentenario**: Sandwich Integral de Pavo ($2.00)
- **Solarium Módulo 2**: Ensalada César con Pollo ($5.00)

## 🎯 Objetivos de Desarrollo Sostenible

- **ODS 3** (Salud y Bienestar): Información nutricional clara
- **ODS 12** (Producción y Consumo Responsables): Reducción de desperdicio alimentario

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

### Backend
```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar TypeScript
npm start        # Producción
```

## 📝 Notas de Desarrollo

- Los logs de auditoría se crean automáticamente en `backend/logs/`
- El scheduler de POE está configurado para 12:00 PM y 4:00 PM
- Para testing, puedes modificar los cron schedules en `notificationScheduler.ts`
- Los datos son simulados y se almacenan en memoria (se reinician al reiniciar el servidor)

## 🤝 Contribución

Este proyecto fue desarrollado como parte del curso de Programación Avanzada en la UCAB.

## 📄 Licencia

ISC

---

**Desarrollado con ❤️ para la comunidad UCAB**