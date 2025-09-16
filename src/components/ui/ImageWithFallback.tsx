'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.error('img404', src);
      setImgSrc('/img/placeholder.png');
      setHasError(true);
    }
  };

  const imageProps = {
    src: imgSrc,
    alt,
    onError: handleError,
    className,
    priority,
    ...(sizes && { sizes }),
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 1200}
      height={height || 1200}
    />
  );
}
