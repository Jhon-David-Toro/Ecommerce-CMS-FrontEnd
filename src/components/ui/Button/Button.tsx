import type { ButtonProps } from './Button.types';
import { FC, JSX } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button: FC<ButtonProps> = ({
  type,
  text,
  onClick,
  className,
  size,
  margin,
  icon,
  iconPosition,
  disabled,
  href,
  typeAttribute = 'submit',
  id,
  ariaPressed,
}) => {
  const icons: { [key: string]: JSX.Element } = {
    'chevron-left': <ArrowLeftIcon className={styles.iconSvg} />,
    'chevron-right': <ArrowRightIcon className={styles.iconSvg} />,
  };

  const renderIcon = () => {
    return icon && icons[icon] ? <span className={styles.icon}>{icons[icon]}</span> : null;
  };

  const classes = clsx(
    styles.button,
    styles[`button--${type}`],
    styles[`button--${size}`],
    margin && styles[`button--${margin}`],
    iconPosition && styles[`button--icon-${iconPosition}`],
    className
  );

  const Component = href ? 'a' : 'button';

  return (
    <Component
      {...(href ? { href } : { type: typeAttribute })}
      className={classes}
      onClick={onClick}
      id={id}
      aria-pressed={ariaPressed}
      disabled={!href ? disabled : undefined}
    >
      {iconPosition === 'left' && renderIcon()}
      <span className={styles.text}>{text}</span>
      {iconPosition === 'right' && renderIcon()}
    </Component>
  );
};

export default Button;