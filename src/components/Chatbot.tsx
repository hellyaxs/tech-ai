import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateOllamaResponse, streamOllamaResponse } from "@/server/ollamaService";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente virtual do FITAI. Como posso ajudá-lo hoje?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Adiciona uma mensagem vazia do bot para ir preenchendo
    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      { id: botMessageId, text: "", isUser: false, timestamp: new Date() }
    ]);

    try {
      let botText = "";
      for await (const chunk of streamOllamaResponse(inputMessage, 'mistral')) {
        botText += chunk;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: botText } : msg
          )
        );
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Erro ao conectar ao servidor de IA.",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("treino") || input.includes("exercicio")) {
      return "O FITAI analisa seus exercícios em tempo real! Com nossa tecnologia de visão computacional, você recebe feedback instantâneo sobre sua forma e técnica. Gostaria de saber mais sobre algum exercício específico?";
    }
    
    if (input.includes("preço") || input.includes("valor") || input.includes("custo")) {
      return "Temos planos flexíveis para diferentes necessidades! Oferecemos um teste gratuito de 7 dias. Entre em contato conosco através do formulário para saber mais sobre nossos preços.";
    }
    
    if (input.includes("como funciona") || input.includes("funciona")) {
      return "O FITAI usa câmeras e inteligência artificial para monitorar seus movimentos durante o treino. O sistema identifica sua postura e técnica, oferecendo correções em tempo real para maximizar seus resultados e prevenir lesões.";
    }
    
    if (input.includes("contato") || input.includes("suporte")) {
      return "Você pode entrar em contato conosco preenchendo o formulário na seção 'Contato' desta página. Nossa equipe responderá em até 24 horas!";
    }
    
    return "Interessante! O FITAI pode te ajudar com análise de movimentos, correção de postura e treinos personalizados. Tem alguma dúvida específica sobre nossas funcionalidades? Ou gostaria de agendar uma demonstração?";
  };

  return (
    <>
      {/* Botão flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
            isOpen 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-pulse-500 hover:bg-pulse-600 hover:scale-110"
          )}
          aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Widget do chat */}
      <div className={cn(
        "fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 transition-all duration-300",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-pulse-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistente FITAI</h3>
              <p className="text-xs opacity-90">Online agora</p>
            </div>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-lg text-sm",
                  message.isUser
                    ? "bg-pulse-500 text-white"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse-500 text-sm"
            />
            <button
              type="submit"
              className="bg-pulse-500 hover:bg-pulse-600 text-white p-2 rounded-lg transition-colors"
              disabled={!inputMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
