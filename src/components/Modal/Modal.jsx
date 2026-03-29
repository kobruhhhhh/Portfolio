import s from './Modal.module.scss';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import ModalCloseIcon from '../../assets/modal-close.svg?react';
import Backdrop from '../UIElements/Backdrop/Backdrop';

const Modal = ({ children, show, onClose }) => {
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  const closeModal = (e) => {
    e.stopPropagation();
    onClose();
    navigate('/projects', { replace: true });
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className={s.container}>
      {show && <Backdrop onClick={closeModal} />}

      <CSSTransition
        in={show}
        timeout={300}
        classNames="modal"
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className={s.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className={s.closeWrapper} onClick={closeModal}>
            <button
              className={s.closeButton}
              aria-label="Close modal"
              onClick={closeModal}
            >
              <ModalCloseIcon className={s.closeIcon} aria-hidden="true" />
            </button>
          </div>

          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
