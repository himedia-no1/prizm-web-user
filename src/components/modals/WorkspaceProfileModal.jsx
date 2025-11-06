'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Upload } from 'lucide-react';
import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';
import testApi from '@/api/test.api';
import './WorkspaceProfileModal.css';

export const WorkspaceProfileModal = ({ isOpen, onClose, workspaceId, userId }) => {
  const s = useStrings();
  const { getWorkspaceProfile, setWorkspaceProfile } = useStore();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    displayName: '',
    statusMessage: '',
    avatar: '',
  });

  const loadProfile = useCallback(async () => {
    if (!workspaceId || !userId) return;
    
    setLoading(true);
    try {
      const cachedProfile = getWorkspaceProfile(workspaceId);
      if (cachedProfile) {
        setProfile(cachedProfile);
      } else {
        const data = await testApi.fetchWorkspaceProfile(workspaceId, userId);
        setProfile(data);
        setWorkspaceProfile(workspaceId, data);
      }
    } catch (error) {
      console.error('Failed to load workspace profile:', error);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, userId, getWorkspaceProfile, setWorkspaceProfile]);

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen, loadProfile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await testApi.updateWorkspaceProfile(workspaceId, userId, profile);
      if (result.success) {
        setWorkspaceProfile(workspaceId, profile);
        onClose();
      }
    } catch (error) {
      console.error('Failed to save workspace profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="workspace-profile-modal-overlay" onClick={onClose}>
      <div className="workspace-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="workspace-profile-header">
          <h2>{s.modals.workspaceProfile.title}</h2>
          <button onClick={onClose} className="workspace-profile-close">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="workspace-profile-loading">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="workspace-profile-content">
              <p className="workspace-profile-description">{s.modals.workspaceProfile.description}</p>

              <div className="workspace-profile-avatar-section">
                <img src={profile.avatar} alt="Avatar" className="workspace-profile-avatar-preview" />
                <button className="workspace-profile-avatar-btn">
                  <Upload size={16} />
                  {s.modals.workspaceProfile.avatar}
                </button>
              </div>

              <div className="workspace-profile-field">
                <label>{s.modals.workspaceProfile.displayName}</label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder={s.modals.workspaceProfile.displayName}
                />
              </div>

              <div className="workspace-profile-field">
                <label>{s.modals.workspaceProfile.statusMessage}</label>
                <input
                  type="text"
                  value={profile.statusMessage}
                  onChange={(e) => setProfile({ ...profile, statusMessage: e.target.value })}
                  placeholder={s.modals.workspaceProfile.statusMessage}
                />
              </div>
            </div>

            <div className="workspace-profile-footer">
              <button onClick={onClose} className="workspace-profile-cancel">
                {s.modals.deactivateAccount.cancelButton}
              </button>
              <button onClick={handleSave} className="workspace-profile-save" disabled={saving}>
                {saving ? '저장 중...' : s.modals.workspaceProfile.saveButton}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
