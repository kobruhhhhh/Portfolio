import PillNav from '../PillNav/PillNav';
import BtnToggleTheme from '../../BtnToggleTheme/BtnToggleTheme';
import { routes } from '../../../routes/BaseRoutes';
import { useThemeContext } from '../../../hooks/themeHook/themeHook';

const MainNavigation = () => {
  const { dark } = useThemeContext();

  const navItems = [
    { label: 'Home', href: routes.HOME, ariaLabel: 'Navigate to home page' },
    { label: 'About', href: routes.ABOUT, ariaLabel: 'Navigate to about page' },
    { label: 'Projects', href: routes.PROJECTS, ariaLabel: 'Navigate to projects page' },
    { label: 'Contact', href: routes.CONTACT, ariaLabel: 'Navigate to contact page' },
  ];

  return (
    <PillNav
      themeToggle={<BtnToggleTheme />}
      items={navItems}
      ease="power3.easeOut"
      baseColor="#c4b5fd"
      pillColor="#1a1625"
      hoveredPillTextColor="#000000"
      pillTextColor="#ffffff"
      initialLoadAnimation={true}
    />
  );
};

export default MainNavigation;
