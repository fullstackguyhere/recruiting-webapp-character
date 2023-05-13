import { actionTypes } from './actions';
import { v4 as uuidv4 } from 'uuid';
import { calculateModifier, getAttrPointsAvailable, getPointsAvailable } from './utils';


export const initialState = {
  characters: [],
  activeCharacterId: 1,
  activeCharSkillPointsAvailable: 0,
  activeCharAttrPointsAvailable: 0,
  activeCharIntelModifier: 0
};



const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CHARACTER:
      return { ...state, characters: [...state.characters, action.payload] };

    case actionTypes.SET_CHARACTERS:
      if(state.characters.length === 0) {
        if(Array.isArray(action.payload)) {
          // logic to handle mutiple characters
          // const activeCharacterId = action.payload[0].characterId;
          // const pointsAvailable = getPointsAvailable(action.payload[0].attributes.Intelligence.modifier);
          // return { ...state, characters: [...state.characters, ...action.payload], activeCharSkillPointsAvailable: pointsAvailable };
        } else {
          const characterId = action.payload.characterId || uuidv4();
          const {attributes, skills} = action.payload;
          const skillPointsAvailable = getPointsAvailable(action.payload.attributes.Intelligence.modifier);
          const attrPointsAvailable = getAttrPointsAvailable(action.payload.attributes);
          const character = {
            characterId,
            attributes,
            skills
          }
          return { ...state, characters: [...state.characters, character],
            activeCharacterId: characterId, 
            activeCharSkillPointsAvailable: skillPointsAvailable,
            activeCharAttrPointsAvailable: attrPointsAvailable,
            activeCharIntelModifier: action.payload.attributes.Intelligence.modifier};
        }
      }
      return state;

    case actionTypes.SWITCH_CHARACTER:

      return { ...state, activeCharacterId: action.payload };

    case actionTypes.UPDATE_CHARACTER:
      const updatedCharacters = state.characters.map((character) =>
        character.id === action.payload.id ? action.payload : character
      );
      return { ...state, characters: updatedCharacters };

    case actionTypes.INCREMENT_ATTRIBUTE:
      // write logic for intelligence
      const incrementedCharacters = state.characters.map((character) => {
        if (character.characterId === state.activeCharacterId) {
          const currentPoints = character.attributes[action.payload.attribute].points;
          const newPoints = currentPoints + 1;
          const newModifier = calculateModifier(newPoints);
          return {
            ...character,
            attributes: {
              ...character.attributes,
              [action.payload.attribute]: {
                points: newPoints,
                modifier: newModifier,
              },
            },
          };
        }
        return character;
      });
      if(action.payload.attribute === 'Intelligence') {
        const character = incrementedCharacters.find(character => character.characterId === state.activeCharacterId);
        const {modifier} = character.attributes[action.payload.attribute];
        if(modifier !== state.activeCharIntelModifier) {
          const newSkillPoints = getPointsAvailable(modifier) - getPointsAvailable(state.activeCharIntelModifier);
          // newSkillPoints = newSkillPoints < 0 ? 0 : newSkillPoints;
          return { ...state, characters: incrementedCharacters,
            activeCharAttrPointsAvailable: state.activeCharAttrPointsAvailable - 1,
            activeCharSkillPointsAvailable: state.activeCharSkillPointsAvailable + newSkillPoints,
            activeCharIntelModifier: modifier
          };
        }
        
      }
      return { ...state, characters: incrementedCharacters,
        activeCharAttrPointsAvailable: state.activeCharAttrPointsAvailable - 1 };

    case actionTypes.DECREMENT_ATTRIBUTE:
      const decrementedCharacters = state.characters.map((character) => {
        if (character.characterId === state.activeCharacterId) {
          const currentPoints = character.attributes[action.payload.attribute].points;
          const newPoints = currentPoints - 1;
          const newModifier = calculateModifier(newPoints);
          return {
            ...character,
            attributes: {
              ...character.attributes,
              [action.payload.attribute]: {
                points: newPoints,
                modifier: newModifier,
              },
            },
          };
        }
        return character;
      });
      if(action.payload.attribute === 'Intelligence') {
        const character = decrementedCharacters.find(character => character.characterId === state.activeCharacterId);
        const {modifier} = character.attributes[action.payload.attribute];
        if(modifier !== state.activeCharIntelModifier) {
          const newSkillPoints = getPointsAvailable(modifier) - getPointsAvailable(state.activeCharIntelModifier);
          // newSkillPoints = newSkillPoints < 0 ? 0 : newSkillPoints;
          return { ...state, characters: decrementedCharacters,
            activeCharAttrPointsAvailable: state.activeCharAttrPointsAvailable + 1,
            activeCharSkillPointsAvailable: state.activeCharSkillPointsAvailable + newSkillPoints,
            activeCharIntelModifier: modifier
          };
        }
      }
      return { ...state, characters: decrementedCharacters,
        activeCharAttrPointsAvailable: state.activeCharAttrPointsAvailable + 1 };

    case actionTypes.INCREMENT_SKILL:
      const incrementedSkillCharacters = state.characters.map((character) => {
        if (character.characterId === state.activeCharacterId) {
          const skill = character.skills[action.payload.skill];
          const currentPoints = skill.points;
          const newPoints = currentPoints + 1;
          const {attributeModifier} = skill;
          return {
            ...character,
            skills: {
              ...character.skills,
              [action.payload.skill]: {
                points: newPoints,
                attributeModifier,
              },
            },
          };
        }
        return character;
      });
      return { ...state, characters: incrementedSkillCharacters,
        activeCharSkillPointsAvailable: state.activeCharSkillPointsAvailable - 1  };

    case actionTypes.DECREMENT_SKILL:
      const decrementedSkillCharacters = state.characters.map((character) => {
        if (character.characterId === state.activeCharacterId) {
          const skill = character.skills[action.payload.skill];
          const currentPoints = skill.points;
          const newPoints = currentPoints - 1;
          const {attributeModifier} = skill;
          return {
            ...character,
            skills: {
              ...character.skills,
              [action.payload.skill]: {
                points: newPoints,
                attributeModifier,
              },
            },
          };
        }
        return character;
      });
      return { ...state, characters: decrementedSkillCharacters,
        activeCharSkillPointsAvailable: state.activeCharSkillPointsAvailable + 1 };

    default:
      return state;
  }
};


export default characterReducer;
