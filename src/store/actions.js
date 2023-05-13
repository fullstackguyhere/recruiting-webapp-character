export const actionTypes = {
    ADD_CHARACTER: 'ADD_CHARACTER',
    SET_CHARACTERS: 'SET_CHARACTERS',
    UPDATE_CHARACTER: 'UPDATE_CHARACTER',
    SWITCH_CHARACTER: 'SWITCH_CHARACTER',
    INCREMENT_ATTRIBUTE: 'INCREMENT_ATTRIBUTE',
    DECREMENT_ATTRIBUTE: 'DECREMENT_ATTRIBUTE',
    INCREMENT_SKILL: 'INCREMENT_SKILL',
    DECREMENT_SKILL: 'DECREMENT_SKILL',
  };
  
  export const addCharacter = (character) => ({
    type: actionTypes.ADD_CHARACTER,
    payload: character,
  });
  
  export const setCharacters = (characters) => ({
    type: actionTypes.SET_CHARACTERS,
    payload: characters,
  })
  
  export const updateCharacter = (character) => ({
    type: actionTypes.UPDATE_CHARACTER,
    payload: character,
  });
  
  export const switchCharacter = (characterId) => ({
    type: actionTypes.SWITCH_CHARACTER,
    payload: characterId,
  });
  
  export const incrementAttribute = (attribute) => ({
    type: actionTypes.INCREMENT_ATTRIBUTE,
    payload: { attribute },
  });
  
  export const decrementAttribute = (attribute) => ({
    type: actionTypes.DECREMENT_ATTRIBUTE,
    payload: { attribute },
  });
  
  export const incrementSkill = (skill) => ({
    type: actionTypes.INCREMENT_SKILL,
    payload: { skill },
  });
  
  export const decrementSkill = (skill) => ({
    type: actionTypes.DECREMENT_SKILL,
    payload: { skill },
  });
  