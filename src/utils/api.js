import axios from 'axios';
import { GITHUB_USERNAME, POLICYME_BASEURL, POLICYME_BASEURL_END_POINT } from '../consts';
import { setCharacters } from '../store/actions';

export const saveCharacter = async (filteredCharacter) => {
    try {
      await axios.post(
        `${POLICYME_BASEURL}{${GITHUB_USERNAME}}${POLICYME_BASEURL_END_POINT}`, filteredCharacter , {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Character saved successfully!');
    } catch (error) {
      alert('Error saving character data');
    }
  };

export const loadCharacter = async (dispatch) => {
try {
    const response = await fetch(`${POLICYME_BASEURL}{${GITHUB_USERNAME}}${POLICYME_BASEURL_END_POINT}`);
    const res = await response.json();
    if(Object.values(res.body).length){
        dispatch(setCharacters(res.body));
    }
} catch (error) {
    console.error('Failed to load character:', error);
}
};