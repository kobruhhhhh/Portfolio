import s from './Footer.module.scss';
import { AiFillGithub } from 'react-icons/ai';
import {
  FaLinkedinIn,
  FaTelegramPlane,
  FaDiscord,
} from 'react-icons/fa';

const Footer = () => {
  // let date = new Date();
  // let year = date.getFullYear();

  return (
    <footer className={s.footer} role="contentinfo">
      <div className={s.container}>
        <div className={s.copyright}>
          <p>Made by <b className={s.purple}>kobruh</b></p>
        </div>

        <nav className={s.body} aria-label="Social media links">
          <ul className={s.socialIcons}>
            <li>
              <a
                href="https://github.com/kobruhhhhh"
                target="_blank"
                rel="noreferrer"
                aria-label="github"
              >
                <AiFillGithub />
              </a>
            </li>
            <li>
              <a
                href="https://t.me/Kobruh_69"
                target="_blank"
                rel="noreferrer"
                aria-label="TelegramPlane"
              >
                <FaTelegramPlane />
              </a>
            </li>
            <li>
              <a
                href="https://discordid.netlify.app/?id=898419793709912104"
                target="_blank"
                rel="noreferrer"
                aria-label="discord"
              >
                <FaDiscord />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lalit-kumar-696086204/"
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
