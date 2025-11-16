import {
  Smile,
  CornerDownRight,
  MessageSquare,
  Pin,
  Send,
  Share,
  Edit,
  Trash,
  Translate,
  AlertTriangle,
  Copy
} from '@/components/common/icons';

export const getCommonActions = (message, handlers) => [
  {
    key: 'copy',
    icon: <Copy size={18} />,
    handler: () => {
      navigator.clipboard.writeText(message.text);
      handlers.onClose();
    }
  },
  {
    key: 'react',
    icon: <Smile size={18} />,
    handler: () => {
      handlers.onReactEmoji(message);
      handlers.onClose();
    }
  },
  {
    key: 'reply',
    icon: <CornerDownRight size={18} />,
    handler: () => {
      handlers.onReply(message);
      handlers.onClose();
    }
  },
  {
    key: 'thread',
    icon: <MessageSquare size={18} />,
    handler: () => {
      handlers.onStartThread(message);
      handlers.onClose();
    }
  },
];

export const getMyMessageActions = (handlers) => [
  {
    key: 'edit',
    icon: <Edit size={18} />,
    handler: handlers.onEdit
  },
  {
    key: 'delete',
    icon: <Trash size={18} />,
    handler: handlers.onDelete,
    className: 'danger'
  }
];

export const getOtherMessageActions = (handlers) => [
  {
    key: 'pin',
    icon: <Pin size={18} />,
    handler: handlers.onPin
  },
  {
    key: 'forward',
    icon: <Send size={18} />,
    handler: handlers.onForward
  },
  {
    key: 'share',
    icon: <Share size={18} />,
    handler: handlers.onShare
  },
  {
    key: 'translate',
    icon: <Translate size={18} />,
    handler: handlers.onTranslate
  },
  {
    key: 'analyze',
    icon: <AlertTriangle size={18} />,
    handler: handlers.onAnalyze
  },
  {
    key: 'report',
    icon: <AlertTriangle size={18} />,
    handler: handlers.onReport,
    className: 'danger'
  }
];
