import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './Button.module.scss';

const Button = ({
  type = 'button',
  onClick,
  disabled,
  className,
  children,
  href,
  target,
  style,
  addClass,
  label
}) => {
  if (href) {
    return (
      <a
        style={style}
        className={cx(s.btn, s[className], addClass)}
        href={href}
        target={target}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={style}
      className={cx(s.btn, s[className], addClass)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.object,
  addClass: PropTypes.string,
  label: PropTypes.string,
};

export default Button;
