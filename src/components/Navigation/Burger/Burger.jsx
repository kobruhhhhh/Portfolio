import s from './Burger.module.scss';
import PropTypes from 'prop-types';

const Burger = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={s.burger}
      aria-label="Toggle navigation menu"
      aria-expanded="false"
      type="button"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
};

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Burger;
