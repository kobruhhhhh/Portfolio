import s from './ModalProjectCard.module.scss';
import projects from '../../../data/projects';
import { BiLinkExternal } from 'react-icons/bi';
import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/UIElements/Button/Button';
import { useParams } from 'react-router-dom';
import { useModal } from '../../../hooks/modalHook';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ModalProjectCard = () => {
  const { id } = useParams();
  const project = projects.find((p) => id === p.id);
  const { isVisible, toggleModal } = useModal(true);

  if (!project) {
    return null;
  }

  const { image, title, links, technologies } = project;

  return (
    <Modal show={isVisible} onClose={toggleModal}>
      <div className={s.cardWrapper}>
        <LazyLoadImage
          alt="project-img"
          src={image.src}
          effect="blur"
          width="100%"
          wrapperClassName={s.image}
          placeholderSrc={image.placeholderSrc}
        />

        <div className={s.cardBody}>
          <h3 id="modal-title" className={s.title}>{title}</h3>

          <div className={s.technologies} role="list" aria-label="Technologies used">
            {technologies.map((tech, index) => (
              <span key={index} role="listitem">{tech}</span>
            ))}
          </div>
        </div>

        <div className={s.cardFooter}>
        {!!links.site && (
            <Button
              style={{ width: '12rem' }}
              className="primary"
              href={links.site}
              target="_blank"
              label={`View ${title} live project`}
            >
              <BiLinkExternal aria-hidden="true" /> &nbsp; View Project
            </Button>
          )}

          {!!links.repo && (
            <Button
              style={{ width: '12rem' }}
              className="primary"
              href={links.repo}
              target="_blank"
              label={`View ${title} repository`}
            >
              <BiLinkExternal aria-hidden="true" /> &nbsp; Know more
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalProjectCard;
