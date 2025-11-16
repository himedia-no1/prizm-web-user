'use client';

import { useState, useEffect, useRef } from 'react';
import { useMessages } from 'next-intl';
import { X, AIIcon, ChevronsUpDown, Plus, Paperclip, Send } from '@/components/common/icons';
import styles from './AIAssistantModal.module.css';

const AIAssistantModal = ({ onClose }) => {
    const messages = useMessages();
    const t = messages?.modals?.aiAssistant;
    const examples = t?.examples;

    const [chatHistory, setChatHistory] = useState([
        { id: 'ai-init', type: 'ai', text: examples.greeting },
        { id: 'user-1', type: 'user', text: examples.question1 },
        { id: 'ai-1', type: 'ai', text: examples.answer1 },
    ]);
    const [sessions, setSessions] = useState([
        { id: 'session1', name: t?.sessions?.defaultName, timestamp: '14:30' },
        { id: 'session2', name: t?.sessions?.defaultName, timestamp: '10:15' },
    ]);
    const [currentSessionId, setCurrentSessionId] = useState('session1');
    const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const newUserMessage = { id: `user-${Date.now()}`, type: 'user', text: newMessage };
        const aiResponse = { id: `ai-${Date.now()}`, type: 'ai', text: t?.aiResponsePrefix?.replace('{message}', newMessage) };
        setChatHistory(prev => [...prev, newUserMessage, aiResponse]);
        setNewMessage('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    if (!t) {
        return null;
    }

    return (
        <div className="ai-modal">
            <header className={`ai-modal__header ${styles.header}`} onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}>
                <div className="ai-modal__title">
                    <AIIcon size={18} className="ai-modal__title-icon" />
                    <span>{sessions.find(s => s.id === currentSessionId)?.name || t.title}</span>
                    <ChevronsUpDown size={16} className="ai-modal__header-chevron" />
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="ai-modal__close-button">
                    <X size={18} />
                </button>
            </header>

            {isSessionDropdownOpen && (
                <div className="ai-session-dropdown">
                    <button className="ai-session-item new-chat">
                        <Plus size={16}/> {t.newChat}
                    </button>
                    <div className="ws-dropdown__divider"></div>
                    {sessions.map(session => (
                        <button key={session.id} className={`ai-session-item ${session.id === currentSessionId ? 'active' : ''}`} onClick={() => { setCurrentSessionId(session.id); setIsSessionDropdownOpen(false); }}>
                            <span className="ai-session-name">{session.name}</span>
                            <span className="ai-session-time">{session.timestamp}</span>
                        </button>
                    ))}
                </div>
            )}

            <div className="ai-modal__chat">
                {chatHistory.map(msg => (
                    <div key={msg.id} className={`ai-modal__chat-bubble ${msg.type}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="ai-modal__input-container">
                <div className="ai-modal__input-wrapper">
                    <button className="ai-modal__attach-button">
                        <Paperclip size={18}/>
                    </button>
                    <input type="text" placeholder={t.placeholder} className="ai-modal__input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <button className="ai-modal__send-button" onClick={handleSendMessage}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;
