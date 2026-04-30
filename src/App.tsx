import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── ICONS ──────────────────────────────────────────────────────────────────
const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.5-3.4c.1-.3.5-1.6-.1-3.4 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C4.3 1.3 3 1.7 3 1.7c-.6 1.8-.2 3.1-.1 3.4A5 5 0 0 0 1.5 8.6c0 5 3 6.2 6 6.5-.4.4-.7 1.1-.8 2.1-.5.2-1.7.6-2.5-.7-.8-1.5-2-1.6-2-1.6-.9 0 0 .1 0 .1 1 .6 1.5 1.7 1.5 1.7 1 1.7 2.5 2 2.5 2V22" /></svg>
);
const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const MailIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const ChevronRight = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);
const CodeIcon = ({ size = 70, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const BrainIcon = ({ size = 48, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 13h4" /><path d="M12 5h4" /><path d="M16 13a2 2 0 1 1 0 4h-1" /><path d="M16 5a2 2 0 1 0 0 4h-1" /></svg>
);
const DbIcon = ({ size = 48, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></svg>
);
const CloudIcon = ({ size = 48, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
);
const ExternalIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
);

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px'; }
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const addHover = () => ring.current?.classList.add('hovering');
    const removeHover = () => ring.current?.classList.remove('hovering');
    document.querySelectorAll('a, button, .skill-tag, .social-icon').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function Counter({ to, suffix = '', start = false }: { to: number; suffix?: string; start?: boolean }) {
  const [val, setVal] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (start && !hasStarted.current) {
      hasStarted.current = true;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to, duration: 1.5, ease: 'power3.out',
        onUpdate: () => setVal(Math.round(obj.v)),
      });
    }
    if (!start) {
      hasStarted.current = false;
      setVal(0);
    }
  }, [start, to]);

  return <span>{val}{suffix}</span>;
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = ['FastAPI', 'Machine Learning', 'Cloud', 'React', 'Flask', 'AWS', 'AGAPS'];
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}<span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── FALLING STARS ──────────────────────────────────────────────────────────
function FallingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];
    const starCount = 15;

    const createStar = () => ({
      x: Math.random() * width * 1.5,
      y: Math.random() * -height * 0.5,
      length: Math.random() * 30 + 10,
      speed: Math.random() * 10 + 6,
      opacity: Math.random() * 0.3 + 0.05,
    });

    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 2;
      ctx.shadowColor = '#ffffff';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.globalAlpha = star.opacity;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length);
        ctx.stroke();

        star.x -= star.speed;
        star.y += star.speed;

        if (star.y > height + star.length || star.x < -star.length) {
          const newStar = createStar();
          Object.assign(star, newStar);
          // Start some stars from the top edge and some from the right edge
          if (Math.random() > 0.5) {
            star.y = -star.length;
            star.x = Math.random() * width + width * 0.2;
          } else {
            star.x = width + star.length;
            star.y = Math.random() * height * 0.5;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.6
      }}
    />
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const horizTrackRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(-1);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ['start start', 'end end'],
  });

  // Strict animation sequence: 0: Headline, 1: Paragraphs, 2: Stats, 3: Card, 4-15: Skills
  useMotionValueEvent(aboutScroll, 'change', (v) => {
    if (v < 0.05) setActiveStep(-1);
    else if (v < 0.15) setActiveStep(0);
    else if (v < 0.25) setActiveStep(1);
    else if (v < 0.35) setActiveStep(2);
    else if (v < 0.45) setActiveStep(3);
    else {
      const skillIdx = Math.floor(((v - 0.45) / 0.5) * 12);
      setActiveStep(4 + skillIdx);
    }
  });

  // ── Lenis Smooth Scroll ────────────────────────────────────────────────────
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  // ── GSAP Animations ────────────────────────────────────────────────────────
  useGSAP(() => {
    // 1. Hero character-by-character text reveal
    const heroLines = gsap.utils.toArray<HTMLElement>('.char-inner', heroRef.current);
    gsap.fromTo(heroLines,
      { y: '110%', rotate: 3, opacity: 0 },
      { y: '0%', rotate: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.2 }
    );
    gsap.fromTo('.hero-kicker', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.1 });
    gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', delay: 0.7 });
    gsap.fromTo('.hero-btns', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.9 });

    // 2. Section headings — clip reveal on scroll
    gsap.utils.toArray<HTMLElement>('.reveal-line').forEach(el => {
      gsap.fromTo(el, { y: '105%' }, {
        y: '0%', duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: el.parentElement, start: 'top 88%', toggleActions: 'play none none reverse' },
      });
    });

    // 6. Section big text scale reveal
    gsap.fromTo('.projects-big', { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: '.projects-big', start: 'top bottom-=100px', toggleActions: 'play none none reverse' },
    });

    gsap.fromTo('.contact-big', { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: '.contact-big', start: 'top bottom-=100px', toggleActions: 'play none none reverse' },
    });
  }, { scope: containerRef });

  const skills = ['React.js', 'TypeScript', 'Flask', 'FastAPI', 'Scikit-learn', 'LightGBM', 'TensorFlow', 'XGBoost', 'AWS', 'Docker', 'PostgreSQL', 'Charts.js', 'Kubernetes'];
  const projects = [
    { title: 'Disease Outbreak Predictor', desc: 'Research-grade ML platform predicting public health risks with high accuracy, integrating FastAPI, LightGBM, and LLM decision support.', tags: ['FastAPI', 'Scikit-learn', 'LightGBM', 'Qwen', 'React'], icon: <BrainIcon /> },
    { title: 'Chat Based Education Platform', desc: 'An interactive learning environment where students can learn at their own pace with the help of our RAG powered LLM tutor.', tags: ['FastAPI', 'React', 'Llama', 'TypeScript'], icon: <DbIcon /> },
    { title: 'Business intelligence automator', desc: 'A web-based tool that automates the process of generating business intelligence reports', tags: ['Flask', 'React', 'Plotly', 'LLM'], icon: <CloudIcon /> },
  ];

  return (
    <div ref={containerRef}>
      <div className="grain" />
      <Cursor />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <div className="navbar-glass" />
      <nav className="navbar">
        <div className="navbar-logo">ANANT.</div>
        <div className="navbar-links">
          {['About', 'Projects', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="hero-section bg-blue section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <FallingStars />
        <div className="max-width hero-content">
          <p className="hero-kicker">Hi, my name is</p>

          {['ANANT', 'PANDEY.'].map((word, wi) => (
            <div key={wi} style={{ overflow: 'hidden', lineHeight: 0.9, marginBottom: 8 }}>
              <h1 className="hero-title" style={{ display: 'block', margin: 0 }}>
                {word.split('').map((ch, ci) => (
                  <span key={ci} className="char">
                    <span
                      className="char-inner"
                      style={{ color: wi === 1 ? '#ffffff' : '#ffffff' }}
                    >{ch === '.' ? '.' : ch}</span>
                  </span>
                ))}
              </h1>
            </div>
          ))}

          <p className="hero-subtitle" style={{ marginTop: 28, opacity: 0 }}>
            I build scalable intelligent systems —<br />
            <strong>Fullstack Developer · ML Engineer · Cloud Architect</strong>
          </p>

          <div className="hero-btns" style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap', opacity: 0 }}>
            <a href="#projects" className="btn btn-yellow">
              <span>View My Work</span><ChevronRight />
            </a>
            <a href="#contact" className="btn btn-outline-white">
              <span>Get In Touch</span><MailIcon size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── ABOUT (PINNED SCROLL-JACK) ─────────────────────────────────────── */}
      <section ref={aboutRef} id="about" className="bg-yellow" style={{ height: '320vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 'var(--nav-height)', height: 'calc(100vh - var(--nav-height))', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div className="max-width about-grid about-inner-padding" style={{ width: '100%' }}>

            {/* Left */}
            <div className="about-text">
              <motion.div
                className="clip-reveal"
                style={{ marginBottom: 28 }}
                animate={{ opacity: activeStep >= 0 ? 1 : 0, y: activeStep >= 0 ? 0 : 26 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="reveal-line" style={{ fontSize: 'clamp(3rem,6vw,5rem)', fontWeight: 900, fontFamily: 'Outfit', textTransform: 'uppercase', color: '#000000', display: 'block' }}>About Me.</span>
              </motion.div>
              <motion.p
                animate={{ opacity: activeStep >= 1 ? 1 : 0, y: activeStep >= 1 ? 0 : 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >I'm a passionate engineer thriving at the intersection of web development, machine learning, and cloud infrastructure — building apps that are fast, scalable, and deeply intelligent.</motion.p>
              <motion.p
                animate={{ opacity: activeStep >= 1 ? 1 : 0, y: activeStep >= 1 ? 0 : 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >From high-impact enterprise dashboards to outbreak-predicting ML models, I bring a holistic systems-level approach to every problem.</motion.p>

              {/* Stats */}
              <div className="stats-row" style={{ display: 'flex', gap: 40, margin: '16px 0' }}>
                {[
                  { n: 5, s: '+', label: 'Projects Shipped' },
                  { n: 7, s: '+', label: 'Hackathons attended' },
                  { n: 7, s: '+', label: 'Tech Stacks' }
                ].map((st, i) => (
                  <motion.div
                    key={st.label}
                    className="stat-item"
                    animate={{ opacity: activeStep >= 2 ? 1 : 0, y: activeStep >= 2 ? 0 : 30 }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                  >
                    <div className="stat-num">
                      <Counter to={st.n} suffix={st.s} start={activeStep >= 2} />
                    </div>
                    <div className="stat-label">{st.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Skill Tags */}
              <div className="skills-container">
                {skills.map((skill, i) => {
                  const visible = activeStep >= 4 + i;
                  return (
                    <motion.span
                      key={skill}
                      className="skill-tag"
                      initial={false}
                      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24, scale: visible ? 1 : 0.8, rotateX: visible ? 0 : 30 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'bottom center', display: 'inline-block' }}
                    >
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            {/* Right — 3D Card */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.div
                className="about-card-wrap"
                initial={false}
                animate={{
                  opacity: activeStep >= 3 ? 1 : 0,
                  y: activeStep >= 3 ? 0 : 60,
                  scale: activeStep >= 3 ? 1 : 0.88,
                  rotateY: activeStep >= 3 ? 0 : -12,
                }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', perspective: 1000 }}
              >
                <div className="about-card">
                  <CodeIcon size={72} color="#FFFFFF" />
                  <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>
                  <CloudIcon size={52} color="#FFFFFF" />
                </div>
                <div className="about-card-shadow" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS (HORIZONTAL SCROLL) ───────────────────────────────────── */}
      <section
        ref={projectsRef}
        id="projects"
        className="projects-section"
      >
        {/* Heading — sits above the track */}
        <div className="projects-heading">
          <h2 className="projects-big" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, fontFamily: 'Outfit', textTransform: 'uppercase', color: '#FFFFFF', display: 'block', opacity: 0, scale: 0.8, transformOrigin: 'center' }}>
            Featured Projects.
          </h2>
        </div>

        {/* Horizontal track — GSAP moves this left */}
        <div className="projects-viewport">
          <div ref={horizTrackRef} className="projects-horiz-wrapper">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                className="project-card-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '10000px 0px -50px 0px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              >
                <motion.div
                  className="project-card"
                  whileHover={{ y: -12, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.35)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                >
                  <div className="project-card-inner">
                    <div className="project-image">{p.icon}</div>
                    <div className="project-content">
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="project-tags">
                        {p.tags.map(t => <span key={t} className="project-tag">#{t} </span>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="contact-section section-padding">
        <div className="max-width">
          <h2 className="contact-big" style={{ opacity: 0, scale: 0.8, transformOrigin: 'center', display: 'block' }}>
            Let's Build<br />Something Great.
          </h2>
          <div className="clip-reveal" style={{ marginBottom: 40 }}>
            <p className="reveal-line" style={{ color: '#666666', maxWidth: 560, margin: '0 auto', display: 'block', lineHeight: 1.7 }}>
              I'm open to new opportunities and collaborations. Whether you have a project in mind or just want to say hello — let's talk.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: '10000px 0px -50px 0px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            <a href="mailto:anantpandey9876@gmail.com" className="btn btn-blue" style={{ fontSize: '1.1rem', padding: '16px 44px' }}>
              <span>Say Hello</span><MailIcon size={20} />
            </a>
          </motion.div>

          <div className="social-links">
            {[
              { icon: <GithubIcon size={26} />, href: 'https://www.github.com/ap-invincible', label: 'GitHub' },
              { icon: <LinkedinIcon size={26} />, href: 'https://www.linkedin.com/in/ap-invincible', label: 'LinkedIn' },
              { icon: <MailIcon size={26} />, href: 'mailto:anantpandey9876@gmail.com', label: 'Email' },
            ].map(({ icon, href, label }, i) => (
              <motion.a
                key={i} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label}
                className="social-icon blue"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '10000px 0px -50px 0px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.15, rotate: 8 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer>
        <p>Designed & Built by <strong>Anant Pandey</strong></p>
        <p style={{ marginTop: 6, opacity: 0.6 }}>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}
