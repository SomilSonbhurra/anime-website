import React from 'react'

export default function Footer() {
    const characters = ['All', '#', '0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  return (
     <div style={styles.container}>
      <h3 style={styles.heading}>A-Z LIST</h3>
      <p style={styles.subheading}>Searching anime order by alphabet name A to Z.</p>
      <div style={styles.buttonContainer}>
        {characters.map((char, index) => (
          <button key={index} style={styles.button}>
            {char}
          </button>
        ))}
      </div>
      <div style={styles.links}>
        <a href="#" style={styles.link}>Terms of service</a>
        <a href="#" style={styles.link}>DMCA</a>
        <a href="#" style={styles.link}>Contact</a>
        <a href="#" style={styles.link}>Anime App</a>
      </div>
      <p style={styles.disclaimer}>
        AniWatch does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
      </p>
      <p style={styles.copyright}>© AniWatch.to. All rights reserved.</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1f1f1f',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '5px',
    fontSize: '20px',
  },
  subheading: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#ccc',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#2e2e2e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  links: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '14px',
  },
  disclaimer: {
    fontSize: '13px',
    color: '#888',
    marginTop: '10px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  copyright: {
    fontSize: '13px',
    color: '#555',
    marginTop: '5px',
  },
};

