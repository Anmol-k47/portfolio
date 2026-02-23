import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const Hero: React.FC = () => {
  const stack = ['C++', 'JavaScript', 'TypeScript', 'React Native', 'Node.js', 'Firebase', 'Cloudflare Workers', 'Python'];

  return (
    <section id="about" className={styles.heroSection}>
      <motion.div {...fadeUp(0)}>
        <p className={styles.kicker}>
          <span className={styles.dot} /> Available for opportunities · Lucknow, India
        </p>
      </motion.div>

      <motion.h1 className={styles.headline} {...fadeUp(0.1)}>
        Building<br />
        <span className={styles.gradientName}>Anmol Kashyap</span>
      </motion.h1>

      <motion.p className={styles.tagline} {...fadeUp(0.2)}>
        CS undergraduate at <strong>IIITDM Kurnool</strong> (2026). I build{' '}
        <strong>scalable APIs</strong>, production mobile apps, and cloud-native systems —
        from edge network optimizations to pixel-perfect mobile UIs.
      </motion.p>

      <motion.div className={styles.metaRow} {...fadeUp(0.3)}>
        <span className={styles.metaItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          B.Tech CSE · Grad 2026
        </span>
        <span className={styles.metaItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          100+ LeetCode problems
        </span>
        <span className={styles.metaItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          github.com/anmol
        </span>
      </motion.div>

      <motion.div className={styles.ctaRow} {...fadeUp(0.4)}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); document.querySelector<HTMLButtonElement>('[aria-label="Open Chat"]')?.click(); }}
          className={styles.btnPrimary}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Chat with my Resume
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.anonymous.TrueEra"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnSecondary}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          View Nudge on Play Store
        </a>
      </motion.div>

      <motion.div {...fadeUp(0.5)}>
        <p className={styles.stackLabel}>Tech I work with</p>
        <div className={styles.badges}>
          {stack.map((tech, i) => (
            <motion.span
              key={tech}
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.55 + i * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
