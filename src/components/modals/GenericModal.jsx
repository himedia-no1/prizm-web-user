'use client';

import React, { useState } from 'react';
import { X, Link, Image, FileText } from '@/components/common/icons';
import { mockUsers, mockMessages } from '@/__mocks__';
import { mockAppConnect } from '@/__mocks__/appConnect';
import useStrings from '@/hooks/useStrings';

import './Modals.css';

const formatTemplate = (template, replacements = {}) => {
    if (!template) return undefined;
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => replacements[key] ?? '');
};

export const GenericModal = ({ modalType, modalProps = {}, onClose, onOpenThread }) => {
    const s = useStrings();
    const modalStrings = s.modals ?? {};
    const titles = modalStrings.titles ?? {};
    const addChannelStrings = modalStrings.addChannel ?? {};
    const addDMStrings = modalStrings.addDM ?? {};
    const addAppStrings = modalStrings.addApp ?? {};

    const [activeFileTab, setActiveFileTab] = useState('links');

    const fallbackTitles = {
        search: '채널 내 검색',
        members: '멤버 목록',
        pinned: '고정된 메시지',
        threads: '스레드 목록',
        info: '채널 정보',
        notifications: '알림',
        createCategory: '새 카테고리 만들기',
        invite: '멤버 초대하기',
        fileUpload: '파일 업로드',
        channelFiles: '채널 파일',
        mention: '@ 사용자 언급하기',
        addChannel: '채널 추가',
        addDM: 'DM 추가',
        addApp: '앱 추가',
    };

    const getTitle = () => {
        return titles[modalType] ?? fallbackTitles[modalType] ?? '';
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
                    <div className="channel-modal__list thread-gallery">
                        {threadMessages.length > 0 ? (
                            threadMessages.map((msg) => (
                                <div key={msg.id} className="channel-modal__list-item message thread-card">
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
                                <Link size={16} />
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

            case 'addChannel': {
                const targetCategoryName = modalProps.categoryName || modalProps.category?.name;
                const descriptionTemplate = addChannelStrings.description;
                const description = targetCategoryName
                    ? formatTemplate(descriptionTemplate, { category: targetCategoryName }) ??
                      `Add a new channel to ${targetCategoryName}.`
                    : formatTemplate(descriptionTemplate, { category: '' });
                return (
                    <div>
                        {targetCategoryName && (
                            <p className="channel-modal__helper-text">
                                {description}
                            </p>
                        )}
                        <div className="settings-form-group">
                            <label htmlFor="channel-name">
                                {addChannelStrings.nameLabel ?? 'Channel name'}
                            </label>
                            <input
                                id="channel-name"
                                type="text"
                                placeholder={addChannelStrings.namePlaceholder ?? 'e.g. design-review'}
                            />
                        </div>
                        <div className="settings-form-group">
                            <label htmlFor="channel-purpose">
                                {addChannelStrings.descLabel ?? 'Description'}
                            </label>
                            <textarea
                                id="channel-purpose"
                                placeholder={
                                    addChannelStrings.descPlaceholder ??
                                    'Briefly describe the purpose of this channel.'
                                }
                                rows={3}
                            ></textarea>
                        </div>
                        <button className="profile-modal__save-button">
                            {addChannelStrings.submit ?? 'Create channel'}
                        </button>
                    </div>
                );
            }

            case 'addDM': {
                const excludedUserIds = [
                    ...(modalProps.excludeUserIds || []),
                    ...(modalProps.existingDMUserIds || []),
                ];
                const availableUsers = Object.values(mockUsers).filter(
                    (user) => !excludedUserIds.includes(user.id),
                );

                return (
                    <div>
                        <div className="settings-form-group">
                            <label htmlFor="dm-search">
                                {addDMStrings.searchLabel ?? 'Search members'}
                            </label>
                            <input
                                id="dm-search"
                                type="text"
                                placeholder={addDMStrings.searchPlaceholder ?? 'Find by name or email'}
                            />
                        </div>
                        <div className="channel-modal__list mention-list">
                            {availableUsers.map((user) => (
                                <button key={user.id} className="channel-modal__list-item member mention-item">
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                    <span
                                        className={`dm-button__status ${
                                            user.status === 'online' ? 'online' : 'offline'
                                        }`}
                                        style={{ position: 'static', border: 'none', marginLeft: 'auto' }}
                                    ></span>
                                </button>
                            ))}
                            {availableUsers.length === 0 && (
                                <p>{addDMStrings.empty ?? 'No additional members available.'}</p>
                            )}
                        </div>
                    </div>
                );
            }

            case 'addApp':
                return (
                    <div>
                        {(addAppStrings.description ?? '').length > 0 && (
                            <p className="channel-modal__helper-text">
                                {addAppStrings.description ?? 'Connect apps to your workspace.'}
                            </p>
                        )}
                        <div className="channel-modal__list app-list">
                            {mockAppConnect.map((app) => (
                                <div key={app.id} className="channel-modal__list-item app-list__item">
                                    <div className="app-list__meta">
                                        <img src={`/${app.icon}`} alt={app.name} className="dm-button__avatar" />
                                        <div>
                                            <span className="app-list__name">{app.name}</span>
                                            <p className="app-list__description">
                                                {addAppStrings.itemDescription ?? 'Keep your favourite tools in sync.'}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="profile-modal__save-button" style={{ padding: '0.4rem 1rem' }}>
                                        {addAppStrings.addButton ?? 'Add'}
                                    </button>
                                </div>
                            ))}
                            {mockAppConnect.length === 0 && (
                                <p>{addAppStrings.empty ?? 'No apps available.'}</p>
                            )}
                        </div>
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
