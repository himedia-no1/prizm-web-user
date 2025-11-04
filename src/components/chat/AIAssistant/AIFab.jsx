import { AIIcon } from '@/components/common/icons';
import './AIFab.css';

export const AIFab = ({ onClick }) => (
  <button onClick={onClick} className="ai-fab">
    <AIIcon size={28} />
  </button>
);
