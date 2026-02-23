import React from 'react';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectsGrid from './components/ProjectsGrid';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <>
      {/* Animated mesh background */}
      <div className="mesh-bg" />
      <Navbar />
      <Layout>
        <Hero />
        <Skills />
        <ProjectsGrid />
      </Layout>
      <ChatWidget />
    </>
  );
};

export default App;
