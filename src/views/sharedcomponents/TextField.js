import React from 'react';

// css import
import './TextField.scss';

export default function TextField({ type, className, name, onChange, value }) {
  return (
    <input
      type={type}
      className={`TextField ${className}`}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
}
