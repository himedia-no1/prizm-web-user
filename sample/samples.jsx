import React, { useState, useEffect, createContext, useContext, useRef } from 'react';



// --- Icon SVGs ---

const Hash = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line> </svg> );

const Users = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline> </svg> );

const Settings = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 .54 1.73v.5a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-.54-1.73v-.5a2 2 0 0 1 1-1.74l-.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle> </svg> );

const Sparkles = ({ size = 18, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z"></path><path d="m5 8 2 2"></path><path d="m14 2 2 2"></path><path d="M12 22v-2"></path><path d="m22 12-2 0"></path><path d="m3 12 2 0"></path><path d="m20 16 2 2"></path> </svg> );

const MessageSquare = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> </svg> );

const Smile = ({ size = 20 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line> </svg> );

const Send = ({ size = 20 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon> </svg> );

const Paperclip = ({ size = 20 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path> </svg> );

const X = ({ size = 18 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line> </svg> );

const CornerDownRight = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path> </svg> );

const ChevronsUpDown = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path> </svg> );

const Plus = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line> </svg> );

const Moon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path> </svg> );

const Sun = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line> </svg> );

const ChevronDown = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="m6 9 6 6 6-6"></path> </svg> );

const CreditCard = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /> </svg> );

const ArrowLeft = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="m12 19-7-7 7-7" /><path d="M19 12H5" /> </svg> );

const ChevronsLeft = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /> </svg> );

const ChevronsRight = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="m13 17 5-5-5-5" /><path d="m6 17 5-5-5-5" /> </svg> );

const Search = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /> </svg> );

const Bookmark = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /> </svg> );

const Info = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /> </svg> );

const Bell = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /> </svg> );

const Mail = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /> </svg> );

const User = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /> </svg> );

const AtSign = ({ size = 20, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path> </svg> );

const LayoutDashboard = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /> </svg> );

const Folder = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path> </svg> );

const LinkIcon = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path> </svg> ); // Renamed to avoid conflict

const Image = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path> </svg> );

const FileText = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}> <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line> </svg> );

const Edit = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> );

const Trash = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg> );

const MoreVertical = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg> );

const Share = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> );

const Translate = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 12 5 5L20 7"/><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><path d="M19 10a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1Z"/><path d="M5 8a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V8Z"/><path d="m12 8 4 4"/><path d="m16 8-4 4"/></svg> );

const AlertTriangle = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> );

const GitHub = ({ size = 20 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/> </svg> );

const Google = ({ size = 20 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"> <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.96 12.19,19.96C8.36,19.96 5.34,16.93 5.34,13.09C5.34,9.24 8.36,6.21 12.19,6.21C14.03,6.21 15.69,6.89 16.91,8.08L19.36,5.62C17.32,3.79 14.97,2.68 12.19,2.68C7.03,2.68 3,6.75 3,13.09C3,19.42 7.03,23.5 12.19,23.5C17.7,23.5 21.5,19.77 21.5,13.49C21.5,12.23 21.45,11.66 21.35,11.1Z"/> </svg> );

const Microsoft = ({ size = 20 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"> <path d="M11.383 11.383H2.86v8.523h8.523V11.383zM21.14 2.86h-8.523v8.523H21.14V2.86zM11.383 2.86H2.86v8.523h8.523V2.86zM21.14 11.383h-8.523v8.523H21.14V11.383z" /> </svg> );

// --- END Icon SVGs ---





// --- Mock 데이터 ---

const mockWorkspaces = [ { id: 'ws1', name: 'Prizm Dev', icon: 'P' }, { id: 'ws2', name: 'Marketing', icon: 'M' }, { id: 'ws3', name: 'Design', icon: 'D' }, ];

const mockCategories = [ { id: 'cat1', name: '📈 GENERAL', channels: [ { id: 'c1', name: 'general', unread: 2 }, { id: 'c2', name: 'announcements', unread: 0 }, ] }, { id: 'cat2', name: '💻 DEVELOPMENT', channels: [ { id: 'c3', name: 'frontend', unread: 0 }, { id: 'c4', name: 'backend', unread: 1 }, { id: 'c5', name: 'design-system', unread: 0 }, ] }, { id: 'cat3', name: '💬 RANDOM', channels: [ { id: 'c6', name: 'random', unread: 0 }, { id: 'c7', name: 'gaming', unread: 0 }, ] } ];

const mockUsers = { 'u1': { id: 'u1', name: 'Alice', realName: 'Alice Kim', email: 'alice@example.com', phone: '010-1234-5678', avatar: 'https://placehold.co/80x80/8C65D1/FFFFFF?text=A', status: 'online', role: 'Owner', socialProvider: 'Google' }, 'u2': { id: 'u2', name: 'Bob', realName: 'Bob Lee', email: 'bob@sample.net', phone: null, avatar: 'https://placehold.co/40x40/D946EF/FFFFFF?text=B', status: 'online', role: 'Member', socialProvider: 'GitHub' }, 'u3': { id: 'u3', name: 'Charlie', realName: 'Charlie Park', email: 'charlie@test.org', phone: '010-1111-2222', avatar: 'https://placehold.co/40x40/FDB022/FFFFFF?text=C', status: 'offline', role: 'Member', socialProvider: 'Microsoft' }, 'u4': { id: 'u4', name: 'David', realName: 'David Choi', email: 'david@mail.com', phone: null, avatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=D', status: 'online', role: 'Guest', socialProvider: 'Google' }, 'u5': { id: 'u5', name: 'Eve', realName: 'Eve Seo', email: 'eve@company.io', phone: '010-9876-5432', avatar: 'https://placehold.co/40x40/344054/FFFFFF?text=E', status: 'online', role: 'Manager', socialProvider: 'GitHub' }, };

const mockMessages = [ { id: 'm1', userId: 'u1', text: 'Hey team, check out the new mockups!', timestamp: '10:30 AM', reactions: {'👍': 2, '🔥': 1}, threadId: 't1' }, { id: 'm2', userId: 'u2', text: 'Wow, these look amazing. Great job @Alice!', timestamp: '10:31 AM', reactions: {}, threadId: null }, { id: 'm3', userId: 'u1', text: 'Thanks! Let me know if you have any feedback.', timestamp: '10:31 AM', reactions: {'❤️': 1}, threadId: null, pinned: true }, { id: 'm4', userId: 'u3', text: 'I really like the new color palette.', timestamp: '10:35 AM', reactions: {}, threadId: 't1' }, { id: 'm5', userId: 'u2', text: 'Agreed. The new CTA button is much clearer.', timestamp: '10:36 AM', reactions: {'👍': 1}, threadId: 't1' }, { id: 'm6', userId: 'u4', text: 'Code review for PR #12 is pending. Need someone to take a look.', timestamp: '11:00 AM', reactions: {'👀': 1}, threadId: 't2', pinned: true }, ];

const mockThreadMessages = { 't1': [ { id: 'tm1', userId: 'u3', text: 'I really like the new color palette.', timestamp: '10:35 AM' }, { id: 'tm2', userId: 'u2', text: 'Agreed. The new CTA button is much clearer.', timestamp: '10:36 AM' }, { id: 'tm3', userId: 'u1', text: 'Thanks for the feedback! I was a bit unsure about the blue.', timestamp: '10:40 AM' }, ], 't2': [ { id: 'tm4', userId: 'u1', text: 'On it!', timestamp: '11:01 AM' }, ] };

const mockDMs = [ { id: 'dm1', userId: 'u2' }, { id: 'dm2', userId: 'u3' }, { id: 'dm3', userId: 'u4' }, ];



// --- Context ---

const AppContext = createContext(null);



// --- 컴포넌트 ---



// 1. 로딩 스피너

const Spinner = () => ( <div className="spinner-container"> <div className="spinner"></div> </div> );



// 3. 좌측 사이드바

const LeftSidebar = ({

                         currentWorkspace, currentChannelId, currentView, onSelectChannel, onSelectView, onSwitchWorkspace, onOpenProfileModal, onNavigateToSettings, onNavigateToUserSettings, onNavigateToCreateWorkspace, onOpenModal, onCollapse

                     }) => {

    const { isDarkMode, toggleDarkMode } = useContext(AppContext);

    const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);

    const [openCategories, setOpenCategories] = useState({ 'cat1': true, 'cat2': true, 'cat3': true });

    const toggleCategory = (catId) => { setOpenCategories(prev => ({ ...prev, [catId]: !prev[catId] })); };



    return (

        <aside className="left-sidebar">

            <header className="sidebar-header" onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}>

                <h1 className="sidebar-header__title">{currentWorkspace.name}</h1>

                <button onClick={(e) => { e.stopPropagation(); onCollapse(); }} className="sidebar-header__collapse-button"> <ChevronsLeft size={18} /> </button>

            </header>

            {isWorkspaceDropdownOpen && (

                <div className="ws-dropdown">

                    <div className="ws-dropdown__current-ws"> <span className="ws-dropdown__button-icon">{currentWorkspace.icon}</span> <span className="ws-dropdown__button-name">{currentWorkspace.name}</span> <button className="ws-dropdown__settings-button" onClick={() => { onNavigateToSettings(); setIsWorkspaceDropdownOpen(false); }}> <Settings size={16} /> </button> </div>

                    <button className="ws-dropdown__button ws-dropdown__action-button" onClick={() => { onOpenModal('createCategory'); setIsWorkspaceDropdownOpen(false); }}> <Plus size={16} /> <span>카테고리 만들기</span> </button>

                    <button className="ws-dropdown__button ws-dropdown__action-button" onClick={() => { onOpenModal('invite'); setIsWorkspaceDropdownOpen(false); }}> <Mail size={16} /> <span>멤버 초대하기</span> </button>

                    <div className="ws-dropdown__divider"></div>

                    {mockWorkspaces .filter(ws => ws.id !== currentWorkspace.id) .map(ws => ( <button key={ws.id} onClick={() => { onSwitchWorkspace(ws.id); setIsWorkspaceDropdownOpen(false); }} className="ws-dropdown__button"> <span className="ws-dropdown__button-icon">{ws.icon}</span> <span className="ws-dropdown__button-name">{ws.name}</span> </button> ))}

                    <div className="ws-dropdown__divider"></div>

                    <button className="ws-dropdown__button ws-dropdown__new-ws" onClick={() => { onNavigateToCreateWorkspace(); setIsWorkspaceDropdownOpen(false); }}> <Plus size={16} /> <span>새 워크스페이스 생성</span> </button>

                </div>

            )}

            <nav className="sidebar-top-nav">

                <button className={`sidebar-menu-button ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => onSelectView('dashboard')}> <LayoutDashboard size={18} /> <span>Dashboard</span> </button>

                <button className={`sidebar-menu-button ${currentView === 'search' ? 'active' : ''}`} onClick={() => onSelectView('search')}> <Search size={18} /> <span>Search</span> </button>

                <button className={`sidebar-menu-button ${currentView === 'directory' ? 'active' : ''}`} onClick={() => onSelectView('directory')}> <Users size={18} /> <span>Directory</span> </button>

            </nav>

            <nav className="sidebar-nav">

                <div className="nav-group">

                    <div className="nav-group__header"> <span>Channels</span> </div>

                    {mockCategories.map(category => {

                        const isOpen = !!openCategories[category.id];

                        return (

                            <div key={category.id} className="nav-category">

                                <div className="nav-category__header-wrapper"> <button className="nav-category__header" onClick={() => toggleCategory(category.id)}> <ChevronDown size={14} className={`nav-category__icon ${!isOpen ? 'collapsed' : ''}`} /> <span>{category.name}</span> </button> <button className="nav-category__add-channel-button"> <Plus size={12} /> </button> </div>

                                {isOpen && ( <ul className="nav-category__list"> {category.channels.map(channel => { const isActive = currentView === 'channel' && currentChannelId === channel.id; return ( <li key={channel.id}> <button onClick={() => onSelectChannel(channel.id)} className={`channel-button ${isActive ? 'active' : ''}`} > <span className="channel-button__name"> <Hash size={16} /> <span>{channel.name}</span> </span> {channel.unread > 0 && ( <span className="channel-button__unread">{channel.unread}</span> )} </button> </li> ); })} </ul> )}

                            </div>

                        );

                    })}

                </div>

                <div className="nav-group">

                    <div className="nav-group__header"> <span>Direct Messages</span> <button className="nav-category__add-button"><Plus size={14} /></button> </div>

                    <ul className="nav-category__list" style={{paddingLeft: 0}}>

                        {mockDMs.map(dm => {

                            const user = mockUsers[dm.userId]; const isActive = currentView === 'channel' && currentChannelId === dm.id;

                            return ( <li key={dm.id}> <button onClick={() => onSelectChannel(dm.id)} className={`channel-button ${isActive ? 'active' : ''}`} > <span className="channel-button__name"> <div className="dm-button__avatar-container"> <img src={user.avatar} alt={user.name} className="dm-button__avatar" /> <span className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`}></span> </div> <span>{user.name}</span> </span> </button> </li> );

                        })}

                    </ul>

                </div>

            </nav>

            <div className="sidebar-footer">

                <button className="profile-info-button" onClick={onOpenProfileModal}> <img src={mockUsers['u1'].avatar} alt="My Avatar" className="profile-info__avatar" /> <div> <span className="profile-info__name">{mockUsers['u1'].name}</span> <span className="profile-info__status">Online</span> </div> </button>

                <div className="profile-actions"> <button onClick={onNavigateToUserSettings} className="profile-action-button"> <Settings size={18} /> </button> <button onClick={() => onOpenModal('notifications')} className="profile-action-button"> <Bell size={18} /> </button> <button onClick={toggleDarkMode} className="theme-toggle-button"> {isDarkMode ? <Sun size={18} /> : <Moon size={18} />} </button> </div>

            </div>

        </aside>

    );

};



// 4. 메시지 입력창

const MessageInput = ({ channelName, onToggleAI, onOpenModal }) => {

    const textareaRef = useRef(null); const [message, setMessage] = useState('');

    const handleInput = (e) => { setMessage(e.target.value); const textarea = textareaRef.current; if (textarea) { textarea.style.height = 'auto'; const scrollHeight = textarea.scrollHeight; textarea.style.height = `${Math.min(scrollHeight, 200)}px`; } };

    return (

        <div className="message-input-container"> <div className="message-input-wrapper"> <button className="message-input__attach-button" onClick={() => onOpenModal('fileUpload')}> <Paperclip size={22} /> </button> <div className="message-input__textarea-wrapper"> <textarea ref={textareaRef} rows="1" value={message} onInput={handleInput} placeholder={`Message #${channelName}`} className="message-input__textarea" style={{ minHeight: '50px' }} /> <div className="message-input__buttons"> <button onClick={() => onOpenModal('mention')} className="message-input__mention-button"> <AtSign size={20} /> </button> <button> <Smile size={20} /> </button> <button className="message-input__send-button" disabled={!message.trim()}> <Send size={20} /> </button> </div> </div> </div> </div>

    );

};



// 5. 메시지 컨텍스트 메뉴

const MessageContextMenu = ({

                                message, isMyMessage, position, onClose, onPin, onStartThread, onReply, onForward, onShare, onEdit, onDelete, onReactEmoji, onTranslate, onAnalyze, onReport

                            }) => {

    if (!position) return null;

    const menuRef = useRef(null);

    const [showFullMenu, setShowFullMenu] = useState(false);



    useEffect(() => {

        const handleClickOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) { onClose(); } };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [onClose]);



    const commonActions = [

        { key: 'react', icon: <Smile size={18}/>, handler: () => { console.log("Open Emoji Picker"); onClose(); } },

        { key: 'reply', icon: <CornerDownRight size={18} />, handler: () => { onReply(message); onClose(); } },

        { key: 'thread', icon: <MessageSquare size={18} />, handler: () => { onStartThread(message); onClose(); } },

    ];



    const fullMenuActions = isMyMessage

        ? [ { key: 'pin', icon: <Bookmark size={16} />, text: '고정하기', handler: () => { onPin(message); onClose(); } }, { key: 'threadFull', icon: <MessageSquare size={16} />, text: '스레드 시작', handler: () => { onStartThread(message); onClose(); } }, { key: 'replyFull', icon: <CornerDownRight size={16} />, text: '답글달기', handler: () => { onReply(message); onClose(); } }, { key: 'forward', icon: <Send size={16} />, text: '전달하기', handler: () => { onForward(message); onClose(); } }, { key: 'share', icon: <Share size={16} />, text: '공유', handler: () => { onShare(message); onClose(); } }, { divider: true }, { key: 'edit', icon: <Edit size={16} />, text: '수정', handler: () => { onEdit(message); onClose(); } }, { key: 'delete', icon: <Trash size={16} />, text: '삭제', danger: true, handler: () => { onDelete(message); onClose(); } }, ]

        : [ { key: 'pin', icon: <Bookmark size={16} />, text: '고정하기', handler: () => { onPin(message); onClose(); } }, { key: 'threadFull', icon: <MessageSquare size={16} />, text: '스레드 시작', handler: () => { onStartThread(message); onClose(); } }, { key: 'replyFull', icon: <CornerDownRight size={16} />, text: '답글달기', handler: () => { onReply(message); onClose(); } }, { key: 'forward', icon: <Send size={16} />, text: '전달하기', handler: () => { onForward(message); onClose(); } }, { key: 'share', icon: <Share size={16} />, text: '공유', handler: () => { onShare(message); onClose(); } }, { divider: true }, { key: 'translate', icon: <Translate size={16} />, text: '번역하기', handler: () => { onTranslate(message); onClose(); } }, { key: 'analyze', icon: <Sparkles size={16} />, text: 'AI로 분석', handler: () => { onAnalyze(message); onClose(); } }, { divider: true }, { key: 'report', icon: <AlertTriangle size={16} />, text: '신고하기', danger: true, handler: () => { onReport(message); onClose(); } }, ];



    return (

        <div ref={menuRef} className={`message-context-menu ${showFullMenu ? 'full' : 'action-bar'}`} style={{ top: position.y, left: position.x }} onClick={(e) => e.stopPropagation()}>

            {!showFullMenu ? ( <div className="message-action-bar"> {commonActions.map(action => ( <button key={action.key} onClick={action.handler}> {action.icon} </button> ))} {!isMyMessage && <button onClick={() => { onTranslate(message); onClose(); }}> <Translate size={18}/> </button>} <button onClick={() => setShowFullMenu(true)} className="more-button"><MoreVertical size={18} /></button> </div> )

                : ( <> {fullMenuActions.map((action, index) => action.divider ? <div key={`divider-${index}`} className="context-menu-divider"></div> : <button key={action.key} onClick={action.handler} className={action.danger ? 'danger' : ''}> {action.icon} <span>{action.text}</span> </button> )} </> )}

        </div>

    );

};



// 6. 개별 메시지 컴포넌트

const Message = ({ message, onStartThread, onOpenUserProfile, onOpenContextMenu, onTranslateRequest, onAnalysisRequest }) => {

    const user = mockUsers[message.userId]; const hasThread = message.threadId; const replyCount = hasThread ? (mockThreadMessages[message.threadId]?.length || 0) : 0;

    const [showTranslation, setShowTranslation] = useState(false); const [translatedText, setTranslatedText] = useState(null);

    const [showAnalysis, setShowAnalysis] = useState(false); const [analysisResult, setAnalysisResult] = useState(null);

    const handleClick = (event) => { event.preventDefault(); event.stopPropagation(); const rect = event.currentTarget.getBoundingClientRect(); onOpenContextMenu(message, { x: rect.left, y: rect.top - 40 }); };



    return (

        <div className="message-container" onClick={handleClick}>

            <img src={user.avatar} alt={user.name} className="message__avatar" onClick={(e) => { e.stopPropagation(); onOpenUserProfile(user.id); }} style={{ cursor: 'pointer' }} />

            <div className="message__content">

                <div className="message__header"> <span className="message__username" onClick={(e) => { e.stopPropagation(); onOpenUserProfile(user.id); }} style={{ cursor: 'pointer' }}> {user.name} </span> <span className="message__timestamp">{message.timestamp}</span> </div>

                <p className="message__text">{message.text}</p>

                {showTranslation && ( <div className="message-translation"> {translatedText ? ( <> <p>{translatedText}</p> <button>더 자연스럽게 번역 (AI)</button> </> ) : ( <p className="loading-text">번역 중...</p> )} </div> )}

                {showAnalysis && ( <div className="message-analysis"> {analysisResult ? ( <p><strong>AI 분석:</strong> {analysisResult}</p> ) : ( <p className="loading-text">분석 중...</p> )} </div> )}

                {Object.keys(message.reactions).length > 0 && ( <div className="message__reactions"> {Object.entries(message.reactions).map(([emoji, count]) => ( <button key={emoji} className="reaction-button"> <span>{emoji}</span> <span className="reaction-button__count">{count}</span> </button> ))} </div> )}

                {hasThread && ( <button onClick={(e) => { e.stopPropagation(); onStartThread(message); }} className="message__thread-reply"> {replyCount} {replyCount > 1 ? 'replies' : 'reply'} </button> )}

            </div>

        </div>

    );

};



// 7. 메인 채팅 영역

const MainChatArea = ({ channel, onStartThread, onToggleAI, isAiModalOpen, onOpenModal, onOpenUserProfile, onOpenContextMenu, onTranslateRequest, onAnalysisRequest }) => {

    if (!channel) return null;

    return (

        <main className="main-chat-area">

            <header className="chat-header">

                <div> <h2 className="chat-header__title"> {channel.name.startsWith('dm-') ? <Users size={20} /> : <Hash size={20} />} <span>{ channel.name.startsWith('dm-') ? mockUsers[mockDMs.find(dm => dm.id === channel.id)?.userId]?.name || 'DM' : channel.name }</span> </h2> <p className="chat-header__topic">3 members | Topic: General discussion</p> </div>

                <div className="chat-header__actions"> <button onClick={() => onOpenModal('search')}> <Search size={20} /> </button> <button onClick={() => onOpenUserProfile('u2')}> <Users size={20} /> </button> <button onClick={() => onOpenModal('pinned')}> <Bookmark size={20} /> </button> <button onClick={() => onOpenModal('threads')}> <MessageSquare size={20} /> </button> <button onClick={() => onOpenModal('channelFiles')}> <Folder size={20} /> </button> <button onClick={() => onOpenModal('info')}> <Info size={20} /> </button> </div>

            </header>

            <div className="message-list"> {mockMessages.map(msg => ( <Message key={msg.id} message={msg} onStartThread={onStartThread} onOpenUserProfile={onOpenUserProfile} onOpenContextMenu={onOpenContextMenu} onTranslateRequest={onTranslateRequest} onAnalysisRequest={onAnalysisRequest} /> ))} </div>

            <MessageInput channelName={channel.name.startsWith('dm-') ? 'DM' : channel.name} onToggleAI={onToggleAI} onOpenModal={onOpenModal} />

            {!isAiModalOpen && ( <button onClick={onToggleAI} className="ai-fab"> <Sparkles size={28} /> </button> )}

        </main>

    );

};



// 8. 대시보드 뷰

const DashboardView = () => (

    <main className="main-view dashboard-view"> <header className="view-header"> <h2>Dashboard</h2> </header> <div className="view-content"> <div className="dashboard-cards"> <div className="dashboard-card"><strong>2</strong><p>읽지 않은 채널</p></div> <div className="dashboard-card"><strong>5</strong><p>활성 스레드</p></div> <div className="dashboard-card"><strong>12</strong><p>온라인 멤버</p></div> <div className="dashboard-card"><strong>3</strong><p>고정 메시지</p></div> </div> </div> </main>

);



// 9. 검색 뷰

const SearchView = () => (

    <main className="main-view search-view"> <header className="view-header"> <h2>Search Workspace</h2> </header> <div className="view-content"> <div className="settings-form-group" style={{ marginBottom: '1.5rem' }}> <input type="text" placeholder="워크스페이스 전체에서 메시지, 파일 검색..." /> </div> <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>검색어를 입력하세요.</p> </div> </main>

);



// 10. 디렉토리 뷰

const DirectoryView = ({ onOpenUserProfile }) => (

    <main className="main-view directory-view"> <header className="view-header"> <h2>Directory</h2> </header> <div className="view-content"> <div className="settings-form-group" style={{ marginBottom: '1.5rem' }}> <input type="text" placeholder="멤버 이름 검색..." /> </div> <div className="directory-list"> {Object.values(mockUsers).map(user => ( <div key={user.id} className="directory-item" onClick={() => onOpenUserProfile(user.id)} style={{ cursor: 'pointer' }}> <img src={user.avatar} alt={user.name} /> <span>{user.name}</span> <span className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`} style={{ marginLeft: 'auto' }}></span> </div> ))} </div> </div> </main>

);



// 11. 스레드 사이드바

const ThreadSidebar = ({ threadMessage, onClose }) => {

    const originalUser = mockUsers[threadMessage.userId]; const replies = mockThreadMessages[threadMessage.threadId] || []; const textareaRef = useRef(null);

    const handleInput = (e) => { const textarea = textareaRef.current; if (textarea) { textarea.style.height = 'auto'; const scrollHeight = textarea.scrollHeight; textarea.style.height = `${Math.min(scrollHeight, 150)}px`; } };

    return ( <aside className="thread-sidebar"> <header className="thread-header"> <div> <h3 className="thread-header__title">Thread</h3> <p className="thread-header__subtitle">Replies to {originalUser.name}</p> </div> <button onClick={onClose} className="thread-header__close-button"> <X size={18} /> </button> </header> <div className="thread-original-message"> <div className="message__content" style={{ display: 'flex', gap: '0.75rem' }}> <img src={originalUser.avatar} alt={originalUser.name} className="message__avatar" /> <div style={{flex: 1}}> <div className="message__header"> <span className="message__username">{originalUser.name}</span> <span className="message__timestamp">{threadMessage.timestamp}</span> </div> <p className="message__text">{threadMessage.text}</p> </div> </div> </div> <div className="thread-replies"> {replies.map(reply => { const replyUser = mockUsers[reply.userId]; return ( <div key={reply.id} className="thread-reply"> <img src={replyUser.avatar} alt={replyUser.name} className="message__avatar" /> <div> <div className="message__header"> <span className="message__username">{replyUser.name}</span> <span className="message__timestamp">{reply.timestamp}</span> </div> <p className="message__text">{reply.text}</p> </div> </div> ); })} </div> <div className="thread-reply-input-container"> <div className="thread-reply-input-wrapper"> <textarea ref={textareaRef} rows="1" placeholder="Reply to thread..." className="thread-reply-input__textarea" style={{ minHeight: '48px' }} onInput={handleInput} /> <button className="thread-reply-input__send-button"> <Send size={18} /> </button> </div> </div> </aside> );

};



// 12. AI 어시스턴트 모달

const AIAssistantModal = ({ onClose, onOpenModal }) => {

    const [chatHistory, setChatHistory] = useState([ { id: 'ai-init', type: 'ai', text: '안녕하세요! 무엇을 도와드릴까요?' }, { id: 'user-1', type: 'user', text: '최근 frontend 채널의 주요 논의 내용을 요약해줘.' }, { id: 'ai-1', type: 'ai', text: '네, frontend 채널에서는 최근 디자인 시스템 업데이트와 관련하여 활발한 논의가 있었습니다. 주요 내용은 다음과 같습니다...' }, ]);

    const [sessions, setSessions] = useState([ { id: 'session1', name: 'Frontend 채널 요약', timestamp: '오후 2:30' }, { id: 'session2', name: '새 기능 아이디어', timestamp: '오전 10:15' }, ]);

    const [currentSessionId, setCurrentSessionId] = useState('session1');

    const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);

    const [newMessage, setNewMessage] = useState('');

    const chatEndRef = useRef(null);

    const handleSendMessage = () => { if (!newMessage.trim()) return; const newUserMessage = { id: `user-${Date.now()}`, type: 'user', text: newMessage }; const aiResponse = { id: `ai-${Date.now()}`, type: 'ai', text: `"${newMessage}"에 대한 답변입니다.` }; setChatHistory(prev => [...prev, newUserMessage, aiResponse]); setNewMessage(''); };

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);



    return (

        <div className="ai-modal">

            <header className="ai-modal__header" onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)} style={{ cursor: 'pointer' }}>

                <div className="ai-modal__title"> <Sparkles size={18} className="ai-modal__title-icon" /> <span>{sessions.find(s => s.id === currentSessionId)?.name || 'AI Assistant'}</span> <ChevronsUpDown size={16} className="ai-modal__header-chevron" /> </div>

                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="ai-modal__close-button"> <X size={18} /> </button>

            </header>

            {isSessionDropdownOpen && (

                <div className="ai-session-dropdown">

                    <button className="ai-session-item new-chat"> <Plus size={16}/> 새 채팅 시작 </button>

                    <div className="ws-dropdown__divider"></div>

                    {sessions.map(session => ( <button key={session.id} className={`ai-session-item ${session.id === currentSessionId ? 'active' : ''}`} onClick={() => { setCurrentSessionId(session.id); setIsSessionDropdownOpen(false); }}> <span className="ai-session-name">{session.name}</span> <span className="ai-session-time">{session.timestamp}</span> </button> ))}

                </div>

            )}

            <div className="ai-modal__chat"> {chatHistory.map(msg => ( <div key={msg.id} className={`ai-modal__chat-bubble ${msg.type}`}> <p>{msg.text}</p> </div> ))} <div ref={chatEndRef} /> </div>

            <div className="ai-modal__input-container">

                <div className="ai-modal__input-wrapper">

                    <button className="ai-modal__attach-button" onClick={() => onOpenModal('fileUpload')}> <Paperclip size={18}/> </button>

                    <input type="text" placeholder="AI에게 질문하거나 파일을 첨부하세요..." className="ai-modal__input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />

                    <button className="ai-modal__send-button" onClick={handleSendMessage}> <Send size={18} /> </button>

                </div>

            </div>

        </div>

    );

};



// 13. 프로필 설정 모달 (사용자 본인)

const ProfileSettingsModal = ({ user, onClose }) => {

    const [status, setStatus] = useState(user.status); const [username, setUsername] = useState(user.name);

    return ( <div className="profile-modal-overlay" onClick={onClose}> <div className="profile-modal" onClick={(e) => e.stopPropagation()}> <header className="profile-modal__header"> <h3>프로필 설정</h3> <button onClick={onClose} className="profile-modal__close-button"> <X size={18} /> </button> </header> <div className="profile-modal__banner"></div> <div className="profile-modal__content"> <div className="profile-modal__avatar-section"> <img src={user.avatar} alt={user.name} className="profile-modal__avatar" /> <button className="profile-modal__avatar-edit">변경</button> </div> <div className="profile-modal__form-group"> <label htmlFor="username-modal">표시 이름</label> <input id="username-modal" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> </div> <div className="profile-modal__form-group"> <label htmlFor="status-modal">상태</label> <select id="status-modal" value={status} onChange={(e) => setStatus(e.target.value)} > <option value="online">Online</option> <option value="offline">Offline</option> </select> </div> <button className="profile-modal__save-button"> 저장 </button> </div> </div> </div> );

};



// 14. 다른 사용자 프로필 모달

const UserProfileModal = ({ userId, onClose, onCreateDM }) => {

    const user = mockUsers[userId]; if (!user) return null;

    return ( <div className="profile-modal-overlay" onClick={onClose}> <div className="profile-modal user-profile-modal" onClick={(e) => e.stopPropagation()}> <header className="profile-modal__header" style={{borderBottom: 'none'}}> <button onClick={onClose} className="profile-modal__close-button" style={{marginLeft: 'auto'}}> <X size={18} /> </button> </header> <div className="profile-modal__banner" style={{height: '80px'}}></div> <div className="profile-modal__content" style={{paddingTop: 0}}> <div className="profile-modal__avatar-section" style={{marginTop: '-40px', marginBottom: '1rem'}}> <img src={user.avatar} alt={user.name} className="profile-modal__avatar" style={{width: '80px', height: '80px'}} /> </div> <h3 className="user-profile-modal__display-name">{user.name}</h3> <p className="user-profile-modal__status"> <span className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`} style={{position: 'static', display: 'inline-block', marginRight: '4px'}}></span> {user.status === 'online' ? 'Online' : 'Offline'} </p> <div className="user-profile-modal__details"> <div><strong>실제 이름:</strong> {user.realName}</div> <div><strong>이메일:</strong> {user.email}</div> {user.phone && <div><strong>전화번호:</strong> {user.phone}</div>} <div><strong>가입 경로:</strong> {user.socialProvider}</div> <div><strong>역할:</strong> {user.role}</div> </div> <button className="profile-modal__save-button user-profile-modal__dm-button" onClick={() => { onCreateDM(user.id); onClose(); }}> <MessageSquare size={16} /> DM 보내기 </button> </div> </div> </div> );

};



// 15. 워크스페이스 페이지 (메인 레이아웃)

const WorkspacePage = ({ onNavigateToSettings, onNavigateToUserSettings, onNavigateToCreateWorkspace }) => {

    const [currentWorkspace, setCurrentWorkspace] = useState(mockWorkspaces[0]); const [currentChannelId, setCurrentChannelId] = useState('c1'); const [currentThread, setCurrentThread] = useState(null); const [isAiModalOpen, setIsAiModalOpen] = useState(false); const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false); const [activeModal, setActiveModal] = useState(null); const [currentView, setCurrentView] = useState('channel'); const [userProfileModalUserId, setUserProfileModalUserId] = useState(null); const [contextMenu, setContextMenu] = useState({ visible: false, message: null, position: null });

    const findChannel = (channelId) => { for (const category of mockCategories) { const channel = category.channels.find(c => c.id === channelId); if (channel) return channel; } return null; };

    const currentChannel = currentView === 'channel' ? findChannel(currentChannelId) || mockDMs.find(dm => dm.id === currentChannelId) || { id: currentChannelId, name: `dm-${currentChannelId}` } : null;

    const handleSelectChannel = (channelId) => { setCurrentChannelId(channelId); setCurrentThread(null); setCurrentView('channel'); };

    const handleSelectView = (view) => { setCurrentView(view); setCurrentThread(null); };

    const handleStartThread = (message) => { setActiveModal(null); setCurrentThread(message); };

    const handleSwitchWorkspace = (workspaceId) => { const newWorkspace = mockWorkspaces.find(ws => ws.id === workspaceId); if (newWorkspace) { setCurrentWorkspace(newWorkspace); setCurrentChannelId('c1'); setCurrentThread(null); setCurrentView('channel'); } };

    const openModal = (modalType) => { setActiveModal(modalType); }; const openProfileModal = () => { setIsProfileModalOpen(true); }; const openUserProfileModal = (userId) => { setUserProfileModalUserId(userId); }; const openContextMenu = (message, position) => { setContextMenu({ visible: true, message, position }); }; const closeContextMenu = () => { setContextMenu({ visible: false, message: null, position: null }); };

    const handlePinMessage = (message) => console.log('Pin:', message.id); const handleReply = (message) => console.log('Reply to:', message.id); const handleForward = (message) => console.log('Forward:', message.id); const handleShare = (message) => console.log('Share:', message.id); const handleEdit = (message) => console.log('Edit:', message.id); const handleDelete = (message) => console.log('Delete:', message.id); const handleAddReaction = (emoji) => { if (contextMenu.message) { console.log(`React ${emoji} to ${contextMenu.message.id}`); } }; const handleTranslateRequest = (messageId, callback) => { console.log('Request Translate:', messageId); setTimeout(() => { const originalMessage = mockMessages.find(m => m.id === messageId)?.text || "원본 메시지"; callback(`(번역됨) ${originalMessage}`); }, 800); }; const handleAnalysisRequest = (messageId, callback) => { console.log('Request Analysis:', messageId); setTimeout(() => { callback(`이 메시지는 긍정적인 내용을 담고 있습니다.`); }, 1200); }; const handleReport = (message) => console.log('Report:', message.id); const handleCreateDM = (targetUserId) => { console.log('Create DM with:', targetUserId); const dmId = `dm-${targetUserId}`; if (!mockDMs.find(dm => dm.id === dmId)) { /* TODO: Update state */ } handleSelectChannel(dmId); };



    const renderMainContent = () => {

        switch(currentView) {

            case 'dashboard': return <DashboardView />;

            case 'search': return <SearchView />;

            case 'directory': return <DirectoryView onOpenUserProfile={openUserProfileModal} />;

            case 'channel': default:

                if (!currentChannel) { return <main className="main-chat-area"><p style={{textAlign:'center', marginTop:'2rem', color:'var(--text-secondary)'}}>채널을 선택하세요.</p></main>; }

                return <MainChatArea channel={currentChannel} onStartThread={handleStartThread} onToggleAI={() => setIsAiModalOpen(true)} isAiModalOpen={isAiModalOpen} onOpenModal={openModal} onOpenUserProfile={openUserProfileModal} onOpenContextMenu={openContextMenu} onTranslateRequest={handleTranslateRequest} onAnalysisRequest={handleAnalysisRequest} />;

        }

    };



    return (

        <div className={`workspace-page ${isLeftSidebarCollapsed ? 'left-sidebar-collapsed' : ''}`}>

            {isLeftSidebarCollapsed && ( <button className="sidebar-open-button" onClick={() => setIsLeftSidebarCollapsed(false)} > <ChevronsRight size={18} /> </button> )}

            <LeftSidebar currentWorkspace={currentWorkspace} currentChannelId={currentChannelId} currentView={currentView} onSelectChannel={handleSelectChannel} onSelectView={handleSelectView} onSwitchWorkspace={handleSwitchWorkspace} onOpenProfileModal={openProfileModal} onNavigateToSettings={onNavigateToSettings} onNavigateToUserSettings={onNavigateToUserSettings} onNavigateToCreateWorkspace={onNavigateToCreateWorkspace} onOpenModal={openModal} onCollapse={() => setIsLeftSidebarCollapsed(true)} />

            {renderMainContent()}

            {currentThread && ( <ThreadSidebar threadMessage={currentThread} onClose={() => setCurrentThread(null)} /> )}

            {isAiModalOpen && ( <AIAssistantModal onClose={() => setIsAiModalOpen(false)} onOpenModal={openModal}/> )}

            {isProfileModalOpen && ( <ProfileSettingsModal user={mockUsers['u1']} onClose={() => setIsProfileModalOpen(false)} /> )}

            {userProfileModalUserId && ( <UserProfileModal userId={userProfileModalUserId} onClose={() => setUserProfileModalUserId(null)} onCreateDM={handleCreateDM} /> )}

            {activeModal && ( <GenericModal modalType={activeModal} onClose={() => setActiveModal(null)} onOpenThread={handleStartThread} /> )}

            {contextMenu.visible && (

                <MessageContextMenu

                    message={contextMenu.message} isMyMessage={contextMenu.message?.userId === 'u1'} position={contextMenu.position} onClose={closeContextMenu}

                    onPin={handlePinMessage} onStartThread={(msg) => { handleStartThread(msg); closeContextMenu(); }} onReply={handleReply} onForward={handleForward} onShare={handleShare} onEdit={handleEdit} onDelete={handleDelete}

                    onReactEmoji={handleAddReaction}

                    onTranslate={(msg) => { /* Message 컴포넌트 내부에서 처리 */ closeContextMenu(); }}

                    onAnalyze={(msg) => { /* Message 컴포넌트 내부에서 처리 */ closeContextMenu(); }}

                    onReport={handleReport}

                />

            )}

        </div>

    );

};



// 16. Social Button

const SocialButton = ({ icon, provider, onClick }) => { return ( <button onClick={onClick} className="social-button"> {icon} <span>{provider}로 계속하기</span> </button> ); };

// 17. Login Page

const LoginPage = ({ onLogin }) => { return ( <div className="login-page"> <div className="login-card"> <div className="login-header"> <Sparkles size={48} className="login-icon" /> <h1 className="login-title">PRIZM</h1> <p className="login-subtitle">AI 기반 개발자 협업 메신저</p> </div> <div className="login-buttons"> <SocialButton provider="GitHub" icon={<GitHub size={22} />} onClick={onLogin} /> <SocialButton provider="Google" icon={<Google size={22} />} onClick={onLogin} /> <SocialButton provider="Microsoft" icon={<Microsoft size={22} />} onClick={onLogin} /> </div> </div> </div> ); };

// 18. 워크스페이스 설정 페이지

const WorkspaceSettingsPage = ({ onBack }) => {

    const [selectedSetting, setSelectedSetting] = useState('overview');

    const renderSettingContent = () => {

        switch(selectedSetting) {

            case 'overview': return ( <div> <h2 className="settings-content__header">개요</h2> <p>워크스페이스 개요입니다. 이름, 아이콘 등을 변경할 수 있습니다.</p> <div className="settings-form-group"> <label htmlFor="ws-name">워크스페이스 이름</label> <input id="ws-name" type="text" defaultValue="Prizm Dev" /> </div> </div> );

            case 'members': return ( <div> <h2 className="settings-content__header">멤버 관리</h2> <p>워크스페이스 멤버를 초대하거나 관리합니다.</p> <div className="channel-modal__list"> {Object.values(mockUsers).map(user => ( <div key={user.id} className="channel-modal__list-item member"> <img src={user.avatar} alt={user.name} /> <span>{user.name} ({user.role})</span> </div> ))} </div> </div> );

            case 'billing': return ( <div> <h2 className="settings-content__header">결제 정보</h2> <p>플랜 및 결제 정보를 관리합니다.</p> </div> );

            default: return null;

        }

    };

    return ( <div className="settings-page"> <aside className="settings-sidebar"> <button onClick={onBack} className="settings-sidebar__back-button"> <ArrowLeft size={16} /> <span>워크스페이스로 돌아가기</span> </button> <h3 className="settings-sidebar__title"> <span className="ws-dropdown__button-icon" style={{width: '1.5rem', height: '1.5rem', fontSize: '0.875rem'}}>P</span> <span>Prizm Dev 설정</span> </h3> <nav className="settings-sidebar__nav"> <button className={`settings-sidebar__button ${selectedSetting === 'overview' ? 'active' : ''}`} onClick={() => setSelectedSetting('overview')}> <Settings size={16} /> <span>개요</span> </button> <button className={`settings-sidebar__button ${selectedSetting === 'members' ? 'active' : ''}`} onClick={() => setSelectedSetting('members')}> <Users size={16} /> <span>멤버 관리</span> </button> <button className={`settings-sidebar__button ${selectedSetting === 'billing' ? 'active' : ''}`} onClick={() => setSelectedSetting('billing')}> <CreditCard size={16} /> <span>결제</span> </button> </nav> </aside> <main className="settings-content"> {renderSettingContent()} </main> </div> );

};



// 19. Generic 모달 (채널/기타)

const GenericModal = ({ modalType, onClose, onOpenThread }) => {

    const [activeFileTab, setActiveFileTab] = useState('links');

    const getTitle = () => { switch (modalType) { case 'search': return '채널 내 검색'; case 'members': return '멤버 목록'; case 'pinned': return '고정된 메시지'; case 'threads': return '스레드 목록'; case 'info': return '채널 정보'; case 'notifications': return '알림'; case 'createCategory': return '새 카테고리 만들기'; case 'invite': return '멤버 초대하기'; case 'fileUpload': return '파일 업로드'; case 'channelFiles': return '채널 파일'; case 'mention': return '@ 사용자 언급하기'; default: return ''; } };

    const renderContent = () => {

        switch (modalType) {

            case 'search': return ( <div className="channel-modal__search"> <div className="settings-form-group"> <input id="channel-search" type="text" placeholder="채팅방 내 검색어 입력..." /> </div> </div> );

            case 'members': return ( <div className="channel-modal__list"> {Object.values(mockUsers).map(user => ( <div key={user.id} className="channel-modal__list-item member"> <img src={user.avatar} alt={user.name} /> <span>{user.name}</span> <span className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`} style={{position: 'static', border: 'none', marginLeft: 'auto'}}></span> </div> ))} </div> );

            case 'pinned': const pinnedMessages = mockMessages.filter(m => m.pinned); return ( <div className="channel-modal__list"> {pinnedMessages.length > 0 ? pinnedMessages.map(msg => ( <div key={msg.id} className="channel-modal__list-item message"> <img src={mockUsers[msg.userId].avatar} alt={mockUsers[msg.userId].name} /> <div className="message-item__content"> <span className="message-item__username">{mockUsers[msg.userId].name}</span> <p className="message-item__text">{msg.text}</p> </div> </div> )) : <p>고정된 메시지가 없습니다.</p>} </div> );

            case 'threads': const threadMessages = mockMessages.filter(m => m.threadId); return ( <div className="channel-modal__list"> {threadMessages.length > 0 ? threadMessages.map(msg => ( <div key={msg.id} className="channel-modal__list-item message"> <img src={mockUsers[msg.userId].avatar} alt={mockUsers[msg.userId].name} /> <div className="message-item__content"> <span className="message-item__username">{mockUsers[msg.userId].name}</span> <p className="message-item__text">{msg.text}</p> </div> <button className="message-item__action-button" onClick={() => onOpenThread(msg)} > 스레드 보기 </button> </div> )) : <p>시작된 스레드가 없습니다.</p>} </div> );

            case 'info': return ( <div className="channel-modal__info"> <h4># general</h4> <p>팀 전체를 위한 일반 공지 및 대화 채널입니다.</p> </div> );

            case 'notifications': return ( <div className="channel-modal__list"> <p>새로운 알림이 없습니다.</p> </div> );

            case 'createCategory': return ( <div> <div className="settings-form-group"> <label htmlFor="cat-name">카테고리 이름</label> <input id="cat-name" type="text" placeholder="예: 디자인 팀" /> </div> <button className="profile-modal__save-button" style={{ marginTop: 0 }}>만들기</button> </div> );

            case 'invite': return ( <div> <div className="settings-form-group"> <label htmlFor="invite-email">이메일 주소</label> <input id="invite-email" type="email" placeholder="teammate@example.com" /> </div> <button className="profile-modal__save-button" style={{ marginTop: 0 }}>초대 보내기</button> <div className="ws-dropdown__divider"></div> <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>또는</p> <button className="social-button" style={{marginTop: '1rem', fontSize: '14px', padding: '12px 18px'}}>초대 링크 복사하기</button> </div> );

            case 'fileUpload': return ( <div className="file-upload-modal"> <div className="file-upload-dropzone"> <p>여기에 파일을 드래그하거나 클릭하여 업로드하세요.</p> <input type="file" multiple style={{ display: 'none' }} /> <button className="profile-modal__save-button" style={{marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem'}}>파일 선택</button> </div> <button className="profile-modal__save-button">업로드</button> </div> );

            case 'channelFiles': return ( <div className="channel-files-modal"> <div className="channel-files-tabs"> <button className={activeFileTab === 'links' ? 'active' : ''} onClick={() => setActiveFileTab('links')}> <LinkIcon size={16} /> 링크 </button> <button className={activeFileTab === 'media' ? 'active' : ''} onClick={() => setActiveFileTab('media')}> <Image size={16} /> 미디어 </button> <button className={activeFileTab === 'docs' ? 'active' : ''} onClick={() => setActiveFileTab('docs')}> <FileText size={16} /> 문서 </button> </div> <div className="channel-files-content"> {activeFileTab === 'links' && <p>채널에 공유된 링크가 없습니다.</p>} {activeFileTab === 'media' && <p>채널에 공유된 사진/동영상이 없습니다.</p>} {activeFileTab === 'docs' && <p>채널에 공유된 문서 파일이 없습니다.</p>} </div> </div> );

            case 'mention': return ( <div className="channel-modal__list mention-list"> {Object.values(mockUsers).map(user => ( <button key={user.id} className="channel-modal__list-item member mention-item"> <img src={user.avatar} alt={user.name} /> <span>{user.name}</span> </button> ))} </div> );

            default: return null;

        }

    };

    const getModalStyle = () => { let maxWidth = '520px'; if (['invite', 'createCategory', 'notifications', 'mention', 'fileUpload'].includes(modalType)) { maxWidth = '440px'; } if (modalType === 'channelFiles') { maxWidth = '600px'; } return { maxWidth }; };

    return ( <div className="channel-modal-overlay" onClick={onClose}> <div className={`channel-modal ${modalType === 'channelFiles' ? 'files-modal' : ''}`} style={getModalStyle()} onClick={(e) => e.stopPropagation()}> <header className="channel-modal__header"> <h3>{getTitle()}</h3> <button onClick={onClose} className="channel-modal__close-button"> <X size={18} /> </button> </header> <div className={`channel-modal__content ${modalType === 'channelFiles' ? 'no-padding' : ''}`}> {renderContent()} </div> </div> </div> );

};



// 20. 사용자 설정 페이지

const UserSettingsPage = ({ onBack }) => {

    const user = mockUsers['u1']; const [selectedSetting, setSelectedSetting] = useState('profile'); const [username, setUsername] = useState(user.realName); const [email, setEmail] = useState(user.email);

    const renderSettingContent = () => {

        switch(selectedSetting) {

            case 'profile':

                return ( <div> <h2 className="settings-content__header">내 프로필</h2> <div className="profile-modal__avatar-section" style={{marginTop: 0, marginBottom: '2rem', justifyContent: 'flex-start'}}> <img src={user.avatar} alt={user.realName} className="profile-modal__avatar" style={{width: '100px', height: '100px', margin: 0}}/> <button className="profile-modal__avatar-edit" style={{left: '75px', bottom: '5px', position: 'absolute'}}>변경</button> </div> <div className="settings-form-group"> <label htmlFor="realName">실제 이름</label> <input id="realName" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> </div> <div className="settings-form-group"> <label htmlFor="email">이메일</label> <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> </div> <div className="settings-form-group"> <label>소셜 로그인</label> <div className="social-login-info"> {user.socialProvider === 'Google' && <Google size={20} />} {user.socialProvider === 'GitHub' && <GitHub size={20} />} {user.socialProvider === 'Microsoft' && <Microsoft size={20} />} <span>{user.socialProvider}(으)로 가입함</span> </div> </div> <button className="profile-modal__save-button"> 변경사항 저장 </button> </div> );

            case 'account': return <div><h2 className="settings-content__header">계정 설정</h2><p>이메일, 비밀번호 등을 변경합니다.</p></div>;

            case 'prefs': return <div><h2 className="settings-content__header">환경 설정</h2><p>알림, 테마, 언어 등을 설정합니다.</p></div>;

            default: return null;

        }

    };

    return ( <div className="settings-page"> <aside className="settings-sidebar"> <button onClick={onBack} className="settings-sidebar__back-button"> <ArrowLeft size={16} /> <span>워크스페이스로 돌아가기</span> </button> <h3 className="settings-sidebar__title"> <User size={16} /> <span>사용자 설정</span> </h3> <nav className="settings-sidebar__nav"> <button className={`settings-sidebar__button ${selectedSetting === 'profile' ? 'active' : ''}`} onClick={() => setSelectedSetting('profile')}> <span>내 프로필</span> </button> <button className={`settings-sidebar__button ${selectedSetting === 'account' ? 'active' : ''}`} onClick={() => setSelectedSetting('account')}> <span>계정 설정</span> </button> <button className={`settings-sidebar__button ${selectedSetting === 'prefs' ? 'active' : ''}`} onClick={() => setSelectedSetting('prefs')}> <span>환경 설정</span> </button> </nav> </aside> <main className="settings-content"> {renderSettingContent()} </main> </div> );

};



// 21. 새 워크스페이스 생성 페이지

const CreateWorkspacePage = ({ onBack }) => { return ( <div className="settings-page" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}> <h1 className="login-title">새 워크스페이스 만들기</h1> <p className="login-subtitle">팀을 위한 새로운 공간을 생성합니다.</p> <div style={{width: '400px', marginTop: '2rem'}}> <div className="settings-form-group"> <label htmlFor="new-ws-name">워크스페이스 이름</label> <input id="new-ws-name" type="text" placeholder="예: 우리 회사 프로젝트" /> </div> <button className="profile-modal__save-button">워크스페이스 생성</button> <button onClick={onBack} className="social-button" style={{marginTop: '1rem', background: 'var(--card-bg)', color: 'var(--text)'}}>취소</button> </div> </div> ); };



// 22. App (최상위 컴포넌트)

const globalCss = `

    /* 1. :root Variables */

    :root { --bg: #f4f2f2; --card-bg: #ffffff; --text: #746b6c; --text-secondary: #8c8585; --primary: #8c65d1; --primary-light: rgba(140, 101, 209, 0.08); --border: #e5e1e1; --shadow: rgba(0, 0, 0, 0.08); }

    [data-theme='dark'] { --bg: #2a2f3f; --card-bg: #3d4252; --text: #f4f2f2; --text-secondary: #b8b5b5; --primary: #9d7adb; --primary-light: rgba(140, 101, 209, 0.15); --border: #454a5a; --shadow: rgba(0, 0, 0, 0.4); }



    /* 2. Base Styles */

    html, body { margin: 0; padding: 0; background-color: var(--bg); color: var(--text); transition: background-color 0.3s ease, color 0.3s ease; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; overflow: hidden; height: 100vh; width: 100vw; }

    #root, .app-container, .workspace-page, .login-page, .settings-page { height: 100%; width: 100%; }

    * { box-sizing: border-box; }

    ::-webkit-scrollbar { width: 6px; height: 6px; } ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; } ::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); } ::-webkit-scrollbar-track { background: transparent; }

    button { font-family: inherit; }



    /* 3. SocialButton */

    .social-button { -webkit-appearance: none; appearance: none; border: 2px solid var(--border); background-color: var(--card-bg); color: var(--text); box-shadow: 0 2px 8px var(--shadow); display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; padding: 16px 24px; border-radius: 14px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }

    .social-button:hover { background-color: var(--primary) !important; border-color: var(--primary) !important; color: #ffffff !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(140, 101, 209, 0.4); }

    .social-button:active { transform: translateY(-1px) scale(0.998); }

    .social-button:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }



    /* --- 4. App 전역 스타일 --- */

    

    /* Spinner */

    .spinner-container { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; }

    .spinner { animation: spin 1s linear infinite; border-radius: 50%; height: 4rem; width: 4rem; border-top-width: 4px; border-bottom-width: 4px; border-top-color: var(--primary); border-bottom-color: var(--primary); border-left-color: transparent; border-right-color: transparent; }

    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }



    /* LoginPage */

    .login-page { display: flex; align-items: center; justify-content: center; background-color: var(--bg); }

    .login-card { width: 100%; max-width: 28rem; padding: 2rem; }

    .login-header { text-align: center; margin-bottom: 2.5rem; }

    .login-icon { margin: 0 auto; color: var(--primary); }

    .login-title { font-size: 2.25rem; font-weight: 700; color: var(--text); margin-top: 1rem; }

    .login-subtitle { font-size: 1.125rem; color: var(--text-secondary); margin-top: 0.5rem; }

    .login-buttons { display: flex; flex-direction: column; gap: 1rem; }



    /* WorkspacePage */

    .workspace-page { display: flex; height: 100%; width: 100%; background-color: var(--bg); color: var(--text); position: relative; } 

    .workspace-page.left-sidebar-collapsed .left-sidebar { width: 0; padding: 0; border-right: none; overflow: hidden; }

    .sidebar-open-button { position: absolute; left: 0; top: 0.75rem; z-index: 30; background-color: var(--card-bg); border: 1px solid var(--border); border-left: none; padding: 0.5rem 0.25rem; border-radius: 0 0.5rem 0.5rem 0; box-shadow: 2px 0 5px var(--shadow); color: var(--text-secondary); cursor: pointer; }

    .sidebar-open-button:hover { background-color: var(--bg); color: var(--text); }

    

    /* LeftSidebar */

    .left-sidebar { width: 256px; height: 100%; background-color: rgba(0, 0, 0, 0.03); display: flex; flex-direction: column; position: relative; flex-shrink: 0; transition: width 0.3s ease, padding 0.3s ease; border-right: 1px solid var(--border); }

    [data-theme='dark'] .left-sidebar { background-color: rgba(255, 255, 255, 0.03); }

    .sidebar-header { height: 4rem; border-bottom: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; cursor: pointer; transition: background-color 0.2s ease; }

    .sidebar-header:hover { background-color: rgba(0, 0, 0, 0.05); }

    [data-theme='dark'] .sidebar-header:hover { background-color: rgba(255, 255, 255, 0.05); }

    .sidebar-header__title { font-size: 1.25rem; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; margin-right: 0.5rem; }

    .sidebar-header__icon { color: var(--text-secondary); }

    .sidebar-header__collapse-button { padding: 0.5rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .sidebar-header__collapse-button:hover { background-color: rgba(0, 0, 0, 0.1); color: var(--text); }

    [data-theme='dark'] .sidebar-header__collapse-button:hover { background-color: rgba(255, 255, 255, 0.1); }



    /* Workspace Dropdown */

    .ws-dropdown { position: absolute; top: 4rem; left: 0; right: 0; z-index: 20; background-color: var(--card-bg); box-shadow: 0 4px 12px var(--shadow); border: 1px solid var(--border); border-radius: 0 0 0.5rem 0.5rem; padding: 0.5rem; max-height: calc(100vh - 8rem); overflow-y: auto;}

    .ws-dropdown__current-ws { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; }

    .ws-dropdown__settings-button { margin-left: auto; padding: 0.25rem; border-radius: 0.375rem; background: none; border: none; color: var(--text-secondary); cursor: pointer; }

    .ws-dropdown__settings-button:hover { background-color: rgba(0, 0, 0, 0.05); color: var(--text); }

    [data-theme='dark'] .ws-dropdown__settings-button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .ws-dropdown__button { display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.5rem; border-radius: 0.375rem; background: none; border: none; cursor: pointer; text-align: left; }

    .ws-dropdown__button:hover { background-color: var(--primary-light); }

    .ws-dropdown__button-icon { width: 2rem; height: 2rem; border-radius: 0.375rem; background-color: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }

    .ws-dropdown__button-name { font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .ws-dropdown__divider { border-top: 1px solid var(--border); margin: 0.5rem 0; }

    .ws-dropdown__new-ws, .ws-dropdown__action-button { color: var(--text-secondary); font-size: 0.875rem; padding-left: 0.75rem; }

    .ws-dropdown__new-ws svg, .ws-dropdown__action-button svg { color: var(--text-secondary); margin-right: 0.5rem; }

    .ws-dropdown__new-ws:hover, .ws-dropdown__action-button:hover { color: var(--text); background-color: rgba(0, 0, 0, 0.05); }

    .ws-dropdown__new-ws:hover svg, .ws-dropdown__action-button:hover svg { color: var(--text); }

    [data-theme='dark'] .ws-dropdown__new-ws:hover, [data-theme='dark'] .ws-dropdown__action-button:hover { background-color: rgba(255, 255, 255, 0.05); }



    /* Sidebar Top Nav (Dashboard, Search, Directory) */

    .sidebar-top-nav { padding: 0.75rem; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 2px; flex-shrink: 0;}

    .sidebar-menu-button { display: flex; align-items: center; gap: 0.75rem; width: 100%; text-align: left; padding: 6px 8px; border-radius: 0.375rem; background: none; border: none; cursor: pointer; color: var(--text-secondary); font-weight: 500; font-size: 0.9rem; }

    .sidebar-menu-button svg { flex-shrink: 0; }

    .sidebar-menu-button span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .sidebar-menu-button:hover { background-color: rgba(0, 0, 0, 0.05); color: var(--text); }

    [data-theme='dark'] .sidebar-menu-button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .sidebar-menu-button.active { background-color: var(--primary-light); color: var(--primary); font-weight: 600; }

    

    /* Channel List */

    .sidebar-nav { flex: 1; overflow-y: auto; padding: 0.75rem; display: flex; flex-direction: column; gap: 1rem; }

    .nav-group__header { display: flex; align-items: center; justify-content: space-between; padding: 0 0.5rem; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

    .nav-category { display: flex; flex-direction: column; }

    .nav-category__header-wrapper { display: flex; align-items: center; justify-content: space-between; }

    .nav-category__header { display: flex; align-items: center; gap: 0.25rem; padding: 4px 8px; color: var(--text-secondary); font-size: 0.8rem; font-weight: 600; cursor: pointer; border-radius: 0.375rem; flex: 1; min-width: 0; background: none; border: none; text-align: left; }

    .nav-category__header span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .nav-category__header:hover { color: var(--text); background-color: rgba(0, 0, 0, 0.05); }

    [data-theme='dark'] .nav-category__header:hover { background-color: rgba(255, 255, 255, 0.05); }

    .nav-category__icon { transition: transform 0.2s ease; flex-shrink: 0; }

    .nav-category__icon.collapsed { transform: rotate(-90deg); }

    .nav-category__add-channel-button { padding: 0.25rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; flex-shrink: 0; display: none; }

    .nav-category__header-wrapper:hover .nav-category__add-channel-button { display: block; }

    .nav-category__add-channel-button:hover { background-color: rgba(0, 0, 0, 0.1); color: var(--text); }

    [data-theme='dark'] .nav-category__add-channel-button:hover { background-color: rgba(255, 255, 255, 0.1); }

    .nav-category__add-button { padding: 0.25rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .nav-category__add-button:hover { background-color: rgba(0, 0, 0, 0.1); color: var(--text); }

    [data-theme='dark'] .nav-category__add-button:hover { background-color: rgba(255, 255, 255, 0.1); }

    .nav-category__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; padding-left: 0.5rem; margin-top: 2px; }

    .channel-button { display: flex; align-items: center; justify-content: space-between; width: 100%; text-align: left; padding: 6px 8px; border-radius: 0.375rem; background: none; border: none; cursor: pointer; color: var(--text-secondary); }

    .channel-button:hover { background-color: rgba(0, 0, 0, 0.05); color: var(--text); }

    [data-theme='dark'] .channel-button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .channel-button.active { background-color: var(--primary-light); color: var(--primary); font-weight: 600; }

    .channel-button__name { display: flex; align-items: center; gap: 0.25rem; overflow: hidden; }

    .channel-button__name span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .channel-button__unread { background-color: #ef4444; color: white; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px; }



    /* DM Button */

    .dm-button__avatar-container { position: relative; width: 1.5rem; height: 1.5rem; margin-right: -4px; }

    .dm-button__avatar { width: 1.5rem; height: 1.5rem; border-radius: 9999px; }

    .dm-button__status { position: absolute; bottom: -2px; right: -2px; display: block; width: 0.6rem; height: 0.6rem; border-radius: 9999px; border: 2px solid var(--card-bg); /* Use card-bg for contrast */ }

    .dm-button__status.online { background-color: #22c55e; } 

    .dm-button__status.offline { background-color: #9ca3af; } 

    [data-theme='dark'] .dm-button__status { border-color: var(--card-bg); }





    /* Sidebar Footer */

    .sidebar-footer { height: 4rem; background-color: rgba(0, 0, 0, 0.04); border-top: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 0.75rem; width: 100%; transition: background-color 0.2s ease; }

    [data-theme='dark'] .sidebar-footer { background-color: rgba(255, 255, 255, 0.04); }

    .profile-info-button { display: flex; align-items: center; gap: 0.5rem; overflow: hidden; flex: 1; min-width: 0; background: none; border: none; padding: 0; margin: 0; cursor: pointer; border-radius: 0.375rem; padding: 0.25rem; }

    .profile-info-button:hover { background-color: rgba(0, 0, 0, 0.05); }

    [data-theme='dark'] .profile-info-button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .profile-info__avatar { width: 2.25rem; height: 2.25rem; border-radius: 9999px; }

    .profile-info__name { font-weight: 600; font-size: 0.875rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .profile-info__status { font-size: 0.75rem; color: #22c55e; display: block; }

    .profile-actions { display: flex; align-items: center; gap: 0.25rem; }

    .profile-action-button, .theme-toggle-button { padding: 0.5rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; flex-shrink: 0; }

    .profile-action-button:hover, .theme-toggle-button:hover { background-color: rgba(0, 0, 0, 0.1); color: var(--text); }

    [data-theme='dark'] .profile-action-button:hover, [data-theme='dark'] .theme-toggle-button:hover { background-color: rgba(255, 255, 255, 0.1); }



    /* Main Area (Chat, Dashboard, Search, Directory) */

    .main-chat-area, .main-view { flex: 1; display: flex; flex-direction: column; min-width: 0; background-color: var(--bg); }

    .chat-header, .view-header { height: 4rem; border-bottom: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; box-shadow: 0 1px 2px var(--shadow); background-color: var(--card-bg); /* Header background */ }

    .chat-header__title, .view-header h2 { font-size: 1.25rem; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 0.5rem; margin: 0; }

    .chat-header__topic { font-size: 0.875rem; color: var(--text-secondary); margin: 0; margin-top: 2px; }

    .chat-header__actions { display: flex; align-items: center; gap: 0.5rem; }

    .chat-header__actions button { padding: 0.5rem; border-radius: 0.5rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .chat-header__actions button:hover { background-color: rgba(0, 0, 0, 0.05); color: var(--text); }

    [data-theme='dark'] .chat-header__actions button:hover { background-color: rgba(255, 255, 255, 0.05); }



    /* Message List */

    .message-list { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }

    .message-container { position: relative; display: flex; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; transition: background-color 0.2s ease; cursor: pointer; /* Make messages clickable */ }

    .message-container:hover { background-color: rgba(0, 0, 0, 0.03); }

    [data-theme='dark'] .message-container:hover { background-color: rgba(255, 255, 255, 0.03); }

    .message__avatar { width: 2.5rem; height: 2.5rem; border-radius: 9999px; flex-shrink: 0; margin-top: 0.25rem; }

    .message__content { flex: 1; }

    .message__header { display: flex; align-items: baseline; gap: 0.5rem; }

    .message__username { font-weight: 700; color: var(--text); }

    .message__timestamp { font-size: 0.75rem; color: var(--text-secondary); }

    .message__text { color: var(--text); white-space: pre-wrap; word-break: break-word; }

    .message__reactions { margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.25rem; }

    .reaction-button { display: flex; align-items: center; gap: 0.25rem; padding: 2px 8px; background-color: rgba(0, 0, 0, 0.1); border-radius: 9999px; font-size: 0.875rem; border: none; cursor: pointer; }

    [data-theme='dark'] .reaction-button { background-color: rgba(255, 255, 255, 0.1); }

    .reaction-button:hover { background-color: rgba(0, 0, 0, 0.2); }

    [data-theme='dark'] .reaction-button:hover { background-color: rgba(255, 255, 255, 0.2); }

    .reaction-button__count { font-weight: 500; color: var(--text-secondary); }

    .message__thread-reply { margin-top: 0.5rem; font-size: 0.875rem; color: var(--primary); font-weight: 500; cursor: pointer; background: none; border: none; padding: 0; }

    .message__thread-reply:hover { text-decoration: underline; }



    /* Message Context Menu */

    .message-context-menu { position: fixed; z-index: 100; background-color: var(--card-bg); border-radius: 0.5rem; box-shadow: 0 4px 12px var(--shadow); border: 1px solid var(--border); padding: 0.25rem; display: flex; } 

    .message-context-menu.action-bar { align-items: center; } 

    .message-context-menu.action-bar .message-action-bar { display: flex; align-items: center; } 

    .message-context-menu.action-bar button { padding: 0.5rem; border-radius: 0.375rem; background: none; border: none; cursor: pointer; color: var(--text-secondary); line-height: 1; } 

    .message-context-menu.action-bar button:hover { background-color: rgba(0,0,0,0.05); color: var(--text); } 

    [data-theme='dark'] .message-context-menu.action-bar button:hover { background-color: rgba(255,255,255,0.05); }

    .message-context-menu.action-bar .more-button { margin-left: 0.25rem; border-left: 1px solid var(--border); padding-left: 0.5rem; border-radius: 0 0.375rem 0.375rem 0; } 

    .message-context-menu.full { flex-direction: column; padding: 0.5rem; min-width: 180px; } 

    .message-context-menu.full button { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; border: none; background: none; cursor: pointer; text-align: left; border-radius: 0.25rem; color: var(--text); font-size: 0.875rem; width: 100%; line-height: normal; } 

    .message-context-menu.full button:hover { background-color: var(--primary-light); color: var(--primary); } 

    .message-context-menu.full button.danger:hover { background-color: rgba(239, 68, 68, 0.1); color: #ef4444; } 

    .message-context-menu.full button svg { color: var(--text-secondary); flex-shrink: 0; } 

    .message-context-menu.full button:hover svg { color: var(--primary); } 

    .message-context-menu.full button.danger:hover svg { color: #ef4444; } 

    .context-menu-divider { height: 1px; background-color: var(--border); margin: 0.5rem 0; }



    /* Translation/Analysis */

    .message-translation, .message-analysis { margin-top: 0.5rem; padding: 0.5rem 0.75rem; background-color: var(--bg); border-radius: 0.375rem; border: 1px solid var(--border); font-size: 0.875rem; }

    .message-translation p, .message-analysis p { margin: 0; color: var(--text-secondary); }

    .message-translation button { margin-top: 0.25rem; font-size: 0.75rem; color: var(--primary); background: none; border: none; padding: 0; cursor: pointer; }

    .message-analysis strong { color: var(--text); }

    .loading-text { font-style: italic; }



    /* Message Input */

    .message-input-container { padding: 0 1rem 1rem 1rem; margin-top: 0.5rem; flex-shrink: 0; }

    .message-input-wrapper { display: flex; align-items: flex-end; gap: 0.5rem; }

    .message-input__attach-button { padding: 0.625rem; border-radius: 0.5rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; margin-bottom: 0.25rem; }

    .message-input__attach-button:hover { background-color: rgba(0, 0, 0, 0.05); color: var(--text); }

    [data-theme='dark'] .message-input__attach-button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .message-input__textarea-wrapper { position: relative; flex: 1; background-color: var(--card-bg); border-radius: 0.5rem; box-shadow: 0 1px 2px var(--shadow); border: 1px solid var(--border); }

    .message-input__textarea { width: 100%; padding: 0.75rem 6rem 0.75rem 0.75rem; background: transparent; color: var(--text); border-radius: 0.5rem; border: none; outline: none; resize: none; overflow-y: auto; font-size: 0.9rem; line-height: 1.4; max-height: 200px; }

    .message-input__textarea:focus { outline: none; box-shadow: 0 0 0 2px var(--primary); }

    .message-input__textarea::placeholder { color: var(--text-secondary); }

    .message-input__buttons { position: absolute; bottom: 0.625rem; right: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }

    .message-input__buttons button { padding: 0.375rem; border-radius: 0.5rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .message-input__buttons button:hover { background-color: rgba(0, 0, 0, 0.05); color: var(--text); }

    [data-theme='dark'] .message-input__buttons button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .message-input__send-button { background-color: var(--primary) !important; color: white !important; padding: 0.375rem !important; }

    .message-input__send-button:hover { filter: brightness(1.1); }

    .message-input__send-button:disabled { opacity: 0.5; cursor: default; filter: brightness(1); }

    .message-input__mention-button { margin-right: -0.25rem; /* 아이콘 간격 조정 */ }



    /* AI FAB */

    .ai-fab { position: absolute; bottom: 6rem; right: 2rem; width: 3.5rem; height: 3.5rem; background-color: var(--primary); color: white; border-radius: 9999px; box-shadow: 0 4px 12px var(--shadow); display: flex; align-items: center; justify-content: center; z-index: 40; border: none; cursor: pointer; transition: all 0.2s ease; }

    .ai-fab:hover { filter: brightness(1.1); transform: scale(1.1); }

    

    /* Main Views (Dashboard, Search, Directory) */

    .main-view { flex: 1; display: flex; flex-direction: column; min-width: 0; background-color: var(--bg); }

    .view-content { flex: 1; overflow-y: auto; padding: 1.5rem; }

    .dashboard-view .dashboard-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }

    .dashboard-view .dashboard-card { background-color: var(--card-bg); border-radius: 0.5rem; padding: 1rem; border: 1px solid var(--border); box-shadow: 0 1px 2px var(--shadow); }

    .dashboard-view .dashboard-card strong { display: block; font-size: 1.75rem; font-weight: 700; color: var(--primary); }

    .dashboard-view .dashboard-card p { font-size: 0.875rem; color: var(--text-secondary); margin: 0.25rem 0 0 0; }

    .directory-view .directory-list { display: flex; flex-direction: column; gap: 0.75rem; }

    .directory-view .directory-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 0.375rem; cursor: pointer; transition: background-color 0.2s ease; }

    .directory-view .directory-item:hover { background-color: rgba(0,0,0,0.05); }

    [data-theme='dark'] .directory-view .directory-item:hover { background-color: rgba(255,255,255,0.05); }

    .directory-view .directory-item img { width: 2rem; height: 2rem; border-radius: 50%; }

    .directory-view .directory-item span { font-size: 0.9rem; color: var(--text); }

    .directory-view .directory-item .dm-button__status { width: 0.5rem; height: 0.5rem; border-width: 1px; }



    /* Thread Sidebar */

    .thread-sidebar { width: 384px; height: 100%; border-left: 1px solid var(--border); background-color: var(--card-bg); display: flex; flex-direction: column; flex-shrink: 0; transition: width 0.3s ease; }

    [data-theme='dark'] .thread-sidebar { background-color: var(--bg); } /* 스레드는 bg 사용 */

    .thread-header { height: 4rem; border-bottom: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; }

    .thread-header__title { font-weight: 700; font-size: 1.125rem; color: var(--text); margin: 0; }

    .thread-header__subtitle { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }

    .thread-header__close-button { padding: 0.375rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .thread-header__close-button:hover { background-color: rgba(0,0,0,0.05); color: var(--text); }

    [data-theme='dark'] .thread-header__close-button:hover { background-color: rgba(255,255,255,0.05); }

    .thread-original-message { padding: 1rem; border-bottom: 1px solid var(--border); }

    .thread-replies { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }

    .thread-reply { display: flex; gap: 0.75rem; }

    .thread-reply-input-container { padding: 1rem; border-top: 1px solid var(--border); flex-shrink: 0; }

    .thread-reply-input-wrapper { position: relative; background-color: var(--card-bg); border-radius: 0.5rem; box-shadow: 0 1px 2px var(--shadow); border: 1px solid var(--border); }

    .thread-reply-input__textarea { width: 100%; padding: 0.75rem 3rem 0.75rem 0.75rem; background: transparent; color: var(--text); border-radius: 0.5rem; border: none; outline: none; resize: none; overflow-y: auto; font-size: 0.9rem; line-height: 1.4; max-height: 150px; }

    .thread-reply-input__textarea:focus { outline: none; box-shadow: 0 0 0 2px var(--primary); }

    .thread-reply-input__textarea::placeholder { color: var(--text-secondary); }

    .thread-reply-input__send-button { position: absolute; top: 50%; right: 0.75rem; transform: translateY(-50%); padding: 0.375rem; border-radius: 0.5rem; background-color: var(--primary); color: white; border: none; cursor: pointer; }

    .thread-reply-input__send-button:hover { filter: brightness(1.1); }



    /* AI Modal */

    .ai-modal { position: fixed; bottom: 6rem; right: 2rem; width: 400px; height: 500px; background-color: var(--card-bg); border-radius: 0.75rem; box-shadow: 0 8px 24px var(--shadow); border: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; z-index: 50; resize: both; min-width: 300px; min-height: 400px; }

    .ai-modal__header { height: 3.5rem; border-bottom: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 0.75rem 0 1rem; cursor: pointer; }

    .ai-modal__title { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text); }

    .ai-modal__title-icon { color: var(--primary); }

    .ai-modal__header-chevron { margin-left: 0.25rem; color: var(--text-secondary); }

    .ai-modal__close-button { padding: 0.375rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .ai-modal__close-button:hover { background-color: rgba(0,0,0,0.05); color: var(--text); }

    [data-theme='dark'] .ai-modal__close-button:hover { background-color: rgba(255,255,255,0.05); }

    .ai-session-dropdown { position: absolute; top: 3.5rem; left: 0.5rem; right: 0.5rem; z-index: 60; background-color: var(--card-bg); border: 1px solid var(--border); border-top: none; border-radius: 0 0 0.5rem 0.5rem; box-shadow: 0 4px 12px var(--shadow); padding: 0.5rem; max-height: 200px; overflow-y: auto; }

    .ai-session-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.5rem 0.75rem; border: none; background: none; cursor: pointer; border-radius: 0.25rem; text-align: left; font-size: 0.875rem; color: var(--text); }

    .ai-session-item:hover { background-color: rgba(0,0,0,0.05); }

    [data-theme='dark'] .ai-session-item:hover { background-color: rgba(255,255,255,0.05); }

    .ai-session-item.active { background-color: var(--primary-light); color: var(--primary); font-weight: 500; }

    .ai-session-name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 0.5rem; }

    .ai-session-time { font-size: 0.75rem; color: var(--text-secondary); flex-shrink: 0; }

    .ai-session-item.new-chat { color: var(--primary); font-weight: 500; gap: 0.5rem; justify-content: flex-start; }

    .ai-session-item.new-chat:hover { background-color: var(--primary-light); }

    .ai-modal__chat { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }

    .ai-modal__chat-bubble { max-width: 80%; padding: 0.5rem 0.75rem; border-radius: 0.75rem; font-size: 0.9rem; line-height: 1.4; }

    .ai-modal__chat-bubble p { margin: 0; }

    .ai-modal__chat-bubble.ai { background-color: rgba(0,0,0,0.05); color: var(--text); border-bottom-left-radius: 0.25rem; align-self: flex-start; }

    [data-theme='dark'] .ai-modal__chat-bubble.ai { background-color: rgba(255,255,255,0.05); }

    .ai-modal__chat-bubble.user { background-color: var(--primary); color: white; border-bottom-right-radius: 0.25rem; align-self: flex-end; }

    .ai-modal__input-container { padding: 0.75rem 1rem; border-top: 1px solid var(--border); flex-shrink: 0; }

    .ai-modal__input-wrapper { position: relative; }

    .ai-modal__attach-button { position: absolute; top: 50%; left: 0.5rem; transform: translateY(-50%); padding: 0.375rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .ai-modal__attach-button:hover { background-color: rgba(0,0,0,0.05); color: var(--text); }

    [data-theme='dark'] .ai-modal__attach-button:hover { background-color: rgba(255,255,255,0.05); }

    .ai-modal__input { width: 100%; padding: 0.625rem 2.5rem 0.625rem 2.5rem; background-color: var(--bg); color: var(--text); border-radius: 0.5rem; border: 1px solid var(--border); outline: none; font-size: 0.875rem; }

    .ai-modal__input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px var(--primary-light); }

    .ai-modal__send-button { position: absolute; top: 50%; right: 0.5rem; transform: translateY(-50%); padding: 0.375rem; border-radius: 0.5rem; background-color: var(--primary); color: white; border: none; cursor: pointer; }



    /* Modals (Profile, Generic) */

    .profile-modal-overlay, .channel-modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: center; justify-content: center; }

    .profile-modal, .channel-modal { background-color: var(--card-bg); border-radius: 0.75rem; box-shadow: 0 8px 24px var(--shadow); overflow: hidden; max-height: 90vh; display: flex; flex-direction: column; }

    .profile-modal { width: 100%; max-width: 440px; }

    .channel-modal { width: 100%; /* max-width set by style prop */ }

    .profile-modal__header, .channel-modal__header { height: 3.5rem; border-bottom: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; }

    .profile-modal__header h3, .channel-modal__header h3 { font-size: 1.125rem; font-weight: 600; color: var(--text); margin: 0; }

    .profile-modal__close-button, .channel-modal__close-button { padding: 0.375rem; border-radius: 0.375rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

    .profile-modal__close-button:hover, .channel-modal__close-button:hover { background-color: rgba(0,0,0,0.05); color: var(--text); }

    [data-theme='dark'] .profile-modal__close-button:hover, [data-theme='dark'] .channel-modal__close-button:hover { background-color: rgba(255,255,255,0.05); }

    .profile-modal__banner { height: 100px; background-color: var(--primary-light); }

    .profile-modal__content, .channel-modal__content { padding: 1.5rem; overflow-y: auto; }

    .channel-modal__content.no-padding { padding: 0; }

    .profile-modal__avatar-section { position: relative; margin-top: -50px; margin-bottom: 1.5rem; display: flex; justify-content: center; }

    .profile-modal__avatar { width: 80px; height: 80px; border-radius: 9999px; border: 4px solid var(--card-bg); }

    .profile-modal__avatar-edit { position: absolute; bottom: 0; left: calc(50% + 20px); background-color: var(--primary); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.75rem; font-weight: 600; }

    .profile-modal__avatar-edit:hover { filter: brightness(1.1); }

    .profile-modal__form-group, .settings-form-group { margin-bottom: 1rem; }

    .profile-modal__form-group label, .settings-form-group label { display: block; font-size: 0.875rem; font-weight: 500; color: var(--text); margin-bottom: 0.5rem; }

    .profile-modal__form-group input, .profile-modal__form-group select, .settings-form-group input { width: 100%; padding: 0.625rem 0.75rem; border: 1px solid var(--border); border-radius: 0.5rem; background-color: var(--bg); color: var(--text); font-size: 0.9rem; outline: none; }

    .profile-modal__form-group input:focus, .profile-modal__form-group select:focus, .settings-form-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px var(--primary-light); }

    .profile-modal__save-button { width: 100%; padding: 0.75rem; background-color: var(--primary); color: white; border: none; border-radius: 0.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; margin-top: 1rem; }

    .profile-modal__save-button:hover { filter: brightness(1.1); }

    .user-profile-modal { max-width: 380px; } 

    .user-profile-modal__display-name { font-size: 1.5rem; font-weight: 700; text-align: center; margin: 0; color: var(--text); }

    .user-profile-modal__status { text-align: center; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; }

    .user-profile-modal__status .dm-button__status { border-color: var(--card-bg) !important; }

    .user-profile-modal__details { display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem; color: var(--text); margin-bottom: 1.5rem; }

    .user-profile-modal__details strong { color: var(--text-secondary); margin-right: 0.5rem; }

    .user-profile-modal__dm-button { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

    

    /* Settings Pages */

    .settings-page { display: flex; height: 100%; }

    .settings-sidebar { width: 240px; height: 100%; border-right: 1px solid var(--border); background-color: rgba(0,0,0,0.02); display: flex; flex-direction: column; padding: 1rem; flex-shrink: 0; }

    [data-theme='dark'] .settings-sidebar { background-color: rgba(255,255,255,0.02); }

    .settings-sidebar__back-button { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; margin-bottom: 1rem; border-radius: 0.375rem; background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 0.875rem; }

    .settings-sidebar__back-button:hover { background-color: rgba(0,0,0,0.05); color: var(--text); }

    [data-theme='dark'] .settings-sidebar__back-button:hover { background-color: rgba(255,255,255,0.05); }

    .settings-sidebar__title { font-size: 1rem; font-weight: 600; color: var(--text); margin: 0 0 1rem 0.5rem; display: flex; align-items: center; gap: 0.5rem; }

    .settings-sidebar__nav { display: flex; flex-direction: column; gap: 2px; }

    .settings-sidebar__button { display: flex; align-items: center; gap: 0.75rem; width: 100%; text-align: left; padding: 0.5rem 0.75rem; border-radius: 0.375rem; background: none; border: none; cursor: pointer; color: var(--text); font-weight: 500; font-size: 0.875rem; }

    .settings-sidebar__button svg { color: var(--text-secondary); }

    .settings-sidebar__button:hover { background-color: rgba(0, 0, 0, 0.05); }

    [data-theme='dark'] .settings-sidebar__button:hover { background-color: rgba(255, 255, 255, 0.05); }

    .settings-sidebar__button.active { background-color: var(--primary-light); color: var(--primary); font-weight: 600; }

    .settings-sidebar__button.active svg { color: var(--primary); }

    .settings-content { flex: 1; overflow-y: auto; padding: 2rem; }

    .settings-content__header { font-size: 1.5rem; font-weight: 700; color: var(--text); margin: 0 0 1.5rem 0; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }

    .social-login-info { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background-color: var(--bg); border-radius: 0.5rem; border: 1px solid var(--border); } 

    .social-login-info svg { flex-shrink: 0; } 

    .social-login-info span { color: var(--text-secondary); font-size: 0.875rem; }



    /* Generic Modal Content Styles */

    .channel-modal__search .settings-form-group { margin-bottom: 0; } 

    .channel-modal__list { display: flex; flex-direction: column; gap: 0.5rem; max-height: 400px; overflow-y: auto; } 

    .channel-modal__list p { text-align: center; color: var(--text-secondary); margin-top: 1rem; }

    .channel-modal__list-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border); }

    .channel-modal__list-item:last-child { border-bottom: none; }

    .channel-modal__list-item.member img, .channel-modal__list-item.message img { width: 2rem; height: 2rem; border-radius: 50%; flex-shrink: 0; } 

    .channel-modal__list-item span { font-size: 0.9rem; color: var(--text); }

    .message-item__content { flex: 1; min-width: 0; } 

    .message-item__username { font-weight: 600; font-size: 0.8rem; color: var(--text); } 

    .message-item__text { font-size: 0.85rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 2px 0 0 0; } 

    .message-item__action-button { margin-left: auto; background: none; border: 1px solid var(--border); color: var(--text); padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; cursor: pointer; flex-shrink: 0; } 

    .message-item__action-button:hover { background-color: var(--primary-light); border-color: var(--primary); color: var(--primary); }

    [data-theme='dark'] .message-item__action-button:hover { border-color: var(--primary); }

    .channel-modal__info h4 { margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; } 

    .channel-modal__info p { margin: 0; color: var(--text-secondary); font-size: 0.9rem; }

    .mention-list .mention-item { border-bottom: none; padding: 0.5rem; border-radius: 0.375rem; cursor: pointer; background: none; width: 100%; text-align: left; }

    .mention-list .mention-item:hover { background-color: rgba(0,0,0,0.05); }

    [data-theme='dark'] .mention-list .mention-item:hover { background-color: rgba(255,255,255,0.05); }

    .file-upload-modal { display: flex; flex-direction: column; gap: 1rem; }

    .file-upload-dropzone { border: 2px dashed var(--border); border-radius: 0.5rem; padding: 2rem; text-align: center; background-color: var(--bg); cursor: pointer; }

    .file-upload-dropzone p { margin: 0 0 1rem 0; color: var(--text-secondary); }

    .channel-files-modal { display: flex; flex-direction: column; height: 500px; }

    .channel-files-tabs { display: flex; border-bottom: 1px solid var(--border); flex-shrink: 0; padding: 0 1.5rem; }

    .channel-files-tabs button { padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; display: flex; align-items: center; gap: 0.5rem; }

    .channel-files-tabs button:hover { color: var(--text); }

    .channel-files-tabs button.active { color: var(--primary); border-bottom-color: var(--primary); }

    .channel-files-content { flex: 1; overflow-y: auto; padding: 1.5rem; }

`;



export default function App() {

    const [page, setPage] = useState('loading'); const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => { const styleId = 'global-styles'; let styleEl = document.getElementById(styleId); if (!styleEl) { styleEl = document.createElement('style'); styleEl.id = styleId; document.head.appendChild(styleEl); } styleEl.innerHTML = globalCss; document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light'; const timer = setTimeout(() => { setPage('login'); }, 1000); return () => clearTimeout(timer); }, [isDarkMode]);

    const toggleDarkMode = () => { setIsDarkMode(prevMode => !prevMode); }; const handleLogin = () => { setPage('workspace'); };

    const appContextValue = { isDarkMode, toggleDarkMode };

    const renderPage = () => {

        switch(page) {

            case 'loading': return <Spinner />;

            case 'login': return <LoginPage onLogin={handleLogin} />;

            case 'workspace': return <WorkspacePage onNavigateToSettings={() => setPage('workspaceSettings')} onNavigateToUserSettings={() => setPage('userSettings')} onNavigateToCreateWorkspace={() => setPage('createWorkspace')} />;

            case 'workspaceSettings': return <WorkspaceSettingsPage onBack={() => setPage('workspace')} />;

            case 'userSettings': return <UserSettingsPage onBack={() => setPage('workspace')} />;

            case 'createWorkspace': return <CreateWorkspacePage onBack={() => setPage('workspace')} />;

            default: return <LoginPage onLogin={handleLogin} />;

        }

    };

    return ( <AppContext.Provider value={appContextValue}> <div className="app-container"> {renderPage()} </div> </AppContext.Provider> );

}


