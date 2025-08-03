import { useState } from "react";
import {
  MessageSquare,
  User,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

interface Conversation {
  id: string;
  guest: string;
  property: string;
  lastMessage: string;
  timestamp: Date;
  status: "active" | "resolved" | "pending";
  messageCount: number;
  platform: "whatsapp" | "telegram" | "web";
}

export default function Conversations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const conversations: Conversation[] = [
    {
      id: "1",
      guest: "María González",
      property: "Apartamento Centro",
      lastMessage: "¿Cuál es el horario de check-in?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
      status: "pending",
      messageCount: 3,
      platform: "whatsapp",
    },
    {
      id: "2",
      guest: "Carlos Silva",
      property: "Casa Playa",
      lastMessage: "¿Hay estacionamiento disponible?",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
      status: "resolved",
      messageCount: 5,
      platform: "telegram",
    },
    {
      id: "3",
      guest: "Ana Costa",
      property: "Apartamento Centro",
      lastMessage: "¿Puedo hacer check-in más temprano?",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      status: "resolved",
      messageCount: 4,
      platform: "whatsapp",
    },
    {
      id: "4",
      guest: "Roberto Lima",
      property: "Casa Playa",
      lastMessage: "¿Cuál es la información del WiFi?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "active",
      messageCount: 2,
      platform: "web",
    },
    {
      id: "5",
      guest: "Lucía Santos",
      property: "Apartamento Centro",
      lastMessage: "¿Cuáles son las reglas de la casa?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      status: "resolved",
      messageCount: 6,
      platform: "telegram",
    },
  ];

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || conversation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa";
      case "resolved":
        return "Resuelta";
      case "pending":
        return "Pendiente";
      default:
        return "Desconocido";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "whatsapp":
        return "💬";
      case "telegram":
        return "📱";
      case "web":
        return "🌐";
      default:
        return "💬";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Ahora";
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Conversaciones</h1>
        <p className="text-gray-600">
          Historial y gestión de conversaciones con huéspedes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <div className="card">
            {/* Search and Filters */}
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar conversaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <div className="flex space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activas</option>
                  <option value="pending">Pendientes</option>
                  <option value="resolved">Resueltas</option>
                </select>
              </div>
            </div>

            {/* Conversations */}
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-primary-50 border border-primary-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">
                          {conversation.guest}
                        </p>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(conversation.status)}
                          <span className="text-xs text-gray-500">
                            {getPlatformIcon(conversation.platform)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 truncate">
                        {conversation.property}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(conversation.timestamp)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {conversation.messageCount} msgs
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              conversation.status === "active"
                                ? "bg-yellow-100 text-yellow-700"
                                : conversation.status === "resolved"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {getStatusText(conversation.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedConversation.guest}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.property}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedConversation.status === "active"
                        ? "bg-yellow-100 text-yellow-700"
                        : selectedConversation.status === "resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {getStatusText(selectedConversation.status)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getPlatformIcon(selectedConversation.platform)}
                  </span>
                </div>
              </div>

              {/* Chat Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 max-w-xs">
                      <p className="text-sm">
                        ¿Cuál es el horario de check-in?
                      </p>
                      <p className="text-xs text-gray-500 mt-1">14:30</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 justify-end">
                    <div className="bg-primary-600 rounded-lg px-3 py-2 max-w-xs">
                      <p className="text-sm text-white">
                        El check-in es a las 15:00. Puedes llegar antes y dejar
                        tus maletas en el lobby.
                      </p>
                      <p className="text-xs text-primary-100 mt-1">14:31</p>
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-gray-600" />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 max-w-xs">
                      <p className="text-sm">Perfecto, gracias!</p>
                      <p className="text-xs text-gray-500 mt-1">14:32</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                <button className="btn-primary">Responder</button>
                <button className="btn-secondary">Marcar como resuelta</button>
                <button className="btn-secondary">
                  Ver conversación completa
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecciona una conversación
                </h3>
                <p className="text-gray-500">
                  Elige una conversación de la lista para ver los detalles
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
