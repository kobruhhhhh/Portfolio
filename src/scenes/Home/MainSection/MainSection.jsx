import { lazy, Suspense, useMemo } from "react";
import s from "./MainSection.module.scss";
import Typewriter from "../../../components/UIElements/Typewriter/Typewriter";
import SplitText from "../../../components/UIElements/SplitText/SplitText";
import Carousel from "../../../components/UIElements/Carousel/Carousel";
import codeImage from "../../../assets/code.png";
import kbImage from "../../../assets/kb.png";

const Lanyard = lazy(
  () => import("../../../components/UIElements/Lanyard/Lanyard"),
);

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Hallo",
  "Namaste",
  "Shalom",
  "Olá",
];

const carouselItems = [
  {
    id: 1,
    title: "Code",
    image: codeImage,
  },
  {
    id: 2,
    title: "KB",
    image: kbImage,
  },
];

const MainSection = () => {
  // Pick a random greeting once per load/reload — stable during session
  const greeting = useMemo(
    () => greetings[Math.floor(Math.random() * greetings.length)],
    [],
  );

  return (
    <section className={s.content}>
      <div className={s.contentWrapper}>
        <div className={s.header}>
          <div style={{ paddingBottom: 15 }} className={s.title}>
            <SplitText
              text={`${greeting}! `}
              className={s.titleText}
              delay={50}
              duration={1.25}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="h2"
            />
            <span className={s.wave}></span>
          </div>

          <div className={s.mainTitle}>
            <SplitText
              text="I'm "
              className={s.mainTitleText}
              delay={50}
              duration={1.25}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="h1"
            />
            <SplitText
              text="Lalit Kumar"
              className={s.mainName}
              delay={50}
              duration={1.25}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="strong"
            />
          </div>

          <div style={{ paddingTop: 50 }}>
            <Typewriter
              strings={[
                "Full-Stack Developer",
                "MERN Specialist",
                "AI / ML Enthusiast",
                "Certified Cybersecurity Analyst",
                "Freelance Software Engineer",
                "Continuously Learning....",
              ]}
              wrapperClassName={s.typewriterWrapper}
              cursorClassName={s.typewriterCursor}
            />
          </div>

          {/* Mobile Carousel */}
          <div className={s.mobileCarouselContainer}>
            <Carousel
              items={carouselItems}
              baseWidth={330}
              autoplay
              autoplayDelay={2000}
              pauseOnHover
              loop
              round
            />
          </div>
        </div>

        <div className={s.lanyardContainer}>
          <Suspense
            fallback={<div style={{ width: "100%", height: "80vh" }}></div>}
          >
            <Lanyard position={[0, -5, 24]} gravity={[0, -40, 0]} fov={25} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
