import s from './Logo.module.scss';
import { routes } from '../../routes/BaseRoutes';
import { Link } from 'react-router-dom';
import logo from '../../assets/Kobruh.png';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <Link to={routes.HOME} aria-label="site logo">
        <img
          alt="logo"
          src={logo}
          className={s.logo}
        />
      </Link>
    </div>
  );
};

export default Logo;
