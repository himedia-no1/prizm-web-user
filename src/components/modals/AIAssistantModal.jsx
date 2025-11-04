'use client';

import { useState, useEffect, useRef } from 'react';
import { X, AIIcon, ChevronsUpDown, Plus, Paperclip, Send } from '@/components/common/icons';

const AIAssistantModal = ({ onClose }) => {
    const [chatHistory, setChatHistory] = useState([
        { id: 'ai-init', type: 'ai', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { id: 'user-1', type: 'user', text: '최근 frontend 채널의 주요 논의 내용을 요약해줘.' },
        { id: 'ai-1', type: 'ai', text: '네, frontend 채널에서는 최근 디자인 시스템 업데이트와 관련하여 활발한 논의가 있었습니다. 주요 내용은 다음과 같습니다...' },
    ]);
    const [sessions, setSessions] = useState([
        { id: 'session1', name: 'Frontend 채널 요약', timestamp: '오후 2:30' },
        { id: 'session2', name: '새 기능 아이디어', timestamp: '오전 10:15' },
    ]);
    const [currentSessionId, setCurrentSessionId] = useState('session1');
    const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const newUserMessage = { id: `user-${Date.now()}`, type: 'user', text: newMessage };
        const aiResponse = { id: `ai-${Date.now()}`, type: 'ai', text: `"${newMessage}"에 대한 답변입니다.` };
        setChatHistory(prev => [...prev, newUserMessage, aiResponse]);
        setNewMessage('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className="ai-modal">
            <header className="ai-modal__header" onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)} style={{ cursor: 'pointer' }}>
                <div className="ai-modal__title">
                    <AIIcon size={18} className="ai-modal__title-icon" />
                    <span>{sessions.find(s => s.id === currentSessionId)?.name || 'AI Assistant'}</span>
                    <ChevronsUpDown size={16} className="ai-modal__header-chevron" />
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="ai-modal__close-button">
                    <X size={18} />
                </button>
            </header>

            {isSessionDropdownOpen && (
                <div className="ai-session-dropdown">
                    <button className="ai-session-item new-chat">
                        <Plus size={16}/> 새 채팅 시작
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
                    <input type="text" placeholder="AI에게 질문하거나 파일을 첨부하세요..." className="ai-modal__input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <button className="ai-modal__send-button" onClick={handleSendMessage}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;
