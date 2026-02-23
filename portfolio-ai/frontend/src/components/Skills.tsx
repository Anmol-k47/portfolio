import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillGroups = [
  { title: 'Languages', skills: ['C++', 'JavaScript (ES6+)', 'TypeScript', 'Python'], emoji: '🧠' },
  { title: 'Mobile', skills: ['React Native', 'Expo', 'OTA Updates', 'Gradle'], emoji: '📱' },
  { title: 'Web / Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'React'], emoji: '🌐' },
  { title: 'Cloud & DevOps', skills: ['Cloudflare Workers', 'Edge Cache', 'WAF Rules', 'CI/CD (EAS)'], emoji: '☁️' },
  { title: 'Firebase', skills: ['Auth', 'Firestore', 'Storage', 'Cloud Functions'], emoji: '🔥' },
  { title: 'Media & Realtime', skills: ['Agora SDK', 'Video Compression', 'MapLibre', 'Maptiler'], emoji: '🎬' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills">
      <motion.div
        className={styles.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className={styles.sectionLabel}>Technical Skills</p>
        <div className={styles.grid}>
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              className={styles.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupEmoji}>{group.emoji}</span>
                <span className={styles.groupTitle}>{group.title}</span>
              </div>
              <div className={styles.pills}>
                {group.skills.map((s) => (
                  <span key={s} className={styles.pill}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
