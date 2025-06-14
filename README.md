# 🛡️ LicitaSeguro - Portal de Licitaciones Públicas

> Portal web moderno para consultar licitaciones públicas de Chile a través de la API oficial de Mercado Público.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🚀 Demo](#-demo)
- [💻 Tecnologías](#-tecnologías)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛠️ Instalación](#️-instalación)
- [📖 Uso](#-uso)
- [🎨 Capturas de Pantalla](#-capturas-de-pantalla)
- [🔧 API](#-api)
- [🤝 Contribuir](#-contribuir)
- [📝 Licencia](#-licencia)
- [👥 Autores](#-autores)

## 🎯 Características

### ✨ Funcionalidades Principales
- **🔍 Búsqueda de Licitaciones**: Busca licitaciones por fecha y estado
- **🏢 Consulta de Proveedores**: Busca información de proveedores por RUT
- **📄 Detalles Completos**: Visualiza información detallada de cada licitación
- **📱 Diseño Responsivo**: Optimizado para todos los dispositivos

### 🎨 Experiencia de Usuario
- **⚡ Formateo Automático**: Fecha (DD/MM/YYYY) y RUT (12.345.678-9) se formatean automáticamente
- **🎯 Validación en Tiempo Real**: Validaciones instantáneas con feedback visual
- **🌈 Estados Visuales**: Badges de colores para diferentes estados de licitaciones
- **🔄 Estados de Carga**: Spinners y mensajes informativos durante las consultas
- **📍 Navegación Clara**: Breadcrumbs y navbar consistente en todas las páginas

### 🔧 Características Técnicas
- **🚫 Sin Dependencias**: Solo HTML, CSS, JavaScript y Bootstrap
- **🌐 API Oficial**: Integración con la API de Mercado Público de Chile
- **♿ Accesibilidad**: Diseño accesible con ARIA labels y navegación por teclado
- **🎭 Animaciones Suaves**: Transiciones y efectos visuales profesionales

## 🚀 Demo

Puedes ver el proyecto en funcionamiento abriendo `index.html` en tu navegador.

### 🖥️ Páginas Disponibles
- **Inicio**: `index.html` - Landing page con información del proyecto
- **Licitaciones**: `licitaciones.html` - Búsqueda y listado de licitaciones
- **Proveedores**: `proveedor.html` - Búsqueda de proveedores por RUT
- **Detalle**: `detalle.html` - Información detallada de licitaciones

## 💻 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | - | Estructura semántica |
| **CSS3** | - | Estilos y animaciones |
| **JavaScript ES6+** | - | Lógica de la aplicación |
| **Bootstrap** | 5.3.0 | Framework CSS responsivo |
| **Bootstrap Icons** | 1.10.0 | Iconografía consistente |

## 📁 Estructura del Proyecto

```
Licitaseguros/
├── 📄 index.html          # Landing page principal
├── 📄 licitaciones.html   # Página de búsqueda de licitaciones
├── 📄 proveedor.html      # Página de búsqueda de proveedores
├── 📄 detalle.html        # Página de detalle de licitaciones
├── 🎨 style.css           # Estilos principales
├── ⚡ script.js           # Lógica JavaScript
└── 📚 README.md           # Documentación del proyecto
```

## 🛠️ Instalación

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para Bootstrap CDN y API)

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/licitaseguro.git
   cd licitaseguro
   ```

2. **Abre el proyecto**
   ```bash
   # Opción 1: Abrir directamente en el navegador
   open index.html
   
   # Opción 2: Usar un servidor local (recomendado)
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   ```

3. **Accede a la aplicación**
   - Directo: `file:///path/to/index.html`
   - Con servidor: `http://localhost:8000`

## 📖 Uso

### 🔍 Buscar Licitaciones

1. Ve a la página de **Licitaciones**
2. Ingresa la fecha en formato DD/MM/YYYY (se formatea automáticamente)
3. Selecciona el estado de la licitación
4. Haz clic en **Buscar**
5. Explora los resultados y haz clic en **Ver detalle** para más información

### 🏢 Consultar Proveedores

1. Ve a la página de **Proveedores**
2. Ingresa el RUT (se formatea automáticamente a 12.345.678-9)
3. Haz clic en **Buscar Proveedor**
4. Revisa la información detallada del proveedor

### 📊 Estados de Licitaciones

| Estado | Color | Descripción |
|--------|-------|-------------|
| 🟢 **Publicada/Abierta** | Verde | Licitación activa |
| 🟡 **Cerrada/Finalizada** | Amarillo | Plazo cerrado |
| 🔵 **Adjudicada** | Azul | Proceso completado |
| 🔴 **Desierta/Revocada** | Rojo | Sin adjudicar |
| ℹ️ **Otros** | Info | Estados diversos |

## 🎨 Capturas de Pantalla

### 🏠 Landing Page
- Hero section con gradiente moderno
- Estadísticas destacadas
- Call-to-action prominentes
- Sección de características

### 🔍 Búsqueda de Licitaciones
- Formulario intuitivo con validaciones
- Tabla responsive con animaciones
- Estados de carga profesionales
- Navegación clara con breadcrumbs

### 🏢 Consulta de Proveedores
- Formateo automático de RUT
- Tarjetas informativas detalladas
- Estados de error amigables
- Sección de ayuda contextual

## 🔧 API

### Endpoints Utilizados

**Mercado Público API**
- **Base URL**: `https://api.mercadopublico.cl/servicios/v1/`
- **Licitaciones**: `/publico/licitaciones.json`
- **Proveedores**: `/Publico/Empresas/BuscarProveedor`

### Parámetros de Consulta

**Licitaciones**
```javascript
{
  fecha: "13062025",        // Formato: ddmmyyyy
  estado: "publicada",      // Estados: publicada, cerrada, adjudicada, etc.
  ticket: "API_TICKET"      // Ticket de autenticación
}
```

**Proveedores**
```javascript
{
  rutempresaproveedor: "12.345.678-9",  // RUT con formato
  ticket: "API_TICKET"                   // Ticket de autenticación
}
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### 🐛 Reportar Bugs

Para reportar bugs, abre un [issue](https://github.com/tuusuario/licitaseguro/issues) con:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Capturas de pantalla (si aplica)

### 💡 Sugerir Mejoras

Para sugerir mejoras:
- Abre un [issue](https://github.com/tuusuario/licitaseguro/issues) con la etiqueta `enhancement`
- Describe la mejora propuesta
- Explica por qué sería útil

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Adolfo Campos & Yerko Guerra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👥 Autores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/adolfocampos">
        <img src="https://github.com/adolfocampos.png" width="100px;" alt="Adolfo Campos"/>
        <br />
        <sub><b>Adolfo Campos</b></sub>
      </a>
      <br />
      <a href="https://github.com/tuusuario/licitaseguro/commits?author=adolfocampos" title="Code">💻</a>
      <a href="#design-adolfocampos" title="Design">🎨</a>
    </td>
    <td align="center">
      <a href="https://github.com/yerkoguerra">
        <img src="https://github.com/yerkoguerra.png" width="100px;" alt="Yerko Guerra"/>
        <br />
        <sub><b>Yerko Guerra</b></sub>
      </a>
      <br />
      <a href="https://github.com/tuusuario/licitaseguro/commits?author=yerkoguerra" title="Code">💻</a>
      <a href="#ideas-yerkoguerra" title="Ideas">🤔</a>
    </td>
  </tr>
</table>

### 📞 Contacto

- **Adolfo Campos** - [@adolfocampos](https://github.com/adolfocampos)
- **Yerko Guerra** - [@yerkoguerra](https://github.com/yerkoguerra)

---

## 🙏 Agradecimientos

- [Bootstrap](https://getbootstrap.com/) por el framework CSS
- [Bootstrap Icons](https://icons.getbootstrap.com/) por la iconografía
- [Mercado Público](https://www.mercadopublico.cl/) por la API de datos abiertos
- [MDN Web Docs](https://developer.mozilla.org/) por la documentación

---

<div align="center">
  <p>⭐ ¡No olvides dar una estrella si te gustó el proyecto! ⭐</p>
  <p>Hecho con ❤️ por Adolfo Campos & Yerko Guerra</p>
</div>
