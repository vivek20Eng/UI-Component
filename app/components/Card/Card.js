import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, description, isActive, onClick }) => {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
      onClick={onClick}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

export default Card;