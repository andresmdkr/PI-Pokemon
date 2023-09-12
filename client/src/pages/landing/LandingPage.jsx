import React from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1>Welcome to the <span className={styles.pokemon}>Pokemon</span> World</h1>
        <p>Discover and catch 'em all!</p>
        <a href="/home" className={styles.btn}>Get Started</a>
      </div>
    </div>
  );
}

export default LandingPage;
