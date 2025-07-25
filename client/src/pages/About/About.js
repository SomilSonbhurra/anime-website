import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';
import { FaChevronDown } from 'react-icons/fa';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';

export default function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-12">
      <motion.div className="max-w-5xl mx-auto">
        {/* Banner Image */}

        <div className="anime-banner-section">
          {/* Motion wrapper for background */}
          <motion.div
            className="anime-banner-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Motion overlay container */}
          <motion.div
            className="anime-banner-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }} // waits for banner
          >
            <motion.h1
              className="banner-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Anime
            </motion.h1>

            <motion.p
              className="banner-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              AnimeVerse is your one-stop anime universe — watch, discover, and enjoy anime like never before.
            </motion.p>
          </motion.div>
        </div>

        {/* Reusable Dropdown Sections */}
        <DropdownSection
          title="🚀 Features"
          sectionKey="features"
          isOpen={openSection === 'features'}
          toggle={toggleSection}
          textContent={
            <ul>
              <li>🔍 Real-time anime search</li>
              <li>🎥 Stream trailers and episodes</li>
              <li>📱 Mobile-friendly design</li>
              <li>🧠 Fast performance with public APIs</li>
              <li>🆓 100% free & ad-free</li>
            </ul>
          }
          imageClass="feature-image"
        />

        <DropdownSection
          title="🙋 About the Developer"
          sectionKey="about"
          isOpen={openSection === 'about'}
          toggle={toggleSection}
          textContent={
            <>
              <p>Hey! I’m <strong>Somil Sonbhurra</strong> — developer, dreamer, and die-hard anime fan.</p>
              <p>I created AnimeVerse to bring anime lovers like you a smoother, cooler way to enjoy anime.</p>
              <p>Built using <strong>React, Node.js, MongoDB, Framer Motion</strong> — this is more than code; it’s a community.</p>
            </>
          }
          imageClass="about-image"
        />

        <DropdownSection
          title="📫 Contact"
          sectionKey="contact"
          isOpen={openSection === 'contact'}
          toggle={toggleSection}
          textContent={
            <div>
              📧 <a href="mailto:animeverse.dev@gmail.com">animeverse.dev@gmail.com</a><br />
              💻 <a href="https://github.com/somil0707" target="_blank" rel="noreferrer">GitHub</a><br />
              🌐 <a href="https://anime-website-chi-wheat.vercel.app/" target="_blank" rel="noreferrer">AnimeVerse</a>
            </div>
          }
          imageClass="contact-image"
        />

        <DropdownSection
          title="📝 Feedback"
          sectionKey="feedback"
          isOpen={openSection === 'feedback'}
          toggle={toggleSection}
          textContent={<FeedbackForm />}
          imageClass="feedback-image"
        />
      </motion.div>
    </div>
  );
}

// Reusable Dropdown Section Component
function DropdownSection({ title, sectionKey, isOpen, toggle, textContent, imageClass }) {
  return (
    <div className="about-dropdown-wrapper">
      <button className="about-dropdown-toggle" onClick={() => toggle(sectionKey)}>
        <span>{title}</span>
        <motion.span
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="info-block"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="info-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {textContent}
            </motion.div>

            <motion.div
              className={`info-image ${imageClass}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
