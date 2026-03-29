import s from './IntroSection.module.scss';

const IntroSection = () => {
  return (
    <section className={s.content}>
      <div className={s.introduction}>
        <div className={s.glassBox}>
          <div className={s.introductionText}>
            <h1 className={s.title}>
              LET ME <span className={s.purple}> INTRODUCE </span>{' '}
              MYSELF
            </h1>

            <div className={s.description}>
              <p>
                <b className={s.purple}>Full-Stack Developer</b> specializing in MERN and MEVN stacks, focused on building scalable, high-performance web applications with clean architecture and modern design.
              </p>

              <p>
                Experienced in delivering production-ready solutions for{' '}
                <b className={s.purple}>50+ clients</b>, with strong expertise in JavaScript, React, Node.js, Vue.js, and backend systems.
              </p>

              <p>
                Driven by a deep interest in{' '}
                <b className={s.purple}>Artificial Intelligence</b>,{' '}
                <b className={s.purple}>Machine Learning</b>, and{' '}
                <b className={s.purple}>Cybersecurity</b>, with a constant focus on innovation and impactful development.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default IntroSection;
