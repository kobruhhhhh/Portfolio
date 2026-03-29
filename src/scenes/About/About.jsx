import s from './About.module.scss';
import { Helmet } from 'react-helmet-async';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import TerminalCard from './TerminalCard/TerminalCard';
import TechSkills from './TechSkills/TechSkills';
import Certifications from './Certifications/Certifications';

const About = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>kobruh</title>
        <meta 
          name="description" 
          content="Learn about Lalit Kumar's skills, experience, and expertise in full-stack development, React, Node.js, Laravel, and modern web technologies." 
        />
        <meta property="og:title" content="About Me | Lalit Kumar - Full-Stack Developer" />
        <meta property="og:description" content="Learn about my skills in React, Node.js, Laravel, and full-stack development." />
        <meta name="keywords" content="About, Skills, JavaScript, React, Node.js, PHP, Laravel, MongoDB, AWS, Google Cloud" />
        <link rel="canonical" href="https://yourwebsite.com/about" />
      </Helmet>
      
      <div className={s.content}>
        <div className={s.about}>
          <div className={s.aboutTerminal}>
            <TerminalCard />
          </div>
        </div>

        <h2 className={s.skills}>
          Professional <b className={s.purple}>Skills</b>
        </h2>
        <TechSkills />

        <h2 className={s.skills}>
          My <b className={s.purple}>Certifications</b>
        </h2>
        <Certifications />

      </div>
    </BaseLayout>
  );
};

export default About;
