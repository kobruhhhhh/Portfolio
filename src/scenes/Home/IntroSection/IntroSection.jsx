import s from './IntroSection.module.scss';
import { AiFillGithub } from 'react-icons/ai';
import {
  FaDiscord,
  FaLinkedinIn,
  FaTelegramPlane,
  FaGoogle,
} from 'react-icons/fa';

const IntroSection = () => {
  return (
    <section className={s.content}>
      <div className={s.introduction}>
        <div className={s.introductionText}>
          <h1 className={s.title}>
            LET ME <span className={s.purple}> INTRODUCE </span>{' '}
            MYSELF
          </h1>

          <div className={s.description}>
            <p>
              I am a passionate sophomore in BCA, specializing in full-stack development <br />
              with a flair for creating software and web applications.
            </p>

            <p>
              My skills include proficiency in{' '}
              <i>
                <b className={s.purple}>
                  Node, React, Laravel,
                </b>
              </i>
              <br />
              and other relevant technologies. I have experience in
              integrating various <br />
              third-party libraries, API integration, push
              notifications and analytics.
            </p>

            <p>
              My field of Interest's are building new
              <i>
                <b className={s.purple}> Technologies </b>
              </i>
              <br />
              and contribution in
              <i>
                <b className={s.purple}> Open-source Projects. </b>
              </i>
            </p>
          </div>
        </div>

      </div>

      <div className={s.introSocial}>
        <h1>FIND ME ON</h1>
        <p>
          Feel free to <span className={s.purple}>connect </span>with
          me
        </p>
        <ul className={s.socialLinks}>
          <li className={s.socialLink}>
            <a
              href="https://github.com/kobruhhhhh"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="github"
            >
              <AiFillGithub />
            </a>
          </li>

          <li className={s.socialLink}>
            <a
              href="mailto:kr.lalit.4528@gmail.com"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="Email"
            >
              <FaGoogle />
            </a>
          </li>

          <li className={s.socialLink}>
            <a
              href="https://www.linkedin.com/in/lalit-kumar-696086204/"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="linkedin"
            >
              <FaLinkedinIn />
            </a>
          </li>

          <li className={s.socialLink}>
            <a
              href="https://t.me/Kobruh_69"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="telegram"
            >
              <FaTelegramPlane />
            </a>
          </li>

          <li className={s.socialLink}>
            <a
              href="https://discordid.netlify.app/?id=898419793709912104"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="discord"
            >
              <FaDiscord />
            </a>
          </li>

        </ul>
      </div>
    </section>
  );
};

export default IntroSection;
