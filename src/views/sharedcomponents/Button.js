import React from 'react';

// css
import './Button.scss';

export default function Button({
  type,
  className,
  style,
  children,
  onClick,
  isDisabled,
}) {
  return (
    <button
      type={type}
      className={`Button ${className} ${isDisabled ? 'Button__disabled' : ''}`}
      style={style}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
