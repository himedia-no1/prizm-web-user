'use client';

import React from 'react';
import { X, MessageSquare } from '@/components/common/icons';
import { mockUsers } from '@/mocks';

export const UserProfileModal = ({ userId, onClose, onCreateDM }) => {
    const user = mockUsers[userId];
    if (!user) return null;

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal user-profile-modal" onClick={(e) => e.stopPropagation()}>
                <header className="profile-modal__header" style={{ borderBottom: 'none' }}>
                    <button
                        onClick={onClose}
                        className="profile-modal__close-button"
                        style={{ marginLeft: 'auto' }}
                    >
                        <X size={18} />
                    </button>
                </header>
                <div className="profile-modal__banner" style={{ height: '80px' }}></div>
                <div className="profile-modal__content" style={{ paddingTop: 0 }}>
                    <div
                        className="profile-modal__avatar-section"
                        style={{ marginTop: '-40px', marginBottom: '1rem' }}
                    >
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="profile-modal__avatar"
                            style={{ width: '80px', height: '80px' }}
                        />
                    </div>
                    <h3 className="user-profile-modal__display-name">{user.name}</h3>
                    <p className="user-profile-modal__status">
                        <span
                            className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`}
                            style={{ position: 'static', display: 'inline-block', marginRight: '4px' }}
                        ></span>
                        {user.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                    <div className="user-profile-modal__details">
                        <div>
                            <strong>실제 이름:</strong> {user.realName}
                        </div>
                        <div>
                            <strong>이메일:</strong> {user.email}
                        </div>
                        {user.phone && (
                            <div>
                                <strong>전화번호:</strong> {user.phone}
                            </div>
                        )}
                        <div>
                            <strong>가입 경로:</strong> {user.socialProvider}
                        </div>
                        <div>
                            <strong>역할:</strong> {user.role}
                        </div>
                    </div>
                    <button
                        className="profile-modal__save-button user-profile-modal__dm-button"
                        onClick={() => {
                            onCreateDM(user.id);
                            onClose();
                        }}
                    >
                        <MessageSquare size={16} />
                        DM 보내기
                    </button>
                </div>
            </div>
        </div>
    );
};
