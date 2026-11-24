import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  objectPosition = 'center center',
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className="w-full h-full bg-gradient-to-br from-[#E8DFD1] to-[#F7F3EB] flex flex-col items-center justify-center p-4 text-center text-[#39291F]/70"
        role="img"
        aria-label={alt}
      >
        <Package className="w-6 h-6 mb-2 stroke-[1.5]" />
        <span className="text-xs font-medium line-clamp-2 max-w-[16ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      style={{ objectPosition }}
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
