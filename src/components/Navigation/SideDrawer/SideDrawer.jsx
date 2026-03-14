import s from './SideDrawer.module.scss';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../../UIElements/Backdrop/Backdrop';

const SideDrawer = ({ children, show, onClose }) => {
  return (
    <>
      {show && <Backdrop onClick={onClose} />}

      <CSSTransition
        in={show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside className={s.sideDrawer} onClick={onClose}>
          {children}
        </aside>
      </CSSTransition>
    </>
  );
};

SideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideDrawer;
