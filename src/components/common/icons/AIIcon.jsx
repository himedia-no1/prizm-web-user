import Image from 'next/image';

export const AIIcon = ({ size = 20, className = '' }) => {
  const dimension = typeof size === 'number' ? size : parseInt(size, 10) || 20;
  return (
    <Image
      src="/icon.png"
      alt="AI Assistant"
      width={dimension}
      height={dimension}
      className={className}
    />
  );
};
