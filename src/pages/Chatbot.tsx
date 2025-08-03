import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Settings, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const sampleResponses = {
  "check-in":
    "El check-in es a las 15:00. Puedes llegar antes y dejar tus maletas en el lobby. El apartamento estará listo a las 15:00.",
  "check-out":
    "El check-out es a las 11:00. Por favor, deja las llaves en la mesa del living y cierra la puerta al salir.",
  wifi: 'La red WiFi es "Centro_WiFi" y la contraseña es "centro2024". Está disponible en todo el apartamento.',
  parking:
    "Sí, hay estacionamiento disponible en el edificio. Es gratuito para huéspedes.",
  rules:
    "Las reglas principales son: no fumar, no mascotas, respetar el horario de silencio (22:00-8:00) y mantener limpio el apartamento.",
  amenities:
    "El apartamento incluye: WiFi gratuito, cocina equipada, TV Smart, aire acondicionado y estacionamiento.",
  location:
    "Estamos ubicados en Rua das Flores, 123 - Centro, Florianópolis. A 10 minutos caminando de la playa central.",
  recommendations:
    "Te recomiendo: Restaurante La Casa (2 cuadras), Playa Central (10 min caminando), Centro comercial (5 min), Supermercado (1 cuadra).",
};

const commonQuestions = [
  "¿Cuál es el horario de check-in?",
  "¿Cuál es el horario de check-out?",
  "¿Cuál es la información del WiFi?",
  "¿Hay estacionamiento disponible?",
  "¿Cuáles son las reglas de la casa?",
  "¿Qué amenidades incluye el apartamento?",
  "¿Dónde está ubicado el apartamento?",
  "¿Tienes recomendaciones de lugares cercanos?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy el asistente de HostMate. ¿En qué puedo ayudarte con tu estadía?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(() => {
      let response =
        "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";

      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes("check-in") ||
        lowerMessage.includes("llegada")
      ) {
        response = sampleResponses["check-in"];
      } else if (
        lowerMessage.includes("check-out") ||
        lowerMessage.includes("salida")
      ) {
        response = sampleResponses["check-out"];
      } else if (
        lowerMessage.includes("wifi") ||
        lowerMessage.includes("internet")
      ) {
        response = sampleResponses["wifi"];
      } else if (
        lowerMessage.includes("parking") ||
        lowerMessage.includes("estacionamiento")
      ) {
        response = sampleResponses["parking"];
      } else if (
        lowerMessage.includes("reglas") ||
        lowerMessage.includes("normas")
      ) {
        response = sampleResponses["rules"];
      } else if (
        lowerMessage.includes("amenidades") ||
        lowerMessage.includes("servicios")
      ) {
        response = sampleResponses["amenities"];
      } else if (
        lowerMessage.includes("ubicación") ||
        lowerMessage.includes("dónde")
      ) {
        response = sampleResponses["location"];
      } else if (
        lowerMessage.includes("recomendaciones") ||
        lowerMessage.includes("lugares")
      ) {
        response = sampleResponses["recommendations"];
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Delay entre 1-3 segundos
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    simulateBotResponse(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    // Simular envío automático
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: question,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      simulateBotResponse(question);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chatbot Simulator</h1>
        <p className="text-gray-600">
          Prueba cómo responde tu asistente IA a las preguntas de huéspedes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  HostMate Assistant
                </h3>
                <p className="text-sm text-gray-500">
                  Respondiendo automáticamente
                </p>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary-600"
                          : "bg-gray-200"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 input-field"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preguntas Comunes
            </h3>
            <div className="space-y-2">
              {commonQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isTyping}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  <p className="text-sm text-gray-900">{question}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Stats */}
          <div className="card mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Estadísticas
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Mensajes hoy</span>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Tiempo promedio de respuesta
                </span>
                <span className="text-sm font-medium text-gray-900">2.3s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Satisfacción</span>
                <span className="text-sm font-medium text-green-600">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
