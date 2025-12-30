# KAIROS - Precision Ski Fitting

Sistema premium de optimización de configuración de equipos de esquí con diseño "Dark Luxury Tech", construido con **Vite** para desarrollo moderno y rápido.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ y npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo Vite en `http://localhost:3000` con:
- ⚡ **Hot Module Replacement (HMR)** - Cambios instantáneos sin recargar
- 🔥 **Fast Refresh** - Recarga rápida del navegador
- 📦 **ES Modules nativos** - Sin bundling en desarrollo

### Build para Producción

```bash
npm run build
```

Genera archivos optimizados en la carpeta `dist/` con:
- Minificación de código
- Optimización de assets
- Source maps para debugging

### Preview del Build

```bash
npm run preview
```

Sirve la versión de producción localmente para probar antes de desplegar.

## 🛠️ Stack Tecnológico

- **Vite 7.3** - Build tool ultra rápido con HMR
- **Bootstrap 5.3** - Framework CSS (via CDN)
- **Font Awesome 6** - Iconos elegantes (via CDN)
- **Google Fonts** - Syne (títulos) e Inter (cuerpo)
- **Vanilla JavaScript ES6+** - Módulos ES6 nativos
- **CSS Custom Properties** - Variables CSS para temas

## 📁 Estructura del Proyecto (Optimizada para Vite)

```
KAIROS/
├── index.html          # Punto de entrada HTML (Vite lo procesa)
├── src/
│   ├── main.js        # JavaScript principal (importa CSS)
│   └── style.css      # Estilos Dark Luxury Tech
├── package.json        # Dependencias y scripts npm
├── vite.config.js     # Configuración de Vite
├── dist/              # Build de producción (generado)
└── README.md          # Este archivo
```

### Características de Vite

- **Importación de CSS en JS**: Los estilos se importan directamente en `main.js`
- **ES Modules**: Todo el código usa módulos ES6 nativos
- **Hot Reload**: Cambios instantáneos durante desarrollo
- **Optimización automática**: Vite optimiza automáticamente en build

## 🎨 Diseño

### Paleta de Colores (Dark Luxury Tech)

- **Fondo Principal**: `#0F172A` (Deep Slate)
- **Tarjetas/Contenedores**: `#1E293B` (Slate claro) con glassmorphism
- **Acento Principal**: `#38BDF8` (Cyan Eléctrico)
- **Texto**: `#F1F5F9` (Blanco Hueso)

### Características de Diseño

- ✨ **Glassmorphism** - Efectos de vidrio esmerilado en contenedores
- 🌟 **Efectos Neón** - Glow cyan en inputs y elementos interactivos
- 🔤 **Tipografía Premium** - Syne para logo/títulos, Inter para cuerpo
- 🎯 **UI Minimalista** - Diseño limpio orientado a usuarios jóvenes de alto poder adquisitivo

## 💻 Desarrollo

### Estructura del Código

El código está modularizado para facilitar el mantenimiento:

- **`appState`**: Objeto centralizado para el estado de la aplicación
- **`converters`**: Funciones puras para conversión de unidades
- **Funciones de setup**: Cada funcionalidad tiene su propia función de inicialización
- **ES6 Modules**: Todo el código usa import/export nativos

### Agregar Nuevas Funcionalidades

1. Crea funciones en `src/main.js` siguiendo el patrón existente
2. Importa cualquier CSS adicional en `main.js`
3. Vite manejará automáticamente el hot reload

## ✨ Características

- 🎨 Diseño Dark Luxury Tech con glassmorphism
- 📱 Totalmente responsive
- 🔄 Conversión automática de unidades (CM/FT, KG/LBS)
- 💫 Efectos glow neón en elementos interactivos
- 🎯 Interfaz intuitiva y moderna
- ⚡ Hot-reload instantáneo con Vite
- 🚀 Build optimizado para producción
- 🎭 Animaciones suaves y transiciones premium
- 📦 Código modular y mantenible

## 🔧 Configuración de Vite

El archivo `vite.config.js` incluye:

- Puerto personalizado (3000)
- Auto-apertura del navegador
- Source maps habilitados
- Minificación con Terser
- Optimización de CSS

## 📝 Licencia

MIT

---

**Desarrollado con ❄️ para esquiadores exigentes**
