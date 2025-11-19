'use client';

import { ChevronsLeft } from '@/components/common/icons';

export const SidebarHeader = ({ currentWorkspace, onCollapse, onToggleDropdown }) => {
    // 워크스페이스 이름이 없으면 아무것도 렌더링하지 않음
    if (!currentWorkspace?.name) {
        return null;
    }

    return (
        <header
            className="sidebar-header"
            onClick={onToggleDropdown}
        >
            <h1 className="sidebar-header__title">{currentWorkspace.name}</h1>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onCollapse();
                }}
                className="sidebar-header__collapse-button"
            >
                <ChevronsLeft size={18} />
            </button>
        </header>
    );
};
