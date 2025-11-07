import './StatusIndicator.module.css';

export const StatusIndicator = ({ status, className = '' }) => (
  <span className={`status-indicator ${status} ${className}`}></span>
);
