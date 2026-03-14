import s from './SkipToContent.module.scss';

const SkipToContent = () => {
  return (
    <a href="#main-content" className={s.skipLink}>
      Skip to main content
    </a>
  );
};

export default SkipToContent;
