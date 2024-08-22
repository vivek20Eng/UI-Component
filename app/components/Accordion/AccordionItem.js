import React from 'react';
import styles from './Accordion.module.css';

const AccordionItem = ({ title, content, isActive, onClick }) => {
  return (
    <div className={styles.accordionItem}>
      <div className={styles.accordionTitle} onClick={onClick}>
        <h3>{title}</h3>
        <span className={isActive ? styles.accordionIconActive : styles.accordionIcon}>
          {isActive ? '-' : '+'}
        </span>
      </div>
      {isActive && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

export default AccordionItem;