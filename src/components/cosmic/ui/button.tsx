import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
};

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={`px-3 py-1 rounded-md ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
