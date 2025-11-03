export const StarOff = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3l18 18" />
    <path d="M10.66 6.34L12 2l1.34 4.34" />
    <path d="M18.78 14.73L22 9.27l-6.91-1" />
    <path d="M6.24 16.24L2 21l7.03-1.03" />
    <path d="M12 17.27l-2.5 1.5" />
  </svg>
);
