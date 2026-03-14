import s from './Projects.module.scss';
import { Helmet } from 'react-helmet-async';
import projects from '../../data/projects';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import ProjectCard from './ProjectCard/ProjectCard';

const Projects = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>Projects | Lalit Kumar - Full-Stack Developer Portfolio</title>
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
        <p className={s.subtitle}>
          Here are a few projects I've worked on recently.
        </p>

        <ul className={s.projects}>
          {projects.map((props) => (
            <ProjectCard key={props.id} {...props} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export default Projects;
