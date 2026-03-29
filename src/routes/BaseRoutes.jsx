import { lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//modals
import ModalProjectCard from '../scenes/Projects/ModalProjectCard/ModalProjectCard';
//scenes
const Home = lazy(() => import('../scenes/Home/Home'));
const About = lazy(() => import('../scenes/About/About'));
const Projects = lazy(() => import('../scenes/Projects/Projects'));
const Contact = lazy(() => import('../scenes/Contact/Contact'));

export const routes = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT: '/project/:id',
  CONTACT: '/contact',
};

const BaseRoutes = () => {
  const location = useLocation();
  const background = location.state?.background;

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <Routes location={background || location}>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.ABOUT} element={<About />} />
        <Route path={routes.PROJECTS} element={<Projects />} />
        <Route path={routes.CONTACT} element={<Contact />} />
        <Route path={routes.PROJECT} element={<ModalProjectCard />} />
      </Routes>

      {background && (
        <Routes>
          <Route path={routes.PROJECT} element={<ModalProjectCard />} />
        </Routes>
      )}
    </>
  );
};

export default BaseRoutes;
