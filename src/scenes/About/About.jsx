import s from './About.module.scss';
import { Helmet } from 'react-helmet-async';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import aboutPromoImg from '../../assets/about.png';
import AboutTextCard from './AboutTextCard/AboutTextCard';
import TechSkills from './TechSkills/TechSkills';
import GithubActivity from './GithubActivity/GithubActivity';
import Downloadcv from './Downloadcv/downresume';

const About = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>About Me | Lalit Kumar - Full-Stack Developer</title>
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
          <div className={s.aboutDescription}>
            <AboutTextCard />
          </div>

          <div className={s.aboutImg}>
            <img src={aboutPromoImg} alt="about" />
          </div>
        </div>

        <h2 className={s.skills}>
          Professional <b className={s.purple}>Skills</b>
        </h2>
        <TechSkills />

        <h2 className={s.githubActivity}>
          Days I <b className={s.purple}>Code</b>
        </h2>
        <GithubActivity />
        <h2 className={s.resume}>
          My <b className={s.purple}>Resume</b>
        </h2>
        <Downloadcv />
      </div>
    </BaseLayout>
  );
};

export default About;
