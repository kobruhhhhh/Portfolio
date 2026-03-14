import s from './ProjectCard.module.scss';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProjectCard = ({ id, image, title, description }) => {
  const location = useLocation();

  return (
    <li className={s.card}>
      <article className={s.cardWrapper}>
        <Link
          to={`/project/${id}`}
          state={{ background: location }}
          aria-label={`View details for ${title}`}
        >
          <LazyLoadImage
            alt={`${title} project screenshot`}
            effect="blur"
            src={image.src}
            width="100%"
            style={{ minHeight: '10rem' }}
            placeholderSrc={image.placeholderSrc}
          />
        </Link>

        <div className={s.cardBody}>
          <h3 className={s.title}>{title}</h3>
          <p className={s.description}>{description}</p>
        </div>
      </article>
    </li>
  );
};

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    placeholderSrc: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectCard;
