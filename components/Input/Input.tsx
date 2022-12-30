import { FC, KeyboardEvent } from 'react';
import { UNWANTED_CHARACTERS } from './Input.consts';
import styles from './Input.module.scss';
import { InputProps } from './Input.types';

export const Input: FC<InputProps> = ({
  autoComplete = 'off',
  max,
  min,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}) => (
  <>
    <label className={styles.label} htmlFor={name}>
      {placeholder}
    </label>
    <input
      autoComplete={autoComplete}
      className={styles.input}
      id={name}
      max={max}
      min={min}
      name={name}
      onChange={onChange}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => {
        type === 'number' && UNWANTED_CHARACTERS.includes(event.key) && event.preventDefault();
      }}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  </>
);
