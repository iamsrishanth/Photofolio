'use client';

import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  frameLabel?: string;
  subtitle?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#EBE6DF]',
  frameLabel,
  subtitle,
  priority = false,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EFECE6] via-[#E5DFD5] to-[#D8CFC2] text-[#2C2A29]"
          role="img"
          aria-label={alt}
        >
          <Camera className="w-6 h-6 text-[#78716C] mb-3 stroke-[1.25]" />
          {frameLabel && (
            <span className="font-mono text-xs text-[#78716C] mb-1 tabular-nums">
              Frame {frameLabel}
            </span>
          )}
          <p className="font-serif text-lg text-[#1C1917] max-w-xs">{alt}</p>
          {subtitle && (
            <p className="text-xs text-[#57534E] mt-1">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}
