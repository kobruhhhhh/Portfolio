import s from './HomeLayout.module.scss';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import PixelBlast from '../../components/UIElements/PixelBlast/PixelBlast';
import LiquidGlass from '../../components/UIElements/LiquidGlass/LiquidGlass';
import Footer from '../../components/Footer/Footer';
import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';
import SkipToContent from '../../components/SkipToContent/SkipToContent';

const HomeLayout = ({ children }) => {
  return (
    <div className={s.layout}>
      <SkipToContent />
      <PixelBlast />
      <LiquidGlass />

      <Header>
        <MainNavigation />
      </Header>

      <main id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeLayout;
