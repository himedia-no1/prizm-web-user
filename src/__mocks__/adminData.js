import React from 'react';
import { UsersAdmin, HashAdmin, MessageSquareAdmin, Activity } from '@/components/common/icons';

export const mockWorkspaceStats = [
  { id: 'members', icon: <UsersAdmin size={20} />, value: '248', label: '전체 멤버', trend: '+12%', trendColor: 'green' },
  { id: 'channels', icon: <HashAdmin size={20} />, value: '42', label: '활성 채널', trend: '+3', trendColor: 'blue' },
  { id: 'messages', icon: <MessageSquareAdmin size={20} />, value: '1,847', label: '오늘 메시지', trend: '+24%', trendColor: 'green' },
  { id: 'activeUsers', icon: <Activity size={20} />, value: '186', label: '활성 사용자', trend: '+8%', trendColor: 'green' },
];

export const mockRecentActivities = [
  { id: 'act1', user: { name: '김', avatar: 'https://placehold.co/32x32/FFC107/FFFFFF?text=김' }, action: '김철수 새 채널 생성', details: '#마케팅-전략', time: '5분 전' },
  { id: 'act2', user: { name: '이', avatar: 'https://placehold.co/32x32/9C27B0/FFFFFF?text=이' }, action: '이영희 멤버 초대', details: 'park@company.com', time: '12분 전' },
  { id: 'act3', user: { name: '박', avatar: 'https://placehold.co/32x32/4CAF50/FFFFFF?text=박' }, action: '박민수 권한 변경', details: '최지훈 → Manager', time: '1시간 전' },
  { id: 'act4', user: { name: '정', avatar: 'https://placehold.co/32x32/03A9F4/FFFFFF?text=정' }, action: '정수진 채널 아카이브', details: '#old-project', time: '2시간 전' },
];
