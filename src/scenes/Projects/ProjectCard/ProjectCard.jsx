import s from './ProjectCard.module.scss';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiLinkExternal } from 'react-icons/bi';
import { FaGithub, FaAws } from 'react-icons/fa';
import {
  DiJavascript1, DiReact, DiNodejs, DiMongodb,
  DiGit, DiJava, DiCss3, DiHtml5, DiSass, DiBootstrap,
} from 'react-icons/di';
import {
  SiPhp, SiPython, SiGooglecloud, SiTypescript,
  SiTailwindcss, SiDocker, SiMysql, SiRedis,
  SiLaravel, SiNextdotjs, SiFirebase, SiLinux,
  SiFigma, SiPostman, SiGithub, SiGitlab,
  SiVuedotjs, SiAngular, SiExpress, SiGraphql,
  SiPrisma, SiSupabase, SiC, SiCplusplus,
  SiFlask, SiPostgresql, SiTensorflow, SiPytorch,
  SiSpringboot, SiRedux, SiNetlify, SiSocketdotio,
  SiFlutter, SiStreamlit, SiSqlite, SiMongoose,
  SiGnubash,
} from 'react-icons/si';

// Map tech names to icons
const techIconMap = {
  'JavaScript': <DiJavascript1 />,
  'React': <DiReact />,
  'React.js': <DiReact />,
  'Node.js': <DiNodejs />,
  'MongoDB': <DiMongodb />,
  'Git': <DiGit />,
  'Java': <DiJava />,
  'CSS': <DiCss3 />,
  'CSS3': <DiCss3 />,
  'HTML': <DiHtml5 />,
  'HTML5': <DiHtml5 />,
  'Sass': <DiSass />,
  'Bootstrap': <DiBootstrap />,
  'PHP': <SiPhp />,
  'Python': <SiPython />,
  'Google Cloud': <SiGooglecloud />,
  'TypeScript': <SiTypescript />,
  'Tailwind': <SiTailwindcss />,
  'TailwindCSS': <SiTailwindcss />,
  'Docker': <SiDocker />,
  'MySQL': <SiMysql />,
  'Redis': <SiRedis />,
  'Laravel': <SiLaravel />,
  'Next.js': <SiNextdotjs />,
  'Firebase': <SiFirebase />,
  'Linux': <SiLinux />,
  'Figma': <SiFigma />,
  'Postman': <SiPostman />,
  'GitHub': <SiGithub />,
  'GitLab': <SiGitlab />,
  'Vue.js': <SiVuedotjs />,
  'Angular': <SiAngular />,
  'Express': <SiExpress />,
  'Express.js': <SiExpress />,
  'GraphQL': <SiGraphql />,
  'Prisma': <SiPrisma />,
  'Supabase': <SiSupabase />,
  'C': <SiC />,
  'C++': <SiCplusplus />,
  'Flask': <SiFlask />,
  'PostgreSQL': <SiPostgresql />,
  'TensorFlow': <SiTensorflow />,
  'PyTorch': <SiPytorch />,
  'Spring Boot': <SiSpringboot />,
  'AWS': <FaAws />,
  'Redux': <SiRedux />,
  'Netlify': <SiNetlify />,
  'WebSockets': <SiSocketdotio />,
  'Flutter': <SiFlutter />,
  'Streamlit': <SiStreamlit />,
  'SQLite': <SiSqlite />,
  'Mongoose': <SiMongoose />,
  'Bash': <SiGnubash />,
  'Firebase Authentication': <SiFirebase />,
  'Realtime Database': <SiFirebase />,
  'Cloud Storage': <SiFirebase />,
  'BeautifulSoup': <SiPython />,
  'Scikit-learn': <SiPython />,
};

const ProjectCard = ({ image, title, description, technologies, links, reverse, index }) => {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const currentRef = cardRef.current;
    
    // If no ref yet, wait
    if (!currentRef) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, showing cards immediately');
      setVisible(true);
      return;
    }

    // Use Intersection Observer to detect when card enters viewport (one-time only)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(`Card ${index} (${reverse ? 'right' : 'left'}): intersecting=${entry.isIntersecting}, ratio=${entry.intersectionRatio}`);
          if (entry.isIntersecting) {
            // Card entering viewport - slide in
            setTimeout(() => {
              console.log(`Card ${index}: Setting visible=true`);
              setVisible(true);
            }, 50);
            // Unobserve after animation triggers (one-time only)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of card is visible
        rootMargin: '0px' // No margin - trigger as soon as visible
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <li
      className={s.card}
      ref={cardRef}
    >
      <div 
        className={`${s.animWrapper} ${reverse ? s.fromRight : ''} ${visible ? s.visible : ''}`}
      >
      <article className={`${s.cardWrapper} ${reverse ? s.reverse : ''}`}>
        {/* Left — Image */}
        <div className={s.imageWrapper}>
          <LazyLoadImage
            alt={`${title} project screenshot`}
            effect="blur"
            src={image.src}
            width="100%"
            height="100%"
            placeholderSrc={image.placeholderSrc}
            className={s.image}
          />
        </div>

        {/* Right — Content */}
        <div className={s.cardContent}>
          <div className={s.cardBody}>
            <h3 className={s.title}>{title}</h3>
            <p className={s.description}>{description}</p>

            {/* Technologies */}
            {technologies?.length > 0 && (
              <div className={s.technologies} role="list" aria-label="Technologies used">
                {technologies.map((tech, index) => (
                  <span key={index} role="listitem" className={s.techTag} title={tech}>
                    {techIconMap[tech] || tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className={s.cardFooter}>
            {!!links?.site && (
              <a
                href={links.site}
                target="_blank"
                rel="noreferrer"
                className={s.btn}
                aria-label={`View ${title} live project`}
              >
                <BiLinkExternal /> View Project
              </a>
            )}
            <a
              href={links?.repo || '#'}
              target="_blank"
              rel="noreferrer"
              className={`${s.btn} ${s.btnOutline} ${!links?.repo ? s.btnDisabled : ''}`}
              aria-label={`View ${title} repository`}
            >
              <FaGithub /> Source Code
            </a>
          </div>
        </div>
      </article>
      </div>
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
  technologies: PropTypes.arrayOf(PropTypes.string),
  links: PropTypes.shape({
    site: PropTypes.string,
    repo: PropTypes.string,
  }),
  reverse: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

export default ProjectCard;
