'use client';

import React, { memo, useMemo } from 'react';
import AppIcon from './AppIcon';


interface AppLogoProps {
  src?: string;
  iconName?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  src = '/assets/images/ChatGPT_Image_Mar_21_2026_09_21_23_AM-1774077789989.png',
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {src ? (
        <img
          src={src}
          alt="ZAFRIQON"
          className="h-6 sm:h-8 w-auto flex-shrink-0 object-contain"
          style={{ imageRendering: 'auto' }}
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  );
});

export default AppLogo;
