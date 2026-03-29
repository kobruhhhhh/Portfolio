import s from './Projects.module.scss';
import { Helmet } from 'react-helmet-async';
import projects from '../../data/projects';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import ProjectCard from './ProjectCard/ProjectCard';
import { AiFillGithub } from 'react-icons/ai';

const Projects = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>kobruh</title>
        <meta 
          name="description" 
          content="Explore my portfolio of web development projects including React applications, full-stack solutions, and modern web technologies." 
        />
        <meta property="og:title" content="Projects | Lalit Kumar - Full-Stack Developer Portfolio" />
        <meta property="og:description" content="Explore my portfolio of web development projects including React applications and full-stack solutions." />
        <meta name="keywords" content="Projects, Portfolio, React Projects, Web Development, Full-Stack Applications" />
        <link rel="canonical" href="https://yourwebsite.com/projects" />
      </Helmet>
      
      <div className={s.content}>
        <h1 className={s.title}>
          My Recent <strong className={s.purple}>Works</strong>
        </h1>
        <p className={s.subtitle}>&nbsp;</p>

        <ul className={s.projects}>
          {projects.map((props, index) => (
            <ProjectCard key={props.id} {...props} reverse={index % 2 !== 0} index={index} />
          ))}
        </ul>

        <div className={s.githubSection}>
          <a 
            href={import.meta.env.VITE_SOCIAL_GITHUB} 
            target="_blank" 
            rel="noreferrer"
            className={s.githubLink}
            aria-label="Visit GitHub"
          >
            <AiFillGithub className={s.githubIcon} />
            <span>More on GitHub</span>
          </a>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Projects;
