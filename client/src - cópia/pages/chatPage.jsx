import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ChatPage() {
  const { userId: otherUserId } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  console.log("Current user ID:", currentUserId);
  console.log("Other user ID:", otherUserId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3007/messages/${currentUserId}/${otherUserId}`
        );
        const data = await res.json();

        console.log("Fetched messages:", data); // 👈 Add this line
        setMessages(data);

        setMessages(data);
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err.message);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3007/users/${otherUserId}`);
        const data = await res.json();
        setOtherUser(data);
      } catch (err) {
        console.error("Erro ao buscar utilizador:", err.message);
      }
    };

    fetchMessages();
    fetchUser();
  }, [currentUserId, otherUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch("http://localhost:3007/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: currentUserId,
          to: otherUserId,
          content: newMessage,
        }),
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem");

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
      setNewMessage("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b shadow-sm">
        <button
          onClick={() => navigate("/messages")}
          className="mr-2 text-2xl text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Go back"
        >
          {/* You can use an SVG, emoji, or icon library */}
          ←
        </button>
    <h2
  className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer"
  onClick={() => otherUser && navigate(`/profile/${otherUser._id}`)}
>
          {otherUser?.firstName || "Utilizador"}
        </h2>
        <span className="w-8" /> {/* Spacer to balance the header */}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
              msg.from === currentUserId
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <p>{msg.content}</p>
            <p className="text-xs mt-1 text-right">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write message..."
          className="flex-1 border px-4 py-2 rounded-full"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
