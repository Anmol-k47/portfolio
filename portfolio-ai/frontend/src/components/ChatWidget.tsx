import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I am Anmol\'s AI assistant. Ask me anything about his experience, skills, or projects!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call FastAPI Backend (Render deployment)
      const response = await fetch('https://portfolio-l0jh.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching chat response:', error);

      let errorText = 'Something went wrong. Please try again.';
      if (error instanceof Response || (error as { status?: number })?.status === 429) {
        errorText = '⏳ Demo limit reached for today — free-tier quota exhausted. Try again tomorrow or email anmolkashyap12420@gmail.com!';
      } else if ((error as { status?: number })?.status === 401) {
        errorText = '🔑 API key not configured. Please check the backend .env file.';
      }

      // Try to read detail from HTTP error responses
      if (error instanceof Error && error.message) {
        try {
          const parsed = JSON.parse(error.message);
          if (parsed?.detail) errorText = parsed.detail;
        } catch { /* ignore */ }
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorText,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.widgetContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <div className={styles.onlineIndicator} />
              AI Assistant
            </div>
            <button onClick={toggleChat} className={styles.closeButton} aria-label="Close Chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.user : styles.ai}`}>
                <div className={styles.messageBubble}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageWrapper} ${styles.ai}`}>
                <div className={styles.messageBubble}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Anmol..."
              className={styles.input}
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading} className={styles.sendButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button onClick={toggleChat} className={styles.toggleButton} aria-label="Open Chat">
          <svg className={styles.toggleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
