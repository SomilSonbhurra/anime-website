import React from 'react';
import { motion } from 'framer-motion';
import './About.css'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-12">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Banner Image */}
        <motion.img
          src="/img/banner.jpg"
          alt="Anime Banner"
          className="anime-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400 text-center">
          About AnimeVerse
        </h1>

        {/* Intro */}
        <motion.p
          className="text-lg leading-relaxed mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <strong>AnimeVerse</strong> is your one-stop anime universe — watch, discover, and enjoy anime like never before.
        </motion.p>

        {/* Features Section with Character Image */}
        <motion.div
          className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <img
            src="/img/about/luffy.png"
            alt="Luffy"
            className="w-full max-w-sm mx-auto md:mx-0"
          />
          <div>
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">🚀 Features</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>🔍 Real-time anime search</li>
              <li>🎥 Stream trailers and episodes</li>
              <li>📱 Mobile-friendly design</li>
              <li>🧠 Fast performance with public APIs</li>
              <li>🆓 100% free & ad-free</li>
            </ul>
          </div>
        </motion.div>

        {/* About Us with Naruto */}
        <motion.div
          className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">🙋 About the Developer</h2>
            <p className="text-lg leading-relaxed">
              Hey! I’m <strong>Somil Sonbhurra</strong> — developer, dreamer, and die-hard anime fan.
              I created AnimeVerse to bring anime lovers like you a smoother, cooler way to watch what you love.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Built using <strong>React, Node.js, MongoDB, Framer Motion</strong> — this is more than code; it’s a community.
            </p>
          </div>
          <img
            src="/img/about/naruto.png"
            alt="Naruto"
            className="w-full max-w-xs mx-auto md:mx-0"
          />
        </motion.div>

        {/* Contact */}
        <motion.div
          className="border-t border-purple-700 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-purple-300 mb-3">📫 Contact & Feedback</h2>
          <p className="text-lg leading-relaxed">
            Want to collaborate, give feedback, or just talk anime? Reach out below:
          </p>
          <ul className="mt-3 space-y-2 text-lg">
            <li>📧 Email: <a href="mailto:animeverse.dev@gmail.com" className="text-blue-400 underline">animeverse.dev@gmail.com</a></li>
            <li>💻 GitHub: <a href="https://github.com/somil0707" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">github.com/somil0707</a></li>
            <li>🌐 Website: <a href="https://anime-website-chi-wheat.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">AnimeVerse</a></li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
