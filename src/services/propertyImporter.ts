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

interface ImportResult {
  success: boolean;
  data?: PropertyData;
  error?: string;
}

export class PropertyImporterService {
  private static async fetchPageContent(url: string): Promise<string> {
    try {
      // En un entorno real, esto se haría desde el backend para evitar CORS
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("No se pudo acceder a la URL");
      }
      return await response.text();
    } catch (error) {
      console.error("Error fetching page:", error);
      throw new Error("No se pudo acceder a la página");
    }
  }

  private static extractBookingData(html: string): PropertyData {
    // Simulación de extracción de datos de Booking.com
    // En una implementación real, usarías selectores CSS o regex específicos

    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const addressMatch = html.match(/data-testid="address"[^>]*>([^<]+)</i);
    const descriptionMatch = html.match(
      /<meta[^>]*name="description"[^>]*content="([^"]+)"/i
    );

    return {
      name: nameMatch ? nameMatch[1].trim() : "Apartamento Importado",
      address: addressMatch
        ? addressMatch[1].trim()
        : "Dirección no disponible",
      description: descriptionMatch
        ? descriptionMatch[1].trim()
        : "Descripción no disponible",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      wifi: "WiFi disponible",
      parking: true,
      maxGuests: 4,
      rules: [
        "No fumar",
        "No mascotas",
        "Respetar a los vecinos",
        "Mantener limpio el apartamento",
      ],
      amenities: [
        "WiFi",
        "Aire acondicionado",
        "Cocina equipada",
        "TV",
        "Lavadora",
      ],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500",
      ],
      price: {
        base: 120,
        currency: "EUR",
      },
      platform: "Booking.com",
      originalUrl: "",
    };
  }

  private static extractAirbnbData(html: string): PropertyData {
    // Simulación de extracción de datos de Airbnb
    return {
      name: "Apartamento Airbnb",
      address: "Dirección Airbnb",
      description: "Hermoso apartamento en Airbnb",
      checkInTime: "16:00",
      checkOutTime: "10:00",
      wifi: "WiFi gratuito",
      parking: false,
      maxGuests: 2,
      rules: ["No fumar", "No fiestas", "Respetar el horario de silencio"],
      amenities: ["WiFi", "Cocina", "TV", "Calefacción"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
      ],
      price: {
        base: 100,
        currency: "EUR",
      },
      platform: "Airbnb",
      originalUrl: "",
    };
  }

  public static async importFromUrl(url: string): Promise<ImportResult> {
    try {
      // Validar URL
      const urlObj = new URL(url);

      // Detectar plataforma
      if (urlObj.hostname.includes("booking.com")) {
        const html = await this.fetchPageContent(url);
        const data = this.extractBookingData(html);
        data.originalUrl = url;
        return { success: true, data };
      } else if (urlObj.hostname.includes("airbnb.com")) {
        const html = await this.fetchPageContent(url);
        const data = this.extractAirbnbData(html);
        data.originalUrl = url;
        return { success: true, data };
      } else {
        return {
          success: false,
          error:
            "Plataforma no soportada. Solo se admiten Booking.com y Airbnb.",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Error al procesar la URL. Verifica que sea válida y accesible.",
      };
    }
  }

  // Método para simular la importación (para desarrollo)
  public static async simulateImport(url: string): Promise<ImportResult> {
    const platform = this.detectPlatform(url);
    if (!platform) {
      return {
        success: false,
        error:
          "URL no soportada. Solo se admiten Booking.com, Airbnb, VRBO y Expedia.",
      };
    }

    // Simular delay de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockData: PropertyData = {
      name: "Apartamento en el centro",
      address: "Calle Principal 123, Madrid, España",
      description:
        "Hermoso apartamento en el corazón de la ciudad con todas las comodidades.",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      wifi: "WiFi gratuito disponible",
      parking: true,
      maxGuests: 4,
      rules: [
        "No fumar",
        "No mascotas",
        "Respetar a los vecinos",
        "Mantener limpio el apartamento",
      ],
      amenities: [
        "WiFi",
        "Aire acondicionado",
        "Cocina equipada",
        "TV",
        "Lavadora",
      ],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500",
      ],
      price: {
        base: 120,
        currency: "EUR",
      },
      platform: platform,
      originalUrl: url,
    };

    return {
      success: true,
      data: mockData,
    };
  }

  private static detectPlatform(url: string): string | null {
    if (url.includes("booking.com")) return "Booking.com";
    if (url.includes("airbnb.com")) return "Airbnb";
    if (url.includes("vrbo.com")) return "VRBO";
    if (url.includes("expedia.com")) return "Expedia";
    return null;
  }
}
