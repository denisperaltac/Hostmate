import { useState } from "react";
import {
  Building2,
  MapPin,
  Wifi,
  Car,
  Users,
  Clock,
  Save,
  Plus,
} from "lucide-react";
import PropertyImporter from "../components/PropertyImporter";

interface Property {
  id: string;
  name: string;
  address: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  wifi: {
    network: string;
    password: string;
  };
  parking: boolean;
  maxGuests: number;
  rules: string[];
  amenities: string[];
  recommendations: string[];
}

export default function PropertySetup() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      name: "Apartamento Centro",
      address: "Rua das Flores, 123 - Centro, Florianópolis",
      description:
        "Apartamento moderno en el centro de la ciudad, perfecto para turismo de negocios y placer.",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      wifi: {
        network: "Centro_WiFi",
        password: "centro2024",
      },
      parking: true,
      maxGuests: 4,
      rules: [
        "No fumar en el apartamento",
        "No mascotas",
        "Respetar el horario de silencio (22:00 - 8:00)",
        "Mantener limpio el apartamento",
      ],
      amenities: [
        "WiFi gratuito",
        "Cocina equipada",
        "TV Smart",
        "Aire acondicionado",
        "Estacionamiento",
      ],
      recommendations: [
        "Restaurante La Casa - 2 cuadras",
        "Playa Central - 10 min caminando",
        "Centro comercial - 5 min",
        "Supermercado - 1 cuadra",
      ],
    },
  ]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    properties[0]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showImporter, setShowImporter] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Aquí se guardaría en el backend
    console.log("Propiedad guardada:", selectedProperty);
  };

  const handlePropertyImported = (importedData: any) => {
    // Convertir los datos importados al formato de Property
    const newProperty: Property = {
      id: Date.now().toString(),
      name: importedData.name || "",
      address: importedData.address || "",
      description: importedData.description || "",
      checkInTime: importedData.checkInTime || "15:00",
      checkOutTime: importedData.checkOutTime || "11:00",
      wifi: {
        network: importedData.wifi || "",
        password: "",
      },
      parking: importedData.parking || false,
      maxGuests: importedData.maxGuests || 2,
      rules: importedData.rules || [],
      amenities: importedData.amenities || [],
      recommendations: [],
    };

    setProperties([...properties, newProperty]);
    setSelectedProperty(newProperty);
    setIsEditing(true);
    setShowImporter(false);
  };

  const addNewProperty = () => {
    const newProperty: Property = {
      id: Date.now().toString(),
      name: "",
      address: "",
      description: "",
      checkInTime: "15:00",
      checkOutTime: "11:00",
      wifi: {
        network: "",
        password: "",
      },
      parking: false,
      maxGuests: 2,
      rules: [],
      amenities: [],
      recommendations: [],
    };
    setProperties([...properties, newProperty]);
    setSelectedProperty(newProperty);
    setIsEditing(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Configuración de Propiedades
            </h1>
            <p className="text-gray-600">
              Configura la información que tu chatbot usará para responder a
              huéspedes
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowImporter(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Importar desde URL</span>
            </button>
            <button
              onClick={addNewProperty}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Propiedad</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property List */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tus Propiedades
              </h2>
              <div className="space-y-2">
                {properties.map((property) => (
                  <button
                    key={property.id}
                    onClick={() => {
                      setSelectedProperty(property);
                      setIsEditing(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      selectedProperty?.id === property.id
                        ? "bg-primary-50 border border-primary-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-primary-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {property.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {property.address}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="lg:col-span-2">
            {selectedProperty ? (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {isEditing ? "Editando" : "Vista previa"} -{" "}
                    {selectedProperty.name}
                  </h2>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="btn-secondary"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Guardar</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de la propiedad
                        </label>
                        <input
                          type="text"
                          value={selectedProperty.name}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              name: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dirección
                        </label>
                        <input
                          type="text"
                          value={selectedProperty.address}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              address: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={selectedProperty.description}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              description: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          rows={3}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Check-in/Check-out */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Horarios
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in
                        </label>
                        <input
                          type="time"
                          value={selectedProperty.checkInTime}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              checkInTime: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out
                        </label>
                        <input
                          type="time"
                          value={selectedProperty.checkOutTime}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              checkOutTime: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WiFi Information */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Wifi className="w-5 h-5" />
                      <span>Información WiFi</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Red WiFi
                        </label>
                        <input
                          type="text"
                          value={selectedProperty.wifi.network}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              wifi: {
                                ...selectedProperty.wifi,
                                network: e.target.value,
                              },
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          value={selectedProperty.wifi.password}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              wifi: {
                                ...selectedProperty.wifi,
                                password: e.target.value,
                              },
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Información Adicional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Máximo de huéspedes
                        </label>
                        <input
                          type="number"
                          value={selectedProperty.maxGuests}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              maxGuests: parseInt(e.target.value),
                            })
                          }
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedProperty.parking}
                          onChange={(e) =>
                            setSelectedProperty({
                              ...selectedProperty,
                              parking: e.target.checked,
                            })
                          }
                          disabled={!isEditing}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label className="text-sm font-medium text-gray-700">
                          Estacionamiento disponible
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Reglas de la Casa
                    </h3>
                    <div className="space-y-2">
                      {selectedProperty.rules.map((rule, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={rule}
                            onChange={(e) => {
                              const newRules = [...selectedProperty.rules];
                              newRules[index] = e.target.value;
                              setSelectedProperty({
                                ...selectedProperty,
                                rules: newRules,
                              });
                            }}
                            disabled={!isEditing}
                            className="input-field"
                          />
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newRules = selectedProperty.rules.filter(
                                  (_, i) => i !== index
                                );
                                setSelectedProperty({
                                  ...selectedProperty,
                                  rules: newRules,
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button
                          onClick={() =>
                            setSelectedProperty({
                              ...selectedProperty,
                              rules: [...selectedProperty.rules, ""],
                            })
                          }
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          + Agregar regla
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Selecciona una propiedad
                  </h3>
                  <p className="text-gray-500">
                    Elige una propiedad de la lista para ver sus detalles
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Property Importer Modal */}
      {showImporter && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Importar Propiedad desde URL
              </h2>
              <button
                onClick={() => setShowImporter(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <PropertyImporter onPropertyImported={handlePropertyImported} />
          </div>
        </div>
      )}
    </>
  );
}
