import {
  ArrowLeft,
  LayoutGrid,
  Users,
  Hash,
  Link,
  Mail,
  Lock,
  FileText,
  AIIcon,
  Search,
} from '@/components/common/icons';

export const navItems = [
  { id: 'overview', icon: LayoutGrid, labelKey: 'navDashboard' },
  { id: 'members', icon: Users, labelKey: 'navMembers' },
  { id: 'invite-management', icon: Mail, labelKey: 'navInviteManagement' },
  { id: 'groups', icon: Hash, labelKey: 'navGroups' },
  { id: 'integrations', icon: Link, labelKey: 'navIntegrations' },
  { id: 'security', icon: Lock, labelKey: 'navSecurity' },
  { id: 'audit', icon: FileText, labelKey: 'navAuditLog' },
  { id: 'ai-assistant', icon: AIIcon, labelKey: 'navAiAssistant' },
  { id: 'ai-search', icon: Search, labelKey: 'navAiSearch' },
];
