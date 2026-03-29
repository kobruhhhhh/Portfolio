import s from './AboutTextCard.module.scss';
import { BsArrowReturnRight } from 'react-icons/bs';

const AboutTextCard = () => {
  return (
    <div className={s.card}>
      <p style={{ textAlign: 'justify' }}>
        <span className={s.purple}>Full-Stack Developer</span> specializing in MERN and MEVN stacks, focused on building scalable, high-performance web applications with clean architecture and modern design.
        <br />
        <br />
        Experienced in delivering production-ready solutions for <span className={s.purple}>50+ clients</span>, with strong expertise in JavaScript, React, Node.js, Vue.js, and backend systems.
        <br />
        <br />
        Driven by a deep interest in <span className={s.purple}>Artificial Intelligence</span>, <span className={s.purple}>Machine Learning</span>, and <span className={s.purple}>Cybersecurity</span>, with a constant focus on innovation and impactful development.
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
