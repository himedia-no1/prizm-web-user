'use client';

import React, { useState } from 'react';
import { X, FileText, Hash, Star, StarOff } from '@/components/common/icons';
import { mockUsers, mockMessages } from '@/__mocks__';
import { mockAppConnect } from '@/__mocks__/appConnect';
import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';
import { InviteFlowContent } from './InviteFlowContent';
import { InviteResultContent } from './InviteResultContent';

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
    const addFavoriteStrings = modalStrings.addFavorite ?? {};
    const membersStrings = modalStrings.members ?? {};
    const favoriteChannels = useStore((state) => state.favoriteChannels);
    const toggleFavoriteChannel = useStore((state) => state.toggleFavoriteChannel);
    const openModalFromStore = useStore((state) => state.openModal);

    const [activeFileTab, setActiveFileTab] = useState('links');

    const fallbackTitles = {
        search: '채널 내 검색',
        members: '멤버 목록',
        pinned: '고정된 메시지',
        threads: '스레드 목록',
        info: '채널 정보',
        notifications: '알림',
        createCategory: '새 카테고리 만들기',
        inviteMember: '멤버 초대하기',
        inviteGuest: '게스트 초대하기',
        fileUpload: '파일 업로드',
        channelFiles: '채널 파일',
        mention: '@ 사용자 언급하기',
        addChannel: '채널 추가',
        addDM: 'DM 추가',
        addApp: '앱 추가',
        addFavorite: '즐겨찾기 관리',
        inviteResult: '초대 완료',
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

            case 'members': {
                const channelDetails =
                    (modalProps.channelId && mockChannelDetails[modalProps.channelId]) || null;
                const workspaceId = modalProps.workspaceId ?? channelDetails?.workspaceId ?? 'ws1';
                const workspaceMemberships = mockWorkspaceMembers[workspaceId] ?? {};
                const memberIds = channelDetails?.members ?? Object.keys(workspaceMemberships);
                const channelMembers = memberIds
                    .map((id) => mockUsers[id])
                    .filter(Boolean);
                const canInviteGuests = modalProps.permissions?.canInviteMembers ?? true;

                return (
                    <>
                        <div className="channel-modal__list">
                            {channelMembers.map((user) => {
                                const membership = workspaceMemberships[user.id];
                                const roleLabel = membership?.role
                                    ? membership.role.toUpperCase()
                                    : user.role;
                                return (
                                    <div key={user.id} className="channel-modal__list-item member">
                                        <img src={user.avatar} alt={user.name} />
                                        <div className="member-profile__info">
                                            <span className="member-profile__name">{user.realName || user.name}</span>
                                            <span className="member-profile__meta">
                                                {user.email}
                                                {roleLabel ? ` • ${roleLabel}` : ''}
                                            </span>
                                        </div>
                                        <span
                                            className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`}
                                            style={{ position: 'static', border: 'none', marginLeft: 'auto' }}
                                        ></span>
                                    </div>
                                );
                            })}
                        </div>
                        {canInviteGuests && channelDetails?.type !== 'dm' && (
                            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                                <button
                                    type="button"
                                    className="profile-modal__save-button"
                                    style={{ width: 'auto' }}
                                    onClick={() => {
                                        openModalFromStore('generic', {
                                            type: 'inviteGuest',
                                            workspaceId,
                                            channelId: modalProps.channelId,
                                            channelName: modalProps.channelName,
                                        });
                                    }}
                                >
                                    {membersStrings?.inviteGuestButton ?? '게스트 초대'}
                                </button>
                            </div>
                        )}
                    </>
                );
            }

            case 'pinned': {
                const channelId = modalProps.channelId;
                const channelDetails =
                    (channelId && mockChannelDetails[channelId]) || null;
                const pinnedMessages = mockMessages.filter(
                    (m) =>
                        m.pinned &&
                        (!channelId || m.channelId === channelId || channelDetails?.pinnedMessageIds?.includes(m.id)),
                );
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
            }

            case 'threads': {
                const channelId = modalProps.channelId;
                const threadMessages = mockMessages.filter(
                    (m) => m.threadId && (!channelId || m.channelId === channelId),
                );
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
            }

            case 'info': {
                const channelDetails =
                    (modalProps.channelId && mockChannelDetails[modalProps.channelId]) || null;
                return (
                    <div className="channel-modal__info">
                        <h4>{channelDetails?.displayName ?? `#${modalProps.channelName ?? 'channel'}`}</h4>
                        <p>{channelDetails?.description ?? '채널 설명이 아직 추가되지 않았습니다.'}</p>
                        {channelDetails?.topic && (
                            <p className="channel-modal__info-topic">Topic · {channelDetails.topic}</p>
                        )}
                    </div>
                );
            }

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

            case 'inviteMember':
                return <InviteFlowContent mode="member" workspaceId={modalProps.workspaceId} />;

            case 'inviteGuest':
                return (
                    <InviteFlowContent
                        mode="guest"
                        channelId={modalProps.channelId}
                        channelName={modalProps.channelName}
                        workspaceId={modalProps.workspaceId}
                    />
                );

            case 'inviteResult':
                return (
                    <InviteResultContent
                        mode={modalProps.mode}
                        resultType={modalProps.resultType}
                        entries={modalProps.entries}
                        link={modalProps.link}
                        onClose={onClose}
                    />
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

            case 'channelFiles': {
                const channelDetails =
                    (modalProps.channelId && mockChannelDetails[modalProps.channelId]) || { files: [] };
                const files = channelDetails.files ?? [];
                return (
                    <div className="channel-files-modal">
                        <div className="channel-files-tabs">
                            <button
                                className={activeFileTab === 'files' ? 'active' : ''}
                                onClick={() => setActiveFileTab('files')}
                            >
                                <FileText size={16} />
                                파일
                            </button>
                        </div>
                        <div className="channel-files-content">
                            {files.length > 0 ? (
                                <div className="channel-files-grid">
                                    {files.map((file) => {
                                        const uploader = mockUsers[file.uploadedBy];
                                        return (
                                            <div key={file.id} className="channel-file-card">
                                                <div className="channel-file-icon">
                                                    <FileText size={18} />
                                                </div>
                                                <div className="channel-file-info">
                                                    <span className="channel-file-title">{file.name}</span>
                                                    <p className="channel-file-meta">
                                                        업로드: {uploader?.name ?? 'Unknown'} • {file.size}
                                                    </p>
                                                </div>
                                                <button className="channel-file-action">다운로드</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p>업로드된 파일이 없습니다.</p>
                            )}
                        </div>
                    </div>
                );
            }

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

            case 'addFavorite': {
                const channels = modalProps.channels || [];
                return (
                    <div>
                        {addFavoriteStrings.description && (
                            <p className="channel-modal__helper-text">{addFavoriteStrings.description}</p>
                        )}
                        {channels.length === 0 ? (
                            <p>{addFavoriteStrings.empty ?? 'No channels available.'}</p>
                        ) : (
                            <div className="favorite-selector-list">
                                {channels.map((channel) => {
                                    const isFavorite = favoriteChannels.includes(channel.id);
                                    return (
                                        <button
                                            key={channel.id}
                                            type="button"
                                            className={`favorite-selector ${isFavorite ? 'active' : ''}`}
                                            onClick={() => toggleFavoriteChannel(channel.id)}
                                        >
                                            <span className="favorite-selector__info">
                                                <Hash size={14} />
                                                <span className="favorite-selector__name">{channel.name}</span>
                                                {channel.categoryName && (
                                                    <span className="favorite-selector__category">
                                                        {channel.categoryName}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="favorite-selector__action">
                                                {isFavorite ? <Star size={16} /> : <StarOff size={16} />}
                                                <span>
                                                    {isFavorite
                                                        ? addFavoriteStrings.remove ?? 'Remove from favourites'
                                                        : addFavoriteStrings.add ?? 'Add to favourites'}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            }

            default:
                return null;
        }
    };

    const getModalStyle = () => {
        let maxWidth = '520px';
        if (['invite', 'createCategory', 'notifications', 'mention', 'fileUpload', 'addFavorite'].includes(modalType)) {
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
