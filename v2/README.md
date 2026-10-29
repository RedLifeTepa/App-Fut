# ⚽ LigaPro PWA — Plataforma de Administración de Liga de Fútbol (Firebase + GitHub)

Aplicación Web Progresiva (**PWA**) diseñada para administrar al 100% una liga de fútbol con sincronización en tiempo real en **Firebase (Firestore, Authentication, Cloud Messaging & Hosting)** y separación de entornos entre la **Vista Pública de Usuarios (`public/index.html`)** y la **Consola de Administración (`public/admin.html`)**.

---

## 🚀 Características Principales

1. **Vistas Independientes**:
   - **`/index.html` (Afición y Jugadores)**: Tabla general automática, carrusel de partidos en vivo, calendario filtrable por jornada/estadio/equipo, galería de clubes con escudos, instalación PWA y suscripción a notificaciones push.
   - **`/admin.html` (Consola de Administración)**: Acceso protegido por PIN (`2026` por defecto) o Firebase Auth. Permite crear/editar equipos, diseñar escudos vectoriales SVG o subir escudos en imagen (`PNG/JPG/SVG`), programar jornadas con fecha/hora/estadio/árbitro, capturar goles en vivo y disparar notificaciones Push.
2. **Motor de Tabla General 100% Automático**:
   - Calcula al instante **PJ, G, E, P, GF, GC, DG, PTS y Racha (Últimos 5)** a partir de los resultados de los partidos, evitando errores manuales de suma.
3. **Generador Automático de Rol de Juegos (Round-Robin)** + **Exportación a WhatsApp**.

---

## 🛠️ Guía Rápida para Subir a GitHub y Desplegar en Firebase (macOS / VS Code / GitHub Desktop)

### 1. Subir a GitHub con GitHub Desktop o Terminal
1. Descomprime este repositorio en tu carpeta de proyectos local.
2. Abre **GitHub Desktop** → `File` → `Add Local Repository...` y selecciona la carpeta `liga-futbol-pwa`.
3. Haz tu primer commit (`Initial commit: LigaPro PWA + Firebase`) y haz clic en **Publish repository**.

### 2. Conectar con tu Proyecto de Firebase
1. Entra a [Firebase Console](https://console.firebase.google.com/) y crea un proyecto (activa **Firestore Database**, **Authentication** y **Hosting**).
2. Copia tu objeto `firebaseConfig` desde *Configuración del Proyecto → Tus Apps (Web)*.
3. Pégalo directamente en `public/js/firebase-service.js` o desde el botón **Configurar Firebase** dentro de la aplicación.
4. Desde la terminal integrada de **VS Code**, despliega con:
   ```bash
   firebase login
   firebase use --add
   firebase deploy
   ```
