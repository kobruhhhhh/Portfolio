import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import {
  DARK_THEME_PARTICLES,
  LIGHT_THEME_PARTICLES,
} from './particleType';
import { useThemeContext } from '../../../hooks/themeHook/themeHook';

const ParticlesComponent = () => {
  const { dark } = useThemeContext();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particles = dark
    ? DARK_THEME_PARTICLES
    : LIGHT_THEME_PARTICLES;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: particles,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
          modes: {
            push: {
              quantity: 1,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesComponent;
