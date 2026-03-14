import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './Header.module.scss';
import { useEffect, useState } from 'react';
import { useThemeContext } from '../../hooks/themeHook/themeHook';

const Header = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dark } = useThemeContext();

  useEffect(() => {
    const scrollHandler = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <header
      className={cx(s.header, {
        [s.scrolled]: isScrolled,
        [s.dark]: dark,
        [s.light]: !dark,
      })}
      role="banner"
    >
      <div className={s.container}>{children}</div>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
