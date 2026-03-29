import s from './BaseLayout.module.scss';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import PixelBlast from '../../components/UIElements/PixelBlast/PixelBlast';
import LiquidGlass from '../../components/UIElements/LiquidGlass/LiquidGlass';
import Footer from '../../components/Footer/Footer';
import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';
import SkipToContent from '../../components/SkipToContent/SkipToContent';

const BaseLayout = ({ children }) => {
  return (
    <div className={s.layout}>
      <SkipToContent />
      <PixelBlast />
      <LiquidGlass />

      <Header>
        <MainNavigation />
      </Header>

      <main id="main-content" className={s.container}>{children}</main>

      <Footer />
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
