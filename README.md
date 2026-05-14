
## 🌟 Introducción
**SIRAN** es una solución tecnológica diseñada para transformar el cuidado neonatal. Nuestra aplicación permite a padres y profesionales de la salud monitorear en tiempo real los signos vitales críticos de los recién nacidos (Temperatura, Peso y Saturación de Oxígeno), proporcionando alertas tempranas basadas en rangos médicos para prevenir complicaciones de salud.

Este frontend ha sido desarrollado bajo estándares de Domain Driven desing, asegurando que el sistema sea escalable, mantenible y fácil de testear.

---

## 🛠️ Stack Tecnológico y Dependencias

El proyecto utiliza las últimas tecnologías del ecosistema de Angular:

- **Framework:** Angular 19+ (v21.2.9)
- **Lenguaje:** TypeScript
- **Estilos y UI:** Angular Material & CDK (v21.2.7) para componentes de diseño modular.
- **Estado y Reactividad:** RxJS (~7.8.0) para el manejo de flujos de datos asíncronos.
- **Traducción:** @ngx-translate para soporte multi-idioma.
- **Testing:** Vitest y JSDOM para pruebas unitarias rápidas y modernas.
- **Calidad de Código:** Prettier para un formato de código consistente.

---

## Arquitectura y Lógica de Organización

Hemos implementado una estructura basada en **Domain-Driven Design (DDD)** dividida por Bounded Contexts (como `healthrecord`). Cada contexto se organiza en las siguientes capas:

### 1. Domain (Dominio)
Es el "corazón" de la aplicación. Contiene la lógica de negocio pura sin dependencias externas.
- **Model:** Define las interfaces y entidades (ej. `HealthRecord`, `AlertRange`).
- **Service:** Contiene los casos de uso y lógica de evaluación (ej. `evaluateStatus` para determinar si un signo vital es peligroso).

### 2. Infrastructure (Infraestructura)
Se encarga de la comunicación con el exterior.
- **Repositories:** Implementa las llamadas a la API (JSON Server) utilizando `HttpClient`. Transforma los datos externos al formato que el Dominio entiende.

### 3. Presentation (Presentación)
Capa encargada de la interfaz de usuario.
- **Components:** Componentes Standalone (Angular modernos) con lógica de vista.
- **HTML/CSS:** Estructura y diseño profesional enfocado en la experiencia del usuario (UX).

### 4. Application (Aplicación)
Gestiona la orquestación del sistema, como las rutas de navegación (`monitoring.routes.ts`) y la configuración global.

---

## 📋 Historias de Usuario Implementadas

- **[HU01] Registro de Signos Vitales:** Formulario validado para temperatura, peso y SpO2.
- **[HU02] Historial Clínico:** Visualización cronológica de todos los registros capturados.
- **[HU07/HU08/HU10] Gestión de Acceso (IAM):** Flujo completo de Registro, Login y Logout con roles de Padre y Médico.
- **[HU12] Resumen de Salud:** Panel de visualización rápida del último estado detectado.
- **[HU17] Diseño Responsivo:** Interfaz adaptativa optimizada para escritorio y dispositivos móviles.
---

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
