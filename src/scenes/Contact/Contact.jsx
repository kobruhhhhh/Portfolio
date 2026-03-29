import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import s from './Contact.module.scss';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import { AiFillGithub } from 'react-icons/ai';
import { FaGoogle, FaLinkedinIn, FaTelegramPlane, FaDiscord, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Note: AiFillGithub, FaGoogle, FaLinkedinIn, FaTelegramPlane, FaDiscord, FaXTwitter used in socials array
import { MdCheckCircle, MdError } from 'react-icons/md';

const socials = [
  { icon: <AiFillGithub />, label: 'GitHub', href: import.meta.env.VITE_SOCIAL_GITHUB },
  { icon: <FaGoogle />, label: 'Email', href: import.meta.env.VITE_SOCIAL_EMAIL },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', href: import.meta.env.VITE_SOCIAL_LINKEDIN },
  { icon: <FaTelegramPlane />, label: 'Telegram', href: import.meta.env.VITE_SOCIAL_TELEGRAM },
  { icon: <FaDiscord />, label: 'Discord', href: import.meta.env.VITE_SOCIAL_DISCORD },
  { icon: <FaXTwitter />, label: 'X (Twitter)', href: import.meta.env.VITE_SOCIAL_TWITTER },
];

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(formRef.current);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.get('user_name'),
          user_email: formData.get('user_email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
    }
  };

  return (
    <BaseLayout>
      <div className={s.contactPage}>

        {/* FIND ME ON */}
        <div className={s.glassBox}>
          <h1 className={s.title}>
            FIND ME <span className={s.purple}>ON</span>
          </h1>
          <p className={s.subtitle}>
            Feel free to <span className={s.purple}>connect </span>with me
          </p>
          <ul className={s.socialLinks}>
            {socials.map(({ icon, label, href }) => (
              <li key={label} className={s.socialItem}>
                <a href={href} target="_blank" rel="noreferrer" className={s.socialCard} aria-label={label}>
                  <span className={s.icon}>{icon}</span>
                  <span className={s.socialLabel}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT FORM */}
        <div className={s.glassBox}>
          <h1 className={s.title}>
            GET IN <span className={s.purple}>TOUCH</span>
          </h1>
          <p className={s.subtitle}>
            Send me a <span className={s.purple}>message </span>and I'll get back to you!
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="user_name">Name</label>
                <input
                  id="user_name"
                  className={s.input}
                  type="text"
                  name="user_name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="user_email">Email</label>
                <input
                  id="user_email"
                  className={s.input}
                  type="email"
                  name="user_email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className={s.formGroup}>
              <label className={s.label} htmlFor="subject">Subject</label>
              <input
                id="subject"
                className={s.input}
                type="text"
                name="subject"
                placeholder="What's this about?"
                required
              />
            </div>

            <div className={s.formGroup}>
              <label className={s.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                className={s.textarea}
                name="message"
                placeholder="Your message here..."
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className={s.submitBtn}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span className={s.btnContent}>Sending...</span>
              ) : (
                <span className={s.btnContent}>
                  <FaPaperPlane /> Send Message
                </span>
              )}
            </button>

            {status === 'success' && (
              <p className={s.successMsg}><MdCheckCircle /> Message sent successfully! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className={s.errorMsg}><MdError /> Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
        </div>

      </div>
    </BaseLayout>
  );
};

export default Contact;
