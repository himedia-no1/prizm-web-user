'use client';

export const AddChannelModalContent = () => {
    return (
        <div>
            <div className="settings-form-group">
                <label htmlFor="channel-name">채널 이름</label>
                <input id="channel-name" type="text" placeholder="예: 새로운-채널" />
            </div>
            <button className="profile-modal__save-button" style={{ marginTop: 0 }}>
                채널 만들기
            </button>
        </div>
    );
};
