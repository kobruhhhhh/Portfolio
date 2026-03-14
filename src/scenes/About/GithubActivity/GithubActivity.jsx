import s from './GithubActivity.module.scss';
import GitHubCalendar from 'react-github-calendar';

const GithubActivity = () => {
  const colorTheme = {
    light: ['#ecd9fc', '#c084f5', '#b265f6', '#b22ff4', '#8400b8'],
    dark: ['#ecd9fc', '#c084f5', '#b265f6', '#b22ff4', '#8400b8'],
  };
  return (
    <div className={s.container}>
      <GitHubCalendar
        username="kobruhhhhh"
        blockSize={15}
        blockMargin={5}
        theme={colorTheme}
        fontSize={16}
        colorScheme="dark"
      />
    </div>
  );
};

export default GithubActivity;
