"use client"

import { X, Paperclip, ShieldCheck, Search, Hash, Users } from "../common/icons"
import { useState, useRef, useEffect } from "react"
import styles from './InviteMemberModal.module.css'

const mockUsers = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `사용자 ${i + 1}`,
    email: `a${i + 1}@example.com`,
    avatar: "/user.png", // Placeholder image
    joinMethod: i % 2 === 0 ? "Google" : "Email",
}))

const initialInvitedUsers = Array.from({ length: 3 }, (_, i) => ({
    id: `invited-${i + 1}`,
    name: `초대된 사용자 ${i + 1}`,
    email: `invited${i + 1}@example.com`,
    avatar: "/user.png", // Placeholder image
    joinMethod: i % 2 === 0 ? "Google" : "Email",
}))

const mockGroups = [
    { id: "dev", name: "개발팀" },
    { id: "design", name: "디자인팀" },
    { id: "marketing", name: "마케팅팀" },
    { id: "sales", name: "영업팀" },
    { id: "hr", name: "인사팀" },
]

const mockChannels = [
    { id: "general", name: "general", category: "General" },
    { id: "announcements", name: "announcements", category: "General" },
    { id: "dev-frontend", name: "frontend", category: "Development" },
    { id: "dev-backend", name: "backend", category: "Development" },
    { id: "design-ui", name: "ui-design", category: "Design" },
    { id: "design-ux", name: "ux-research", category: "Design" },
]

export default function InviteMemberModal({ isOpen, onClose }) {
    const [inviteLink, setInviteLink] = useState("")
    const [linkGenerated, setLinkGenerated] = useState(false)
    const [copied, setCopied] = useState(false)
    const [copyMessage, setCopyMessage] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const searchInputRef = useRef(null)
    const [searchDropdownPosition, setSearchDropdownPosition] = useState({ top: 0, left: 0, width: 0 })

    const [accessType, setAccessType] = useState("anyone")
    const [expirationMode, setExpirationMode] = useState("unlimited")
    const [expirationValue, setExpirationValue] = useState("")
    const [usageMode, setUsageMode] = useState("unlimited")
    const [usageValue, setUsageValue] = useState("")
    const [memberType, setMemberType] = useState("member")

    const [selectedGroups, setSelectedGroups] = useState([])
    const [selectedChannels, setSelectedChannels] = useState([])
    const [invitedUsers, setInvitedUsers] = useState(initialInvitedUsers)

    const [showInviteHistory, setShowInviteHistory] = useState(false)
    const [inviteHistoryPosition, setInviteHistoryPosition] = useState({ top: 0, right: 0, width: 0 })
    const inviteHistoryRef = useRef(null)
    const inviteHistoryButtonRef = useRef(null)

    const inviteHistoryButtonRef2 = useRef(null)

    const searchDropdownRef = useRef(null)

    useEffect(() => {
        if (searchInputRef.current && showSearchResults) {
            const rect = searchInputRef.current.getBoundingClientRect()
            setSearchDropdownPosition({
                top: rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            })
        }
    }, [showSearchResults, searchQuery])

    useEffect(() => {
        if (inviteHistoryButtonRef.current && showInviteHistory) {
            const rect = inviteHistoryButtonRef.current.getBoundingClientRect()
            setInviteHistoryPosition({
                top: rect.bottom + 4,
                right: window.innerWidth - rect.right,
                width: 400,
            })
        }
    }, [showInviteHistory])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
                if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                    setShowSearchResults(false)
                }
            }
            if (inviteHistoryRef.current && !inviteHistoryRef.current.contains(event.target)) {
                if (inviteHistoryButtonRef.current && !inviteHistoryButtonRef.current.contains(event.target)) {
                    setShowInviteHistory(false)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    if (!isOpen) return null

    const syncToServer = () => {
        console.log("[v0] Syncing to server:", {
            inviteLink,
            accessType,
            expirationMode,
            expirationValue,
            usageMode,
            usageValue,
            memberType,
            selectedGroups,
            selectedChannels,
            invitedUsers,
        })
    }

    const handleGenerateLink = () => {
        const newLink = `https://prizm.app/invite/${Math.random().toString(36).substring(7)}`
        setInviteLink(newLink)
        setLinkGenerated(true)
        syncToServer()
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink)
        setCopied(true)
        setCopyMessage(true)
        setTimeout(() => {
            setCopied(false)
            setCopyMessage(false)
        }, 2000)
    }

    const [stagedUsers, setStagedUsers] = useState([]);

    const handleInviteUser = (user) => {
        if (!stagedUsers.find((u) => u.id === user.id)) {
            setStagedUsers([...stagedUsers, user]);
        }
    };

    const handleSubmit = () => {
        if (!linkGenerated) {
            handleGenerateLink();
        }
        setInvitedUsers([...invitedUsers, ...stagedUsers]);
        syncToServer();
        setStagedUsers([]);
    };
    const handleRemoveInvitedUser = (userId) => {
        setInvitedUsers(invitedUsers.filter((u) => u.id !== userId))
        syncToServer()
    }

    const handleClose = () => {
        syncToServer()
        onClose()
    }

    const filteredUsers = mockUsers.filter(
        (user) =>
            searchQuery &&
            (user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const isUserInvitedOrStaged = (userId) => invitedUsers.some((u) => u.id === userId) || stagedUsers.some((u) => u.id === userId);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>초대</h2>
                    <button onClick={handleClose} className={styles.closeButton}>
                        <X />
                    </button>
                </div>

                <div className={styles.scrollArea}>
                    <div className={styles.content}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>사용자 검색</label>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputWrapper}>
                                    <Search className={styles.inputIcon} />
                                    <input
                                        ref={searchInputRef}
                                        placeholder="이메일로 검색"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setShowSearchResults(e.target.value.length > 0)
                                        }}
                                        onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                                        className={styles.input}
                                    />
                                </div>
                                <button
                                    ref={inviteHistoryButtonRef}
                                    onClick={() => setShowInviteHistory(!showInviteHistory)}
                                    className={styles.historyButton}
                                >
                                    <Users />
                                    초대 내역
                                </button>
                            </div>
                        </div>

                        {/* Link Section */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>링크</label>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        value={inviteLink}
                                        readOnly
                                        disabled
                                        placeholder="링크를 생성하세요"
                                        className={styles.input}
                                    />
                                    {linkGenerated && (
                                        <button
                                            onClick={handleCopyLink}
                                            className={styles.copyButton}
                                        >
                                            {copied ? <ShieldCheck /> : <Paperclip />}
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={handleGenerateLink}
                                    className={styles.generateButton}
                                >
                                    {linkGenerated ? "링크 재생성" : "링크 생성"}
                                </button>
                            </div>
                            {copyMessage && (
                                <p className={styles.copyMessage}>클립보드에 복사됨</p>
                            )}
                        </div>

                        {/* Workspace Access */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>워크스페이스 참여</label>
                            <div className={styles.radioGroup}>
                                <div className={styles.radioItem}>
                                    <input type="radio" id="anyone" name="accessType" value="anyone" checked={accessType === 'anyone'} onChange={() => setAccessType('anyone')} />
                                    <label htmlFor="anyone">
                                        링크가 있는 모든 사용자
                                    </label>
                                </div>
                                <div className={styles.radioItem}>
                                    <input type="radio" id="invited" name="accessType" value="invited" checked={accessType === 'invited'} onChange={() => setAccessType('invited')} />
                                    <label htmlFor="invited">
                                        초대한 사용자만 참여 가능
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>만료 시간</label>
                                <select className={styles.select} value={expirationMode} onChange={(e) => setExpirationMode(e.target.value)}>
                                    <option value="unlimited">무제한</option>
                                    <option value="custom">사용자 지정</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} style={{ opacity: 0 }}>입력</label>
                                <input
                                    type="number"
                                    placeholder="분"
                                    value={expirationValue}
                                    onChange={(e) => setExpirationValue(e.target.value)}
                                    disabled={expirationMode === "unlimited"}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>만료 횟수</label>
                                <select className={styles.select} value={usageMode} onChange={(e) => setUsageMode(e.target.value)}>
                                    <option value="unlimited">무제한</option>
                                    <option value="custom">사용자 지정</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} style={{ opacity: 0 }}>입력</label>
                                <input
                                    type="number"
                                    placeholder="횟수"
                                    value={usageValue}
                                    onChange={(e) => setUsageValue(e.target.value)}
                                    disabled={usageMode === "unlimited"}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>권한</label>
                                <select className={styles.select} value={memberType} onChange={(e) => setMemberType(e.target.value)}>
                                    <option value="member">멤버</option>
                                    <option value="guest">게스트</option>
                                </select>
                            </div>
                        </div>

                        {memberType === "member" ? (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>부여 그룹 선택</label>
                                <p className={styles.description}>가입 시 자동으로 부여될 그룹을 선택하세요</p>
                                <div className={styles.selectionBox}>
                                    {mockGroups.map((group) => (
                                        <div
                                            key={group.id}
                                            className={styles.selectionItem}
                                        >
                                            <label htmlFor={`group-${group.id}`}>
                                                {group.name}
                                            </label>
                                            <input
                                                type="checkbox"
                                                id={`group-${group.id}`}
                                                checked={selectedGroups.includes(group.id)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    if (checked) {
                                                        setSelectedGroups([...selectedGroups, group.id])
                                                    } else {
                                                        setSelectedGroups(selectedGroups.filter((id) => id !== group.id))
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    <Hash />
                                    참여 채널 선택
                                </label>
                                <p className={styles.description}>게스트가 접근할 수 있는 채널을 선택하세요</p>
                                <div className={styles.selectionBox}>
                                    {mockChannels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            className={styles.selectionItem}
                                        >
                                            <label htmlFor={`channel-${channel.id}`}>
                                                <div>{channel.category}</div>
                                                <div>#{channel.name}</div>
                                            </label>
                                            <input
                                                type="checkbox"
                                                id={`channel-${channel.id}`}
                                                checked={selectedChannels.includes(channel.id)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    if (checked) {
                                                        setSelectedChannels([...selectedChannels, channel.id])
                                                    } else {
                                                        setSelectedChannels(selectedChannels.filter((id) => id !== channel.id))
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.submitButton}>
                        초대 보내기
                    </button>
                </div>
            </div>

            {showInviteHistory && (
                <div
                    ref={inviteHistoryRef}
                    className={styles.dropdown}
                    style={{
                        top: `${inviteHistoryPosition.top}px`,
                        right: `${inviteHistoryPosition.right}px`,
                        width: `${inviteHistoryPosition.width}px`
                    }}
                >
                    <div className={styles.dropdownArrow}></div>
                    <div className={styles.dropdownContent}>
                        {invitedUsers.length === 0 ? (
                            <div className={styles.emptyMessage}>초대된 사용자가 없습니다</div>
                        ) : (
                            invitedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={styles.userItem}
                                >
                                    <div className={styles.avatar}>
                                        {user.avatar}
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div>{user.name}</div>
                                        <div>{user.email}</div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveInvitedUser(user.id)}
                                        className={styles.removeButton}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {showSearchResults && filteredUsers.length > 0 && (
                <div
                    ref={searchDropdownRef}
                    className={styles.dropdown}
                    style={{
                        top: `${searchDropdownPosition.top}px`,
                        left: `${searchDropdownPosition.left}px`,
                        width: `${searchDropdownPosition.width}px`
                    }}
                >
                    <div className={styles.dropdownArrow}></div>
                    <div className={styles.dropdownContent}>
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className={styles.userItem}
                            >
                                <div className={styles.avatar}>
                                    {user.avatar}
                                </div>
                                <div className={styles.userInfo}>
                                    <div>{user.name}</div>
                                    <div>{user.email}</div>
                                    <div>{user.joinMethod}</div>
                                </div>
                                <button
                                    ref={inviteHistoryButtonRef2}
                                    onClick={() => handleInviteUser(user)}
                                    disabled={isUserInvitedOrStaged(user.id)}
                                    className={styles.inviteButton}
                                >
                                    {isUserInvitedOrStaged(user.id) ? "추가됨" : "추가"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}