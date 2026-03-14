import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SplitText.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'h1',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [chars, setChars] = useState([]);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // Split text into characters or words
  useEffect(() => {
    if (!text) return;
    
    if (splitType === 'chars') {
      // Split into individual characters, preserving spaces
      const charArray = text.split('').map((char, i) => ({
        char,
        key: `char-${i}`,
        isSpace: char === ' '
      }));
      setChars(charArray);
    } else if (splitType === 'words') {
      // Split into words
      const words = text.split(' ');
      const charArray = words.map((word, i) => ({
        char: word,
        key: `word-${i}`,
        isSpace: false
      }));
      setChars(charArray);
    }
  }, [text, splitType]);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded || chars.length === 0) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;
      const targets = el.querySelectorAll('.split-char, .split-word');
      
      if (targets.length === 0) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        chars.length
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'visible',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent ${className}`;
    const Tag = tag || 'p';

    return (
      <Tag ref={ref} style={style} className={classes}>
        {chars.map(({ char, key, isSpace }) => (
          <span
            key={key}
            className={splitType === 'chars' ? 'split-char' : 'split-word'}
            style={{
              display: 'inline-block',
              whiteSpace: isSpace ? 'pre' : 'normal'
            }}
          >
            {char}
          </span>
        ))}
      </Tag>
    );
  };
  
  return renderTag();
};

export default SplitText;
