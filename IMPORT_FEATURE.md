# Funcionalidad de Importación de Propiedades

## Descripción

La funcionalidad de importación de propiedades permite extraer automáticamente información de propiedades desde plataformas de reserva como Booking.com, Airbnb, VRBO y Expedia, utilizando solo la URL de la propiedad.

## Características

### ✅ Plataformas Soportadas

- **Booking.com** - Extracción de datos de hoteles y apartamentos
- **Airbnb** - Información de alojamientos compartidos
- **VRBO** - Propiedades vacacionales
- **Expedia** - Hoteles y resorts

### ✅ Datos Extraídos

- Nombre de la propiedad
- Dirección completa
- Descripción detallada
- Horarios de check-in/check-out
- Información de WiFi
- Disponibilidad de estacionamiento
- Capacidad máxima de huéspedes
- Reglas de la propiedad
- Amenidades disponibles
- Imágenes de la propiedad
- Información de precios

## Cómo Usar

### 1. Acceder a la Funcionalidad

1. Ve a la sección "Configuración de Propiedades"
2. Haz clic en el botón "Importar desde URL"
3. Se abrirá un modal con el importador

### 2. Importar una Propiedad

1. Copia la URL de la propiedad desde la plataforma de reserva
2. Pega la URL en el campo de entrada
3. Haz clic en "Importar"
4. Revisa los datos extraídos
5. Edita cualquier información si es necesario
6. Guarda la propiedad

### 3. Ejemplos de URLs Válidas

```
Booking.com: https://www.booking.com/hotel/es/example.html
Airbnb: https://www.airbnb.com/rooms/123456
VRBO: https://www.vrbo.com/123456
Expedia: https://www.expedia.com/hotel/example
```

## Implementación Técnica

### Frontend

- **Componente**: `PropertyImporter.tsx`
- **Servicio**: `propertyImporter.ts`
- **Integración**: `PropertySetup.tsx`

### Funcionalidades

- ✅ Detección automática de plataforma
- ✅ Validación de URLs
- ✅ Extracción simulada de datos
- ✅ Manejo de errores
- ✅ Interfaz de usuario intuitiva
- ✅ Modal responsive

### Estructura de Datos

```typescript
interface PropertyData {
  name: string;
  address: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  wifi: string;
  parking: boolean;
  maxGuests: number;
  rules: string[];
  amenities: string[];
  images: string[];
  price: {
    base: number;
    currency: string;
  };
  platform: string;
  originalUrl: string;
}
```

## Desarrollo Futuro

### 🔄 Implementación Real

Para una implementación en producción, se necesitaría:

1. **Backend API** para manejar web scraping
2. **Proxies** para evitar restricciones CORS
3. **Parsers específicos** para cada plataforma
4. **Rate limiting** para respetar los términos de servicio
5. **Cache** para evitar requests repetidos

### 🔄 APIs Oficiales

- **Booking.com API** - Para acceso oficial a datos
- **Airbnb API** - Para información de listings
- **VRBO API** - Para propiedades vacacionales

### 🔄 Características Adicionales

- Importación masiva de múltiples propiedades
- Sincronización automática de precios
- Actualización automática de disponibilidad
- Integración con calendarios de reservas
- Notificaciones de cambios en las propiedades

## Consideraciones Legales

⚠️ **Importante**: La extracción de datos debe cumplir con:

- Términos de servicio de cada plataforma
- Leyes de protección de datos (GDPR, etc.)
- Rate limiting y respeto por los servidores
- Políticas de robots.txt

## Estado Actual

### ✅ Implementado

- Interfaz de usuario completa
- Detección de plataformas
- Simulación de extracción de datos
- Integración con el sistema de propiedades
- Manejo de errores básico

### 🔄 En Desarrollo

- Implementación real de web scraping
- Backend API para extracción de datos
- Parsers específicos por plataforma
- Cache y optimización de performance

### 📋 Pendiente

- APIs oficiales de las plataformas
- Sincronización automática
- Importación masiva
- Notificaciones en tiempo real

## Uso en Producción

Para usar esta funcionalidad en producción, se recomienda:

1. **Implementar un backend robusto** con manejo de errores
2. **Usar APIs oficiales** cuando estén disponibles
3. **Implementar rate limiting** para respetar los términos de servicio
4. **Agregar logging** para monitorear el uso
5. **Implementar cache** para optimizar performance
6. **Agregar validación** de datos extraídos
7. **Implementar fallbacks** para cuando las APIs no estén disponibles

## Contribución

Para contribuir a esta funcionalidad:

1. Revisa las consideraciones legales
2. Implementa parsers específicos por plataforma
3. Agrega tests unitarios
4. Documenta nuevos métodos de extracción
5. Mantén la compatibilidad con el sistema existente
