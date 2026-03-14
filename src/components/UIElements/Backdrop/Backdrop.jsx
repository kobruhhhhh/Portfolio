import s from './Backdrop.module.scss';
import PropTypes from 'prop-types';

const Backdrop = ({ onClick }) => {
  return <div className={s.backdrop} onClick={onClick} />;
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
