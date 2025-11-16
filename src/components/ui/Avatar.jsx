import Image from 'next/image';
import './Avatar.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

const SIZE_MAP = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

export const Avatar = ({ src, alt = 'avatar', size = 'md', className = '' }) => {
  const dimension = SIZE_MAP[size] ?? SIZE_MAP.md;
  const resolvedSrc = src ?? getPlaceholderImage(dimension);

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={dimension}
      height={dimension}
      className={`avatar avatar-${size} ${className}`.trim()}
    />
  );
};
