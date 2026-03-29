import { useState, useEffect } from 'react';
import s from './TechSkills.module.scss';
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiJava,
  DiCss3,
  DiHtml5,
  DiSass,
  DiBootstrap,
} from 'react-icons/di';
import {
  SiPhp,
  SiPython,
  SiGooglecloud,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiMysql,
  SiRedis,
  SiLaravel,
  SiNextdotjs,
  SiFirebase,
  SiLinux,
  SiFigma,
  SiPostman,
  SiGithub,
  SiGitlab,
  SiVuedotjs,
  SiAngular,
  SiExpress,
  SiGraphql,
  SiPrisma,
  SiSupabase,
  SiC,
  SiCplusplus,
  SiFlask,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiSpringboot,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md';

const moreSkills = [
  { icon: <SiC />, label: 'C' },
  { icon: <SiCplusplus />, label: 'C++' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <SiTailwindcss />, label: 'Tailwind' },
  { icon: <SiDocker />, label: 'Docker' },
  { icon: <SiMysql />, label: 'MySQL' },
  { icon: <SiPostgresql />, label: 'PostgreSQL' },
  { icon: <SiRedis />, label: 'Redis' },
  { icon: <SiLaravel />, label: 'Laravel' },
  { icon: <SiNextdotjs />, label: 'Next.js' },
  { icon: <SiFlask />, label: 'Flask' },
  { icon: <SiSpringboot />, label: 'Spring Boot' },
  { icon: <SiFirebase />, label: 'Firebase' },
  { icon: <SiLinux />, label: 'Linux' },
  { icon: <SiFigma />, label: 'Figma' },
  { icon: <SiPostman />, label: 'Postman' },
  { icon: <SiGithub />, label: 'GitHub' },
  { icon: <SiGitlab />, label: 'GitLab' },
  { icon: <DiCss3 />, label: 'CSS3' },
  { icon: <DiHtml5 />, label: 'HTML5' },
  { icon: <DiBootstrap />, label: 'Bootstrap' },
  { icon: <DiSass />, label: 'Sass' },
  { icon: <SiVuedotjs />, label: 'Vue.js' },
  { icon: <SiAngular />, label: 'Angular' },
  { icon: <SiExpress />, label: 'Express' },
  { icon: <SiGraphql />, label: 'GraphQL' },
  { icon: <SiPrisma />, label: 'Prisma' },
  { icon: <SiSupabase />, label: 'Supabase' },
  { icon: <SiTensorflow />, label: 'TensorFlow' },
  { icon: <SiPytorch />, label: 'PyTorch' },
];

const TechSkills = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <>
      <ul className={s.container} role="list" aria-label="Technical skills">
        <li className={s.techIcon}><DiJavascript1 aria-label="JavaScript" role="img" /></li>
        <li className={s.techIcon}><SiPhp aria-label="PHP" role="img" /></li>
        <li className={s.techIcon}><DiNodejs aria-label="Node.js" role="img" /></li>
        <li className={s.techIcon}><DiReact aria-label="React" role="img" /></li>
        <li className={s.techIcon}><DiMongodb aria-label="MongoDB" role="img" /></li>
        <li className={s.techIcon}><SiGooglecloud aria-label="Google Cloud" role="img" /></li>
        <li className={s.techIcon}><FaAws aria-label="Amazon Web Services" role="img" /></li>
        <li className={s.techIcon}><SiPython aria-label="Python" role="img" /></li>
        <li className={s.techIcon}><DiJava aria-label="Java" role="img" /></li>
        <li className={s.techIcon}><DiGit aria-label="Git" role="img" /></li>

      </ul>

      {/* Show More Button */}
      <div className={s.showMoreWrapper}>
        <button
          className={s.showMoreBtn}
          onClick={() => setModalOpen(true)}
          aria-label="Show more skills"
        >
          <span>Show More</span>
          <MdKeyboardArrowDown className={s.showMoreIcon} />
        </button>
      </div>

      {/* Modal — only render when open to avoid interfering with scroll */}
      {modalOpen && (
        <div
          className={s.modalBackdrop}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="More skills"
          style={{ 
            pointerEvents: 'auto',
            display: 'flex',
            visibility: 'visible',
            opacity: 1
          }}
        >
          <div
            className={s.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={s.modalHeader}>
              <h3 className={s.modalTitle}>More <span className={s.purple}>Skills</span></h3>
              <button
                className={s.closeBtn}
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <MdClose />
              </button>
            </div>
            <ul className={s.modalGrid} role="list">
              {moreSkills.map(({ icon, label }) => (
                <li key={label} className={s.techIcon}>
                  <span className={s.modalIcon}>{icon}</span>
                  <span className={s.iconLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TechSkills;
