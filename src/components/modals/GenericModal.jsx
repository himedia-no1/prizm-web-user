'use client';

import React, { useState } from 'react';
import { X, Link, Image, FileText } from '@/components/common/icons';
import { mockUsers, mockMessages } from '@/mocks';

export const GenericModal = ({ modalType, onClose, onOpenThread }) => {
    const [activeFileTab, setActiveFileTab] = useState('links');

    const getTitle = () => {
        switch (modalType) {
            case 'search':
                return '채널 내 검색';
            case 'members':
                return '멤버 목록';
            case 'pinned':
                return '고정된 메시지';
            case 'threads':
                return '스레드 목록';
            case 'info':
                return '채널 정보';
            case 'notifications':
                return '알림';
            case 'createCategory':
                return '새 카테고리 만들기';
            case 'invite':
                return '멤버 초대하기';
            case 'fileUpload':
                return '파일 업로드';
            case 'channelFiles':
                return '채널 파일';
            case 'mention':
                return '@ 사용자 언급하기';
            default:
                return '';
        }
    };

    const renderContent = () => {
        switch (modalType) {
            case 'search':
                return (
                    <div className="channel-modal__search">
                        <div className="settings-form-group">
                            <input id="channel-search" type="text" placeholder="채팅방 내 검색어 입력..." />
                        </div>
                    </div>
                );

            case 'members':
                return (
                    <div className="channel-modal__list">
                        {Object.values(mockUsers).map((user) => (
                            <div key={user.id} className="channel-modal__list-item member">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                                <span
                                    className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`}
                                    style={{ position: 'static', border: 'none', marginLeft: 'auto' }}
                                ></span>
                            </div>
                        ))}
                    </div>
                );

            case 'pinned':
                const pinnedMessages = mockMessages.filter((m) => m.pinned);
                return (
                    <div className="channel-modal__list">
                        {pinnedMessages.length > 0 ? (
                            pinnedMessages.map((msg) => (
                                <div key={msg.id} className="channel-modal__list-item message">
                                    <img src={mockUsers[msg.userId].avatar} alt={mockUsers[msg.userId].name} />
                                    <div className="message-item__content">
                                        <span className="message-item__username">{mockUsers[msg.userId].name}</span>
                                        <p className="message-item__text">{msg.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>고정된 메시지가 없습니다.</p>
                        )}
                    </div>
                );

            case 'threads':
                const threadMessages = mockMessages.filter((m) => m.threadId);
                return (
                    <div className="channel-modal__list">
                        {threadMessages.length > 0 ? (
                            threadMessages.map((msg) => (
                                <div key={msg.id} className="channel-modal__list-item message">
                                    <img src={mockUsers[msg.userId].avatar} alt={mockUsers[msg.userId].name} />
                                    <div className="message-item__content">
                                        <span className="message-item__username">{mockUsers[msg.userId].name}</span>
                                        <p className="message-item__text">{msg.text}</p>
                                    </div>
                                    <button className="message-item__action-button" onClick={() => onOpenThread(msg)}>
                                        스레드 보기
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>시작된 스레드가 없습니다.</p>
                        )}
                    </div>
                );

            case 'info':
                return (
                    <div className="channel-modal__info">
                        <h4># general</h4>
                        <p>팀 전체를 위한 일반 공지 및 대화 채널입니다.</p>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="channel-modal__list">
                        <p>새로운 알림이 없습니다.</p>
                    </div>
                );

            case 'createCategory':
                return (
                    <div>
                        <div className="settings-form-group">
                            <label htmlFor="cat-name">카테고리 이름</label>
                            <input id="cat-name" type="text" placeholder="예: 디자인 팀" />
                        </div>
                        <button className="profile-modal__save-button" style={{ marginTop: 0 }}>
                            만들기
                        </button>
                    </div>
                );

            case 'invite':
                return (
                    <div>
                        <div className="settings-form-group">
                            <label htmlFor="invite-email">이메일 주소</label>
                            <input id="invite-email" type="email" placeholder="teammate@example.com" />
                        </div>
                        <button className="profile-modal__save-button" style={{ marginTop: 0 }}>
                            초대 보내기
                        </button>
                        <div className="ws-dropdown__divider"></div>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>또는</p>
                        <button
                            className="social-button"
                            style={{ marginTop: '1rem', fontSize: '14px', padding: '12px 18px' }}
                        >
                            초대 링크 복사하기
                        </button>
                    </div>
                );

            case 'fileUpload':
                return (
                    <div className="file-upload-modal">
                        <div className="file-upload-dropzone">
                            <p>여기에 파일을 드래그하거나 클릭하여 업로드하세요.</p>
                            <input type="file" multiple style={{ display: 'none' }} />
                            <button
                                className="profile-modal__save-button"
                                style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }}
                            >
                                파일 선택
                            </button>
                        </div>
                        <button className="profile-modal__save-button">업로드</button>
                    </div>
                );

            case 'channelFiles':
                return (
                    <div className="channel-files-modal">
                        <div className="channel-files-tabs">
                            <button
                                className={activeFileTab === 'links' ? 'active' : ''}
                                onClick={() => setActiveFileTab('links')}
                            >
                                <LinkIcon size={16} />
                                링크
                            </button>
                            <button
                                className={activeFileTab === 'media' ? 'active' : ''}
                                onClick={() => setActiveFileTab('media')}
                            >
                                <Image size={16} />
                                미디어
                            </button>
                            <button
                                className={activeFileTab === 'docs' ? 'active' : ''}
                                onClick={() => setActiveFileTab('docs')}
                            >
                                <FileText size={16} />
                                문서
                            </button>
                        </div>
                        <div className="channel-files-content">
                            {activeFileTab === 'links' && <p>채널에 공유된 링크가 없습니다.</p>}
                            {activeFileTab === 'media' && <p>채널에 공유된 사진/동영상이 없습니다.</p>}
                            {activeFileTab === 'docs' && <p>채널에 공유된 문서 파일이 없습니다.</p>}
                        </div>
                    </div>
                );

            case 'mention':
                return (
                    <div className="channel-modal__list mention-list">
                        {Object.values(mockUsers).map((user) => (
                            <button key={user.id} className="channel-modal__list-item member mention-item">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    const getModalStyle = () => {
        let maxWidth = '520px';
        if (['invite', 'createCategory', 'notifications', 'mention', 'fileUpload'].includes(modalType)) {
            maxWidth = '440px';
        }
        if (modalType === 'channelFiles') {
            maxWidth = '600px';
        }
        return { maxWidth };
    };

    return (
        <div className="channel-modal-overlay" onClick={onClose}>
            <div
                className={`channel-modal ${modalType === 'channelFiles' ? 'files-modal' : ''}`}
                style={getModalStyle()}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="channel-modal__header">
                    <h3>{getTitle()}</h3>
                    <button onClick={onClose} className="channel-modal__close-button">
                        <X size={18} />
                    </button>
                </header>
                <div className={`channel-modal__content ${modalType === 'channelFiles' ? 'no-padding' : ''}`}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
