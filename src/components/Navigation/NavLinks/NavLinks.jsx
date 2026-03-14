import s from './NavLinks.module.scss';
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from 'react-icons/ai';
import { routes } from '../../../routes/BaseRoutes';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className={s.navBar}>
        <li>
          <NavLink to={routes.HOME} end aria-label="Navigate to home page">
            <AiOutlineHome aria-hidden="true" />
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to={routes.ABOUT} aria-label="Navigate to about page">
            <AiOutlineUser aria-hidden="true" />
            About
          </NavLink>
        </li>

        <li>
          <NavLink to={routes.PROJECTS} aria-label="Navigate to projects page">
            <AiOutlineFundProjectionScreen aria-hidden="true" />
            Projects
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default NavLinks;
