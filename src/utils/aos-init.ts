// utils/aos-init.ts

import AOS from 'aos';
import 'aos/dist/aos.css';

const initializeAOS = (): void => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    offset: 200,
    once: true,
  });
};

export default initializeAOS;