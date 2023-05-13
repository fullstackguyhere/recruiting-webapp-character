import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ATTRIBUTE_LIST } from '../../consts';
import AttributeRow from './AttributeRow/AttributeRow';
import ClassList from './ClassList/ClassList';
import SkillList from './SkillList/SkillList';
import styles from './Character.module.css';
import { loadCharacter, saveCharacter } from '../../utils/api';

const Character = () => {
  const currentState = useSelector((state) => state);
  const {characters, activeCharacterId} = currentState;
  const filteredCharacter = characters.find(character => character.characterId === activeCharacterId);
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    loadCharacter(dispatch);
  }, []);

  return (
    <div className={styles['character-container']}>
      <div className={styles['character-header']}>
        <h2>Character {activeCharacterId}</h2>
        <div>
          <button onClick={() => saveCharacter(filteredCharacter)}>Save</button>
          {/* <button onClick={() => loadCharacter(dispatch)}>Load</button> */}
        </div>
      </div>
      <div>
        {characters.length &&  ATTRIBUTE_LIST.map((attribute) => (
          <AttributeRow key={attribute} filteredCharacter={filteredCharacter} currentAttribute={attribute} />
        ))}
      </div>
      <ClassList filteredCharacter={filteredCharacter} />
      <SkillList filteredCharacter={filteredCharacter} />
    </div>
  );
};

export default Character;
