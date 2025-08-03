# 🏠 HostMate - Tu Asistente Digital para Alquileres Temporales

HostMate es una aplicación web moderna diseñada para propietarios de alquileres temporales que desean automatizar la atención al cliente mediante inteligencia artificial. La aplicación permite configurar propiedades, gestionar conversaciones con huéspedes y optimizar la experiencia de reserva.

## ✨ Características Principales

### 🤖 Chatbot Inteligente

- **Respuestas Automáticas**: El chatbot responde automáticamente a preguntas frecuentes de los huéspedes
- **Información Personalizada**: Utiliza datos específicos de cada propiedad para dar respuestas precisas
- **Múltiples Idiomas**: Soporte para español, inglés y portugués
- **Personalidad Configurable**: Ajusta el tono del chatbot (amigable, profesional, casual)

### 🏡 Gestión de Propiedades

- **Configuración Detallada**: Información completa de cada propiedad
- **Importación desde URLs**: Extrae automáticamente datos de Booking.com, Airbnb, VRBO y Expedia
- **Horarios Personalizados**: Configuración de check-in/check-out
- **Amenidades y Reglas**: Lista completa de servicios y normas de la propiedad

### 💬 Gestión de Conversaciones

- **Historial Completo**: Todas las conversaciones con huéspedes
- **Búsqueda y Filtros**: Encuentra conversaciones específicas fácilmente
- **Estados de Conversación**: Seguimiento del estado de cada interacción
- **Respuestas Rápidas**: Acceso a respuestas predefinidas

### ⚙️ Configuración Avanzada

- **Integraciones**: Conecta con WhatsApp, Telegram y chat web
- **Notificaciones**: Configura alertas por email y push
- **Seguridad**: Autenticación de dos factores y gestión de sesiones
- **APIs**: Configuración de claves de API para servicios externos

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilos**: Tailwind CSS
- **Rutas**: React Router DOM
- **Iconos**: Lucide React
- **Build Tool**: Vite
- **Lenguaje**: TypeScript

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd Hostmate
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

## 🎯 Cómo Usar HostMate

### 1. Dashboard Principal

- **Vista General**: Estadísticas de conversaciones y reservas
- **Acciones Rápidas**: Acceso directo a funciones principales
- **Estado del Sistema**: Monitoreo del chatbot y servicios

### 2. Configuración de Propiedades

- **Agregar Propiedad**: Crea una nueva propiedad manualmente
- **Importar desde URL**: Extrae datos automáticamente desde plataformas de reserva
- **Editar Información**: Modifica detalles, horarios, WiFi, reglas, etc.

### 3. Chatbot Simulator

- **Probar Respuestas**: Simula conversaciones con huéspedes
- **Preguntas Rápidas**: Botones para preguntas frecuentes
- **Respuestas en Tiempo Real**: Ve cómo responde el chatbot

### 4. Gestión de Conversaciones

- **Ver Historial**: Todas las conversaciones con huéspedes
- **Buscar y Filtrar**: Encuentra conversaciones específicas
- **Detalles Completos**: Información detallada de cada interacción

### 5. Configuración del Sistema

- **Chatbot**: Configura comportamiento y personalidad
- **Notificaciones**: Email, push y sonidos
- **Integraciones**: WhatsApp, Telegram, chat web
- **Seguridad**: Autenticación y sesiones
- **APIs**: Configuración de servicios externos

## 🔧 Funcionalidades Avanzadas

### Importación de Propiedades

HostMate puede extraer automáticamente información de propiedades desde:

- **Booking.com**: Hoteles y apartamentos
- **Airbnb**: Alojamientos compartidos
- **VRBO**: Propiedades vacacionales
- **Expedia**: Hoteles y resorts

**Cómo usar:**

1. Ve a "Configuración de Propiedades"
2. Haz clic en "Importar desde URL"
3. Pega la URL de la propiedad
4. Revisa y edita los datos extraídos
5. Guarda la propiedad

### Configuración del Chatbot

- **Idioma**: Español, inglés, portugués
- **Personalidad**: Amigable, profesional, casual
- **Tiempo de Respuesta**: Configuración de latencia
- **Respuestas Personalizadas**: Basadas en datos de la propiedad

## 📱 Interfaz de Usuario

### Diseño Responsive

- **Desktop**: Interfaz completa con sidebar
- **Tablet**: Adaptación automática
- **Mobile**: Navegación optimizada

### Tema y Colores

- **Paleta Principal**: Azules profesionales
- **Paleta Secundaria**: Grises elegantes
- **Tipografía**: Inter (moderna y legible)

## 🔒 Seguridad y Privacidad

- **Autenticación**: Sistema de login seguro
- **Datos Encriptados**: Información sensible protegida
- **Sesiones**: Gestión automática de sesiones
- **APIs Seguras**: Configuración segura de servicios externos

## 🚀 Despliegue

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm run preview
```

### Variables de Entorno

Crea un archivo `.env.local`:

```env
VITE_API_URL=https://tu-api.com
VITE_OPENAI_API_KEY=tu-clave-api
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: soporte@hostmate.com
- **Documentación**: [docs.hostmate.com](https://docs.hostmate.com)
- **Issues**: [GitHub Issues](https://github.com/hostmate/issues)

## 🗺️ Roadmap

### Próximas Funcionalidades

- [ ] **Sincronización con Calendarios**: Integración con Google Calendar
- [ ] **Análisis de Conversaciones**: Insights y métricas
- [ ] **Respuestas Multimodales**: Soporte para imágenes y archivos
- [ ] **Integración con PMS**: Conectores con sistemas de gestión
- [ ] **App Móvil**: Versión nativa para iOS y Android

### Mejoras Técnicas

- [ ] **Backend API**: Servidor Node.js/Express
- [ ] **Base de Datos**: PostgreSQL con Prisma
- [ ] **Autenticación**: JWT con refresh tokens
- [ ] **WebSockets**: Comunicación en tiempo real
- [ ] **Testing**: Jest y React Testing Library

**HostMate** - Transformando la gestión de alquileres temporales con IA 🤖✨
