import React from 'react';
import './button.scss';
import { Link } from 'react-router-dom';
interface Tbutton {
  type?: any;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  icon?: string;
  kind?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  //   rest?: Record<string, any>;
}

const Button: React.FC<Tbutton> = ({
  type = 'button',
  children,
  className = '',
  isLoading = false,
  icon = '',
  kind = '',
  href = '',
  onClick,
  ...rest
}) => {
  const child = !!isLoading ? (
    <img src="/Spin-1s-200px.svg" className="loadingsvg h30" alt="loading" />
  ) : (
    children
  );

  let defaultClassName = 'defaultBtn ';

  switch (kind) {
    case 'primary':
      defaultClassName = defaultClassName + 'priBtn';
      break;
    case 'secondary':
      defaultClassName = defaultClassName + 'seconBtn ';
      break;
    case 'ghost':
      defaultClassName = defaultClassName + 'ghostBtn ';
      break;
    default:
      break;
  }

  if (href)
    return (
      <Link to={href} className={`${defaultClassName}   ${className}`}>
        {icon && <img src={icon} className="btn-icon" alt="icon" />}
        {child}
      </Link>
    );

  return (
    <button
      style={{ cursor: 'pointer' }}
      type={type}
      {...rest}
      className={`${defaultClassName} ${className} ${isLoading && 'pointer-none'}`}
      onClick={onClick}
    >
      {icon && <img src={icon} className="btn-icon" alt="icon" />}
      <span>{child}</span>
    </button>
  );
};

export default Button;
