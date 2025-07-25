import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cardStyle = {
  background: 'rgba(28, 28, 30, 0.6)',
  color: '#fff',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
  minWidth: '250px',
  maxWidth: '100%',
};

const imageStyle = {
  width: '60px',
  height: '85px',
  borderRadius: '6px',
  marginRight: '10px',
  objectFit: 'cover',
};

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const tagStyle = {
  background: '#222',
  color: '#ddd',
  borderRadius: '6px',
  padding: '2px 6px',
  fontSize: '10px',
  marginTop: '4px',
  width: 'fit-content',
};

const AnimeCard = ({ image, title, ep, views, type }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // 👈 animate every time it comes into view
    margin: '-50px',
  });

  return (
    <motion.div
      ref={ref}
      style={cardStyle}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={image}
        alt={title}
        style={imageStyle}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        style={infoStyle}
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <strong>{title}</strong>
        <div style={tagStyle}>Ep: {ep} | Views: {views}</div>
        <div style={tagStyle}>{type}</div>
      </motion.div>
    </motion.div>
  );
};

export default AnimeCard;
