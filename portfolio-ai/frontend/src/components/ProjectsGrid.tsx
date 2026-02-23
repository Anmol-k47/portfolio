import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectsGrid.module.css';

const projects = [
  {
    title: 'Nudge — Social Dating Platform',
    date: 'Oct 2025 – Present',
    description: 'Full-stack social dating app on Google Play. Engineered from mobile to cloud with a focus on performance and scale.',
    bullets: [
      'Cloudflare Workers proxy in front of Firebase Storage → cut egress costs by 90%.',
      'Global edge caching with Tiered Cache, WAF rules against hotlinking.',
      'Low-latency video pipeline with react-native-compressor + expo-video.',
      'Real-time calls via Agora SDK, geolocation features using Maptiler.',
      'Complex Expo CI/CD: Android builds, OTA updates, Play Store deployment.',
    ],
    tags: ['React Native', 'Expo', 'Firebase', 'Cloudflare Workers', 'Agora', 'MapLibre'],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.anonymous.TrueEra', primary: true },
    ],
    accent: 'var(--a1)',
  },
  {
    title: 'Nudge — Marketing Landing Page',
    date: '2025',
    description: 'Conversion-focused landing page with advanced animations and a serverless waitlist backend.',
    bullets: [
      'Scroll-linked parallax effects via Framer Motion.',
      'Serverless waitlist with Google Apps Script + Sheets — secure CORS handling.',
      'Bento grid layout, responsive design, modular component architecture.',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    links: [
      { label: 'Visit Site', href: 'https://www.nudgeapp.dev/', primary: true },
    ],
    accent: 'var(--a2)',
  },
];

const ProjectsGrid: React.FC = () => {
  return (
    <section id="projects">
      <motion.div
        className={styles.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className={styles.sectionLabel}>Selected Projects</p>
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              {/* accent top bar */}
              <div className={styles.accentBar} style={{ background: `linear-gradient(90deg, ${project.accent}, var(--a2))` }} />

              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>{project.date}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                  </div>
                  <div className={styles.linkCol}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link.primary ? styles.linkPrimary : styles.link}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <ul className={styles.bullets}>
                  {project.bullets.map((b) => (
                    <li key={b} className={styles.bullet}>{b}</li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsGrid;
