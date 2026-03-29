import { useEffect, useState, useRef } from 'react';
import s from './TerminalCard.module.scss';

const codeLines = [
  { text: 'const developer = {', color: 'white' },
  { text: '  name: "Lalit Kumar",', color: 'string' },
  { text: '  alias: "KoBruH",', color: 'string' },
  { text: '  from: "India",', color: 'string' },
  { text: '  experience: [', color: 'white' },
  { text: '    "Web & Software Developer @ Freelancer",', color: 'string' },
  { text: '    "Web Developer @ Systemic Altruism",', color: 'string' },
  { text: '  ],', color: 'white' },
  { text: '  education: {', color: 'white' },
  { text: '    degree: "MCA (Cyber Security)",', color: 'string' },
  { text: '    university: "MUJ",', color: 'string' },
  { text: '  },', color: 'white' },
  { text: '  skills: [', color: 'white' },
  { text: '    "React", "Node.js",', color: 'string' },
  { text: '    "Django", "MongoDB",', color: 'string' },
  { text: '  ],', color: 'white' },
  { text: '  hobbies: [', color: 'white' },
  { text: '    "Games", "Reading",', color: 'string' },
  { text: '    "Painting",', color: 'string' },
  { text: '  ],', color: 'white' },
  { text: '  passion: "Full-Stack Dev",', color: 'string' },
  { text: '};', color: 'white' },
  { text: '', color: 'white' },
  { text: 'export default developer;', color: 'keyword' },
];

const RESUME_URL = import.meta.env.VITE_RESUME_URL;

const TerminalCard = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentText, setCurrentText] = useState('');
  // phases: 'typing' | 'compiling' | 'resume'
  const [phase, setPhase] = useState('typing');
  const [compilingDots, setCompilingDots] = useState('');
  const terminalRef = useRef(null);
  const resumeAreaRef = useRef(null);

  // Typing logic
  useEffect(() => {
    if (phase !== 'typing') return;

    if (currentLine >= codeLines.length) {
      setPhase('compiling');
      return;
    }

    const line = codeLines[currentLine];

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + line.text[currentChar]);
        setCurrentChar(prev => prev + 1);
      }, 45);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { text: line.text, color: line.color }]);
        setCurrentText('');
        setCurrentChar(0);
        setCurrentLine(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, phase]);

  // Compiling dots animation then show resume
  useEffect(() => {
    if (phase !== 'compiling') return;
    let dots = '';
    const interval = setInterval(() => {
      dots = dots.length >= 3 ? '' : dots + '.';
      setCompilingDots(dots);
    }, 400);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPhase('resume');
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  // No restart — stays on resume until page reload

  // Native scroll containment for resume area
  useEffect(() => {
    if (phase !== 'resume') return;
    const el = resumeAreaRef.current;
    if (!el) return;

    // On mobile, allow native scrolling
    if (window.innerWidth <= 768) {
      el.style.overflowY = 'auto';
      el.style.webkitOverflowScrolling = 'touch';
      return;
    }

    // Desktop: custom scroll containment
    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: true, capture: true });
    
    return () => {
      el.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [phase]);


  const getLineClass = (color) => {
    switch (color) {
      case 'string': return s.string;
      case 'keyword': return s.keyword;
      case 'comment': return s.comment;
      default: return s.normal;
    }
  };

  return (
    <div className={s.terminal}>
      {/* Title Bar */}
      <div className={s.titleBar}>
        <div className={s.dots}>
          <span className={s.dot} />
          <span className={s.dot} />
          <span className={s.dot} />
        </div>
        <div className={s.titleBarRight} />
      </div>

      {/* Code Area */}
      {phase === 'typing' && (
        <div className={s.codeArea} ref={terminalRef}>
          <div className={s.codeContent}>
            {displayedLines.map((line, i) => (
              <div key={i} className={s.codeLine}>
                <span className={getLineClass(line.color)}>
                  {line.text === '' ? '\u00A0' : line.text}
                </span>
              </div>
            ))}
            {currentLine < codeLines.length && (
              <div className={s.codeLine}>
                <span className={getLineClass(codeLines[currentLine]?.color)}>
                  {currentText}
                </span>
                <span className={s.cursor} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compiling Phase */}
      {phase === 'compiling' && (
        <div className={s.compilingArea}>
          <div className={s.compilingText}>
            <span className={s.compilingLabel}>Compiling</span>
            <span className={s.compilingDots}>{compilingDots}</span>
          </div>
          <div className={s.compilingBar}>
            <div className={s.compilingProgress} />
          </div>
        </div>
      )}

      {/* Resume Phase */}
      {phase === 'resume' && (
        <div
          className={s.resumeArea}
          ref={resumeAreaRef}
        >
          <iframe
            src={RESUME_URL}
            title="Lalit Kumar Resume"
            className={s.resumeFrame}
            loading="lazy"
            allow="autoplay"
          />
        </div>
      )}

      {/* Status Bar */}
      <div className={s.statusBar}>
        <span className={s.statusLeft}>
          {phase === 'typing' && '● developer.js'}
          {phase === 'compiling' && '⚙ Compiling...'}
          {phase === 'resume' && '✓ Resume Loaded'}
        </span>
        <span className={s.statusRight}>
          {phase === 'typing' && `Ln ${Math.min(currentLine + 1, codeLines.length)}, Col ${currentChar + 1}`}
        </span>
      </div>
    </div>
  );
};

export default TerminalCard;
