"use client"

import { X, Copy, Check, Search, Hash, Users } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InviteMemberModalProps {
    isOpen: boolean
    onClose: () => void
}

const mockUsers = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `사용자 ${i + 1}`,
    email: `a${i + 1}@example.com`,
    avatar: "👤",
    joinMethod: i % 2 === 0 ? "Google" : "Email",
}))

const initialInvitedUsers = Array.from({ length: 30 }, (_, i) => ({
    id: `invited-${i + 1}`,
    name: `초대된 사용자 ${i + 1}`,
    email: `invited${i + 1}@example.com`,
    avatar: "👤",
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

export default function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
    const [inviteLink, setInviteLink] = useState("")
    const [linkGenerated, setLinkGenerated] = useState(false)
    const [copied, setCopied] = useState(false)
    const [copyMessage, setCopyMessage] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [searchDropdownPosition, setSearchDropdownPosition] = useState({ top: 0, left: 0, width: 0 })

    const [accessType, setAccessType] = useState<"anyone" | "invited">("anyone")
    const [expirationMode, setExpirationMode] = useState<"unlimited" | "custom">("unlimited")
    const [expirationValue, setExpirationValue] = useState("")
    const [usageMode, setUsageMode] = useState<"unlimited" | "custom">("unlimited")
    const [usageValue, setUsageValue] = useState("")
    const [memberType, setMemberType] = useState<"member" | "guest">("member")

    const [selectedGroups, setSelectedGroups] = useState<string[]>([])
    const [selectedChannels, setSelectedChannels] = useState<string[]>([])
    const [invitedUsers, setInvitedUsers] = useState<typeof mockUsers>(initialInvitedUsers)

    const [showInviteHistory, setShowInviteHistory] = useState(false)
    const [inviteHistoryPosition, setInviteHistoryPosition] = useState({ top: 0, right: 0, width: 0 })
    const inviteHistoryRef = useRef<HTMLDivElement>(null)
    const inviteHistoryButtonRef = useRef<HTMLButtonElement>(null)

    const inviteHistoryButtonRef2 = useRef<HTMLButtonElement>(null)

    const searchDropdownRef = useRef<HTMLDivElement>(null)

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
        const handleClickOutside = (event: MouseEvent) => {
            if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
                if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
                    setShowSearchResults(false)
                }
            }
            if (inviteHistoryRef.current && !inviteHistoryRef.current.contains(event.target as Node)) {
                if (inviteHistoryButtonRef.current && !inviteHistoryButtonRef.current.contains(event.target as Node)) {
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

    const handleInviteUser = (user: (typeof mockUsers)[0]) => {
        if (!linkGenerated) {
            handleGenerateLink()
        }
        if (!invitedUsers.find((u) => u.id === user.id)) {
            setInvitedUsers([...invitedUsers, user])
            syncToServer()
        }
    }

    const handleRemoveInvitedUser = (userId: string) => {
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

    const isUserInvited = (userId: string) => invitedUsers.some((u) => u.id === userId)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-[800px] max-h-[90vh] bg-card rounded-[14px] border border-border shadow-[0_6px_20px_rgba(140,101,209,0.4)] flex flex-col">
                <div className="flex items-center justify-between h-14 px-6">
                    <h2 className="text-lg font-semibold">초대</h2>
                    <Button variant="ghost" size="icon" onClick={handleClose} className="w-8 h-8 rounded-[14px]">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <ScrollArea className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">사용자 검색</Label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        ref={searchInputRef}
                                        placeholder="이메일로 검색"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setShowSearchResults(e.target.value.length > 0)
                                        }}
                                        onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                                        className="pl-10 rounded-[14px]"
                                    />
                                </div>
                                <Button
                                    ref={inviteHistoryButtonRef}
                                    variant="outline"
                                    onClick={() => setShowInviteHistory(!showInviteHistory)}
                                    className="rounded-[14px] hover:bg-primary hover:text-primary-foreground hover:shadow-[0_6px_20px_rgba(140,101,209,0.4)] hover:-translate-y-0.5 transition-all duration-200 bg-transparent whitespace-nowrap gap-2"
                                >
                                    <Users className="w-4 h-4" />
                                    초대 내역
                                </Button>
                            </div>
                        </div>

                        {/* Link Section */}
                        <div className="space-y-3">
                            <Label className="text-sm font-semibold">링크</Label>
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <Input
                                        value={inviteLink}
                                        readOnly
                                        disabled
                                        placeholder="링크를 생성하세요"
                                        className="pr-10 rounded-[14px] disabled:opacity-100"
                                    />
                                    {linkGenerated && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleCopyLink}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[14px]"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={handleGenerateLink}
                                    className="rounded-[14px] hover:bg-primary hover:text-primary-foreground hover:shadow-[0_6px_20px_rgba(140,101,209,0.4)] hover:-translate-y-0.5 transition-all duration-200 bg-transparent whitespace-nowrap"
                                >
                                    {linkGenerated ? "링크 재생성" : "링크 생성"}
                                </Button>
                            </div>
                            {copyMessage && (
                                <p className="text-xs text-green-500 animate-in fade-in duration-200">클립보드에 복사됨</p>
                            )}
                        </div>

                        {/* Workspace Access */}
                        <div className="space-y-3">
                            <Label className="text-sm font-semibold">워크스페이스 참여</Label>
                            <RadioGroup value={accessType} onValueChange={(v) => setAccessType(v as typeof accessType)}>
                                <div className="flex items-center space-x-3 p-3 rounded-[14px] border border-border hover:bg-accent cursor-pointer transition-all">
                                    <RadioGroupItem value="anyone" id="anyone" />
                                    <Label htmlFor="anyone" className="cursor-pointer flex-1 text-sm">
                                        링크가 있는 모든 사용자
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-[14px] border border-border hover:bg-accent cursor-pointer transition-all">
                                    <RadioGroupItem value="invited" id="invited" />
                                    <Label htmlFor="invited" className="cursor-pointer flex-1 text-sm">
                                        초대한 사용자만 참여 가능
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1 space-y-2">
                                <Label className="text-sm font-semibold">만료 시간</Label>
                                <Select value={expirationMode} onValueChange={(v) => setExpirationMode(v as typeof expirationMode)}>
                                    <SelectTrigger className="rounded-[14px]">
                                        <SelectValue placeholder="선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unlimited">무제한</SelectItem>
                                        <SelectItem value="custom">사용자 지정</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-sm font-semibold opacity-0">입력</Label>
                                <Input
                                    type="number"
                                    placeholder="분"
                                    value={expirationValue}
                                    onChange={(e) => setExpirationValue(e.target.value)}
                                    disabled={expirationMode === "unlimited"}
                                    className="rounded-[14px]"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-sm font-semibold">만료 횟수</Label>
                                <Select value={usageMode} onValueChange={(v) => setUsageMode(v as typeof usageMode)}>
                                    <SelectTrigger className="rounded-[14px]">
                                        <SelectValue placeholder="선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unlimited">무제한</SelectItem>
                                        <SelectItem value="custom">사용자 지정</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-sm font-semibold opacity-0">입력</Label>
                                <Input
                                    type="number"
                                    placeholder="횟수"
                                    value={usageValue}
                                    onChange={(e) => setUsageValue(e.target.value)}
                                    disabled={usageMode === "unlimited"}
                                    className="rounded-[14px]"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-sm font-semibold">권한</Label>
                                <Select value={memberType} onValueChange={(v) => setMemberType(v as typeof memberType)}>
                                    <SelectTrigger className="rounded-[14px]">
                                        <SelectValue placeholder="선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="member">멤버</SelectItem>
                                        <SelectItem value="guest">게스트</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {memberType === "member" ? (
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold">부여 그룹 선택</Label>
                                <p className="text-xs text-muted-foreground">가입 시 자동으로 부여될 그룹을 선택하세요</p>
                                <div className="border border-border rounded-[14px] p-4 space-y-2">
                                    {mockGroups.map((group) => (
                                        <div
                                            key={group.id}
                                            className="flex items-center justify-between p-3 rounded-[14px] hover:bg-accent transition-all"
                                        >
                                            <Label htmlFor={`group-${group.id}`} className="cursor-pointer flex-1 text-sm">
                                                {group.name}
                                            </Label>
                                            <Switch
                                                id={`group-${group.id}`}
                                                checked={selectedGroups.includes(group.id)}
                                                onCheckedChange={(checked) => {
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
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    참여 채널 선택
                                </Label>
                                <p className="text-xs text-muted-foreground">게스트가 접근할 수 있는 채널을 선택하세요</p>
                                <div className="border border-border rounded-[14px] p-4 space-y-2">
                                    {mockChannels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            className="flex items-center justify-between p-3 rounded-[14px] hover:bg-accent transition-all"
                                        >
                                            <Label htmlFor={`channel-${channel.id}`} className="cursor-pointer flex-1">
                                                <div className="text-xs text-muted-foreground">{channel.category}</div>
                                                <div className="text-sm font-medium">#{channel.name}</div>
                                            </Label>
                                            <Switch
                                                id={`channel-${channel.id}`}
                                                checked={selectedChannels.includes(channel.id)}
                                                onCheckedChange={(checked) => {
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
                </ScrollArea>
            </div>

            {showInviteHistory && (
                <div
                    ref={inviteHistoryRef}
                    className="fixed z-[60] bg-card border border-border rounded-[14px] shadow-[0_8px_24px_rgba(140,101,209,0.5)] max-h-96 overflow-y-auto"
                    style={{
                        top: `${inviteHistoryPosition.top}px`,
                        right: `${inviteHistoryPosition.right}px`,
                        width: `${inviteHistoryPosition.width}px`,
                    }}
                >
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-card border-l border-t border-border rotate-45"></div>
                    <div className="p-2">
                        {invitedUsers.length === 0 ? (
                            <div className="p-4 text-center text-sm text-muted-foreground">초대된 사용자가 없습니다</div>
                        ) : (
                            invitedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-3 p-3 hover:bg-accent transition-colors rounded-[14px]"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                                        {user.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm truncate">{user.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveInvitedUser(user.id)}
                                        className="rounded-[14px] text-xs"
                                    >
                                        삭제
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Search Results Dropdown */}
            {showSearchResults && filteredUsers.length > 0 && (
                <div
                    ref={searchDropdownRef}
                    className="fixed z-[60] bg-card border border-border rounded-[14px] shadow-[0_8px_24px_rgba(140,101,209,0.5)] max-h-96 overflow-y-auto"
                    style={{
                        top: `${searchDropdownPosition.top}px`,
                        left: `${searchDropdownPosition.left}px`,
                        width: `${searchDropdownPosition.width}px`,
                    }}
                >
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-card border-l border-t border-border rotate-45"></div>
                    <div className="p-2">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center gap-3 p-3 hover:bg-accent transition-colors rounded-[14px]"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                                    {user.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">{user.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                                    <div className="text-xs text-muted-foreground">{user.joinMethod}</div>
                                </div>
                                <Button
                                    ref={inviteHistoryButtonRef2}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleInviteUser(user)}
                                    disabled={isUserInvited(user.id)}
                                    className="rounded-[14px] text-xs hover:bg-primary hover:text-primary-foreground hover:shadow-[0_6px_20px_rgba(140,101,209,0.4)] hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {isUserInvited(user.id) ? "초대됨" : "초대"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
