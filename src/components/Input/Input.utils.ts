import { KeyboardEvent } from 'react';
import { UNWANTED_CHARACTERS } from './Input.consts';
import { InputType } from './Input.types';

/**
 * @NOTE: nenapise nechtene symboly do inputu typu number
 */
export const preventUnwantedCharacters = (event: KeyboardEvent<HTMLInputElement>, type: InputType): void => {
	type === 'number' && UNWANTED_CHARACTERS.includes(event.key) && event.preventDefault();
};
