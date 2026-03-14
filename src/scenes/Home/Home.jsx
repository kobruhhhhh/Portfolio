import { Helmet } from 'react-helmet-async';
import MainSection from './MainSection/MainSection';
import IntroSection from './IntroSection/IntroSection';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';

const Home = () => {
  return (
    <HomeLayout>
      <Helmet>
        <title>Lalit Kumar | Full-Stack Developer Portfolio</title>
        <meta 
          name="description" 
          content="Portfolio of Lalit Kumar - Full-Stack Developer specializing in React, Node.js, and modern web technologies. Explore my projects and skills." 
        />
        <meta property="og:title" content="Lalit Kumar | Full-Stack Developer Portfolio" />
        <meta property="og:description" content="Portfolio of Lalit Kumar - Full-Stack Developer specializing in React, Node.js, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="Full-Stack Developer, React, Node.js, Web Development, JavaScript, Portfolio" />
        <link rel="canonical" href="https://yourwebsite.com/" />
      </Helmet>
      
      <MainSection />

      <IntroSection />
    </HomeLayout>
  );
};

export default Home;
