import React, { useState } from 'react';
import { CLASS_LIST } from '../../../consts';
import styles from './ClassList.module.css';

const ClassList = ({ filteredCharacter }) => {
  const [selectedClass,setSelectedClass] = useState(null);

  const meetsRequirements = (className) => {
    const classRequirements = CLASS_LIST[className];
    for (const classes in classRequirements) {
      if (filteredCharacter?.attributes[classes].points < classRequirements[classes]) {
        return false;
      }
    }
    return true;
  };

  const handleClick = (className) => {
    setSelectedClass(className);
  };

  return (
    <div className={styles['class-list']}>
      <h3>Classes</h3>
      {Object.keys(CLASS_LIST).map((className) => (
        <div
        key={className}
        className={`${styles['class-item']} ${
          meetsRequirements(className) ? styles['meets-requirements'] : ''
        }`}
        onClick={() => handleClick(className)}
      >
        {className}
      </div>
      ))}
      {selectedClass && (
        <div className={styles['class-requirements']}>
          <h4>Minimum Requirements for {selectedClass}:</h4>
          <ul>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
              <li key={attr}>
                {attr}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClassList;
