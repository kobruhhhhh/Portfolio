import { lazy, Suspense } from 'react';
import s from './MainSection.module.scss';
import Typewriter from '../../../components/UIElements/Typewriter/Typewriter';
import SplitText from '../../../components/UIElements/SplitText/SplitText';

const Lanyard = lazy(() => import('../../../components/UIElements/Lanyard/Lanyard'));

const MainSection = () => {
  return (
    <section className={s.content}>
      <div className={s.contentWrapper}>
        <div className={s.header}>
          <div style={{ paddingBottom: 15 }} className={s.title}>
            <SplitText
              text="Hi There! "
              className={s.titleText}
              delay={50}
              duration={1.25}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="h2"
            />
            <span className={s.wave}>👋🏻</span>
          </div>

          <div className={s.mainTitle}>
            <SplitText
              text="I'm "
              className={s.mainTitleText}
              delay={50}
              duration={1.25}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="h1"
            />
            <SplitText
              text="Lalit Kumar"
              className={s.mainName}
              delay={50}
              duration={1.25}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="strong"
            />
          </div>

          <div style={{ paddingTop: 50 }}>
            <Typewriter
              strings={[
                'Continuously Learning',
                'Full-Stack Developer',
              ]}
              wrapperClassName={s.typewriterWrapper}
              cursorClassName={s.typewriterCursor}
            />
          </div>
        </div>

        <div className={s.lanyardContainer}>
          <Suspense fallback={<div style={{ width: '100%', height: '80vh' }}></div>}>
            <Lanyard position={[0, -2, 24]} gravity={[0, -40, 0]} fov={25} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
