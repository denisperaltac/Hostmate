import { useState } from "react";
import { ExternalLink, Download, AlertCircle, CheckCircle } from "lucide-react";
import { PropertyImporterService } from "../services/propertyImporter";

interface PropertyImporterProps {
  onPropertyImported: (property: any) => void;
}

interface ImportResult {
  success: boolean;
  data?: any;
  error?: string;
}

export default function PropertyImporter({
  onPropertyImported,
}: PropertyImporterProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const supportedPlatforms = [
    { name: "Booking.com", pattern: /booking\.com/i, icon: "🏨" },
    { name: "Airbnb", pattern: /airbnb\.com/i, icon: "🏠" },
    { name: "VRBO", pattern: /vrbo\.com/i, icon: "🏡" },
    { name: "Expedia", pattern: /expedia\.com/i, icon: "✈️" },
  ];

  const detectPlatform = (url: string) => {
    return supportedPlatforms.find((platform) => platform.pattern.test(url));
  };

  const extractPropertyInfo = async (url: string): Promise<ImportResult> => {
    try {
      // Usar el servicio para importar la propiedad
      return await PropertyImporterService.simulateImport(url);
    } catch (error) {
      return {
        success: false,
        error: "Error al procesar la URL. Inténtalo de nuevo.",
      };
    }
  };

  const handleImport = async () => {
    if (!url.trim()) {
      setResult({
        success: false,
        error: "Por favor, ingresa una URL válida.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const result = await extractPropertyInfo(url);
      setResult(result);

      if (result.success && result.data) {
        onPropertyImported(result.data);
      }
    } catch (error) {
      setResult({
        success: false,
        error: "Error al procesar la URL. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setResult(null);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <Download className="w-6 h-6 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Importar Propiedad
        </h2>
      </div>

      <div className="space-y-4">
        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de la propiedad
          </label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://www.booking.com/hotel/es/example.html"
              className="input-field flex-1"
            />
            <button
              onClick={handleImport}
              disabled={isLoading || !url.trim()}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isLoading ? "Importando..." : "Importar"}</span>
            </button>
          </div>
        </div>

        {/* Supported Platforms */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Plataformas soportadas:</p>
          <div className="flex flex-wrap gap-2">
            {supportedPlatforms.map((platform) => (
              <span
                key={platform.name}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`p-4 rounded-lg border ${
              result.success
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-start space-x-3">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-medium">
                  {result.success
                    ? "¡Propiedad importada exitosamente!"
                    : "Error al importar"}
                </p>
                {result.error && <p className="text-sm mt-1">{result.error}</p>}
                {result.success && result.data && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm">
                      <strong>Nombre:</strong> {result.data.name}
                    </p>
                    <p className="text-sm">
                      <strong>Dirección:</strong> {result.data.address}
                    </p>
                    <p className="text-sm">
                      <strong>Plataforma:</strong> {result.data.platform}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            ¿Cómo funciona?
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Copia la URL de la propiedad desde Booking.com, Airbnb, VRBO o
              Expedia
            </li>
            <li>• Pega la URL en el campo de arriba</li>
            <li>
              • Haz clic en "Importar" para extraer la información
              automáticamente
            </li>
            <li>• Revisa y edita los datos antes de guardar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
