import './Avatar.module.css';

export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClass = `avatar-${size}`;

  return (
    <img
      src={src}
      alt={alt}
      className={`avatar ${sizeClass} ${className}`}
    />
  );
};
