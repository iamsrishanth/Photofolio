'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  frameLabel?: string;
  subtitle?: string;
  priority?: boolean;
  focalPosition?: string;
  sizes?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export function EditorialImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#EBE6DF]',
  frameLabel,
  subtitle,
  priority = false,
  focalPosition = '50% 24%',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 45vw',
  width = 1440,
  height = 1800,
  fill = true,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={className}
            style={{ objectPosition: focalPosition }}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={className}
            style={{ objectPosition: focalPosition }}
          />
        )
      ) : (
        <div
          className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EFECE6] via-[#E5DFD5] to-[#D8CFC2] text-[#141413]"
          role="img"
          aria-label={alt}
        >
          <Camera className="w-6 h-6 text-[#57534E] mb-3 stroke-[1.25]" />
          {frameLabel && (
            <span className="font-mono text-xs text-[#57534E] mb-1 tabular-nums">
              Frame {frameLabel}
            </span>
          )}
          <p className="font-serif text-lg text-[#141413] max-w-xs">{alt}</p>
          {subtitle && (
            <p className="text-xs text-[#57534E] mt-1">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}
