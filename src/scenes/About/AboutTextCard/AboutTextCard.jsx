import s from './AboutTextCard.module.scss';
import { BsArrowReturnRight } from 'react-icons/bs';

const AboutTextCard = () => {
  return (
    <div className={s.card}>
      <p style={{ textAlign: 'justify' }}>
        Hello, I am{' '}
        <span className={s.purple}>Lalit Kumar </span>
        from <span className={s.purple}> India.</span>
        <br />
        CS student with expertise in cross-platform development.{' '}
        <br />
        I am  currently pursuing BCA (Bachelor of Computer Applications)
        <br />
        from Manipal University Jaipur.
        <br />
        <br />
        Apart from coding, some other activities that I love to do!
      </p>

      <ul>
        <li className={s.aboutActivity}>
          <BsArrowReturnRight /> Games
        </li>
        <li className={s.aboutActivity}>
          <BsArrowReturnRight /> Reading
        </li>
        <li className={s.aboutActivity}>
          <BsArrowReturnRight /> Painting
        </li>
      </ul>
    </div>
  );
};

export default AboutTextCard;
