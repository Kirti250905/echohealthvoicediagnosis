import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiSend, FiPaperclip, FiMessageCircle } from "react-icons/fi";

const SUGGESTIONS = [
  "What causes voice hoarseness?",
  "Exercises for vocal nodules",
  "Signs of vocal fatigue",
  "Best practices for voice care",
  "When should I see a specialist?",
];

export default function Echobuddy() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I'm EchoBuddy, your voice health assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const chatEndRef = useRef();

  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

  // scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const appendMessage = (role, content) => {
    setMessages((m) => [
      ...m,
      {
        role,
        content,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;
    appendMessage("user", text);
    setInput("");
    try {
      const { data } = await axios.post(`${BACKEND}/chat/`, { message: text });
      appendMessage("bot", data.reply);
    } catch {
      appendMessage("bot", "⚠️ Something went wrong. Please try again.");
    }
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      return alert("Please upload a PDF report.");
    }
    setUploading(true);
    appendMessage("user", `📎 Uploaded report: ${file.name}`);
    const form = new FormData();
    form.append("file", file);
    try {
      const { data } = await axios.post(`${BACKEND}/analyze_pdf/`, form);
      appendMessage("bot", "✅ Report processed. You can now ask questions about it.");
      await axios.post(`${BACKEND}/chat/`, {
        message: `Context:\n${data.context}`,
      });
    } catch {
      appendMessage("bot", "⚠️ PDF analysis failed.");
    } finally {
      setUploading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          EchoBuddy - Your Voice Health Assistant
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Column */}
        <div className="relative flex flex-col flex-1 bg-white">
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 space-y-6">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[70%]">
                  <div
                    className={`flex items-start space-x-3 ${
                      m.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <FiMessageCircle
                      className={`mt-1 ${
                        m.role === "user" ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          m.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {m.content}
                      </div>
                      <div
                        className={`mt-1 text-xs ${
                          m.role === "user"
                            ? "text-right text-blue-500"
                            : "text-left text-gray-500"
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar (absolute at bottom) */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center space-x-3">
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-gray-500 hover:text-blue-600"
            >
              <FiPaperclip size={24} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handlePDFUpload}
              className="hidden"
            />

            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />

            <button
              onClick={() => sendMessage()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
            >
              <FiSend size={20} />
            </button>
          </div>

          {uploading && (
            <div className="absolute bottom-16 left-0 right-0 text-center text-sm text-gray-500">
              📄 Processing uploaded report…
            </div>
          )}
        </div>

        {/* Suggestions Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Suggested Topics
          </h2>
          <div className="space-y-2 mb-6">
            {SUGGESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-gray-700">
            <h3 className="font-semibold mb-2">About EchoBuddy</h3>
            <p>
              EchoBuddy provides information about voice health topics, but does
              not replace professional medical advice. Please consult
              healthcare professionals for diagnoses and treatment.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
