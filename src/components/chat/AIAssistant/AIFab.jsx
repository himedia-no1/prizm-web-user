import { Sparkles } from '@/components/common/icons';
import './AIFab.css';

export const AIFab = ({ onClick }) => (
  <button onClick={onClick} className="ai-fab">
    <Sparkles size={28} />
  </button>
);
