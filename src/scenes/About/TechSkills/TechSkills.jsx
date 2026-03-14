import s from './TechSkills.module.scss';
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiJava,
} from 'react-icons/di';
import {
  SiPhp,
  SiPython,
  SiGooglecloud,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const TechSkills = () => {
  return (
    <ul className={s.container} role="list" aria-label="Technical skills">
      <li className={s.techIcon}>
        <DiJavascript1 aria-label="JavaScript" role="img" />
      </li>
      <li className={s.techIcon}>
        <SiPhp aria-label="PHP" role="img" />
      </li>
      <li className={s.techIcon}>
        <DiNodejs aria-label="Node.js" role="img" />
      </li>
      <li className={s.techIcon}>
        <DiReact aria-label="React" role="img" />
      </li>
      <li className={s.techIcon}>
        <DiMongodb aria-label="MongoDB" role="img" />
      </li>
      <li className={s.techIcon}>
        <SiGooglecloud aria-label="Google Cloud" role="img" />
      </li>
      <li className={s.techIcon}>
        <FaAws aria-label="Amazon Web Services" role="img" />
      </li>
      <li className={s.techIcon}>
        <SiPython aria-label="Python" role="img" />
      </li>
      <li className={s.techIcon}>
        <DiJava aria-label="Java" role="img" />
      </li>
      <li className={s.techIcon}>
        <DiGit aria-label="Git" role="img" />
      </li>
    </ul>
  );
};

export default TechSkills;
