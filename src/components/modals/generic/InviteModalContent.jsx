'use client';

import useStrings from '@/hooks/useStrings';

export const InviteModalContent = () => {
    const s = useStrings();

    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="invite-email">{s.inviteEmailLabel}</label>
                <input id="invite-email" type="email" placeholder="teammate@example.com" />
            </div>
            <button className="profile-modal__save-button" style={{ marginTop: 0 }}>
                {s.inviteSendButton}
            </button>
            <div className="ws-dropdown__divider"></div>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{s.inviteOrSeparator}</p>
            <button
                className="social-button"
                style={{ marginTop: '1rem', fontSize: '14px', padding: '12px 18px' }}
            >
                {s.inviteCopyLinkButton}
            </button>
        </div>
    );
};
