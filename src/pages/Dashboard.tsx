import {
  MessageCircle,
  Users,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      name: "Conversaciones Hoy",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: MessageCircle,
    },
    {
      name: "Huéspedes Activos",
      value: "8",
      change: "+1",
      changeType: "positive",
      icon: Users,
    },
    {
      name: "Propiedades",
      value: "3",
      change: "0",
      changeType: "neutral",
      icon: Building2,
    },
    {
      name: "Tasa de Respuesta",
      value: "98%",
      change: "+2%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  const recentConversations = [
    {
      id: 1,
      guest: "María González",
      property: "Apartamento Centro",
      message: "¿Cuál es el horario de check-in?",
      time: "2 min",
      status: "pending",
    },
    {
      id: 2,
      guest: "Carlos Silva",
      property: "Casa Playa",
      message: "¿Hay estacionamiento disponible?",
      time: "15 min",
      status: "responded",
    },
    {
      id: 3,
      guest: "Ana Costa",
      property: "Apartamento Centro",
      message: "¿Puedo hacer check-in más temprano?",
      time: "1 hora",
      status: "responded",
    },
  ];

  const quickActions = [
    {
      name: "Configurar Nueva Propiedad",
      description: "Agregar información de alojamiento",
      href: "/property-setup",
      icon: Building2,
    },
    {
      name: "Probar Chatbot",
      description: "Simular conversación con IA",
      href: "/chatbot",
      icon: MessageCircle,
    },
    {
      name: "Ver Conversaciones",
      description: "Revisar historial de chats",
      href: "/conversations",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Bienvenido a tu panel de control de HostMate
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  stat.changeType === "positive"
                    ? "bg-green-100 text-green-600"
                    : stat.changeType === "negative"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500"> desde ayer</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Conversations */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Conversaciones Recientes
            </h2>
            <a
              href="/conversations"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Ver todas
            </a>
          </div>
          <div className="space-y-3">
            {recentConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    conversation.status === "pending"
                      ? "bg-yellow-400"
                      : conversation.status === "responded"
                      ? "bg-green-400"
                      : "bg-gray-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {conversation.guest}
                  </p>
                  <p className="text-sm text-gray-500">
                    {conversation.property}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.message}
                  </p>
                </div>
                <div className="text-xs text-gray-500">{conversation.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-primary-100 rounded-lg">
                  <action.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {action.name}
                  </p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Estado del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Chatbot Activo
              </p>
              <p className="text-xs text-gray-500">
                Respondiendo automáticamente
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Tiempo de Respuesta
              </p>
              <p className="text-xs text-gray-500">Menos de 3 segundos</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Pendientes</p>
              <p className="text-xs text-gray-500">
                2 conversaciones requieren atención
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
