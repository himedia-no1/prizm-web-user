'use client';

import { useState } from 'react';

/**
 * Context Menu 상태 관리 Hook
 * - 메시지 우클릭 메뉴
 * - 메뉴 위치 관리
 */
export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    message: null,
    position: null,
    defaultFullMenu: false,
  });

  const handleOpenContextMenu = (selectedMessage, position, options = {}) => {
    setContextMenu({
      visible: true,
      message: selectedMessage,
      position,
      defaultFullMenu: Boolean(options.defaultFullMenu),
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({
      visible: false,
      message: null,
      position: null,
      defaultFullMenu: false,
    });
  };

  return {
    contextMenu,
    handleOpenContextMenu,
    handleCloseContextMenu,
  };
};
