import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SKILL_LIST } from '../../../consts';
import { incrementSkill, decrementSkill } from '../../../store/actions';
import styles from './SkillList.module.css';

const SkillList = ({ filteredCharacter }) => {
  const dispatch = useDispatch();
  const activeCharSkillPointsAvailable = useSelector((state) => state.activeCharSkillPointsAvailable);
  const extractProperty = (filteredCharacter, property) => {
    return filteredCharacter ? filteredCharacter[property] : [];
  };
  
  const skills = extractProperty(filteredCharacter, 'skills');
  const attributes = extractProperty(filteredCharacter, 'attributes');

  const handleIncrement = (skill) => {
    if(activeCharSkillPointsAvailable === 0) {
      alert(`You need more skill points! Upgrade intelligence to get more`); 
      return; 
    }
    dispatch(incrementSkill(skill));
  };

  const handleDecrement = (skill) => {
    dispatch(decrementSkill(skill));
  };

  const getTotal = (skill) => {
    if (skills.length === 0 || attributes.length === 0) {
      return 0;
    }
    return skills[skill.name].points + attributes[skill.attributeModifier].modifier;
  }
  return  skills.length !== 0 || attributes.length !== 0 ? (
    <div className={styles['skill-list']}>
      <h3>Skills</h3>
      <span>Total skill points available: {activeCharSkillPointsAvailable}</span>
      {SKILL_LIST.map((skill) => {
        return (
          <div key={skill?.name} className={styles['skill-row']}>
            <span>{skill?.name}</span>
            <span>Points: {  skills[skill?.name].points} </span>
            <button onClick={() => handleIncrement(skill.name)}>[+]</button>
           <button onClick={() => handleDecrement(skill.name)}>[-]</button>
           <span>
             modifier ({skill?.attributeModifier}): {attributes[skill?.attributeModifier]?.modifier}
           </span>
           <span>
             Total: {getTotal(skill)}
           </span>
          </div>
        )

      }

      )}
    </div>
  ) : <div></div>;
};

export default SkillList;
