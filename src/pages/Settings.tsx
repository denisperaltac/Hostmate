import { useState } from "react";
import { Bot, MessageCircle, Shield, Bell, Key, Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    chatbot: {
      enabled: true,
      responseTime: 3,
      language: "es",
      personality: "friendly",
    },
    notifications: {
      email: true,
      push: true,
      sound: false,
    },
    integrations: {
      whatsapp: false,
      telegram: true,
      web: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  });

  const handleSave = () => {
    console.log("Configuración guardada:", settings);
    // Aquí se guardaría en el backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Personaliza tu experiencia con HostMate</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chatbot Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Configuración del Chatbot
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Chatbot activo
                </label>
                <p className="text-xs text-gray-500">
                  Permite que el IA responda automáticamente
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.chatbot.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      chatbot: {
                        ...settings.chatbot,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiempo máximo de respuesta (segundos)
              </label>
              <input
                type="number"
                value={settings.chatbot.responseTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    chatbot: {
                      ...settings.chatbot,
                      responseTime: parseInt(e.target.value),
                    },
                  })
                }
                className="input-field w-32"
                min="1"
                max="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idioma del chatbot
              </label>
              <select
                value={settings.chatbot.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    chatbot: { ...settings.chatbot, language: e.target.value },
                  })
                }
                className="input-field"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personalidad del chatbot
              </label>
              <select
                value={settings.chatbot.personality}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    chatbot: {
                      ...settings.chatbot,
                      personality: e.target.value,
                    },
                  })
                }
                className="input-field"
              >
                <option value="friendly">Amigable</option>
                <option value="professional">Profesional</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Notificaciones
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notificaciones por email
                </label>
                <p className="text-xs text-gray-500">
                  Recibe alertas por correo electrónico
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notificaciones push
                </label>
                <p className="text-xs text-gray-500">Alertas en tiempo real</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Sonidos de notificación
                </label>
                <p className="text-xs text-gray-500">
                  Reproducir sonidos al recibir mensajes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.sound}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        sound: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Integraciones
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  WhatsApp
                </label>
                <p className="text-xs text-gray-500">
                  Conectar con WhatsApp Business
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integrations.whatsapp}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        whatsapp: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Telegram
                </label>
                <p className="text-xs text-gray-500">Bot de Telegram activo</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integrations.telegram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        telegram: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Chat web
                </label>
                <p className="text-xs text-gray-500">
                  Widget de chat en tu sitio web
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integrations.web}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        web: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Autenticación de dos factores
                </label>
                <p className="text-xs text-gray-500">
                  Añadir una capa extra de seguridad
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        twoFactor: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiempo de sesión (minutos)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      sessionTimeout: parseInt(e.target.value),
                    },
                  })
                }
                className="input-field w-32"
                min="5"
                max="120"
              />
            </div>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Key className="w-6 h-6 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Claves de API</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="sk-..."
                className="input-field flex-1"
              />
              <button className="btn-secondary">Probar</button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Clave para acceder a GPT-4o
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telegram Bot Token
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="input-field flex-1"
              />
              <button className="btn-secondary">Probar</button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Token del bot de Telegram
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Guardar Configuración</span>
        </button>
      </div>
    </div>
  );
}
