import { ChangeEvent } from 'react';

export interface InputProps {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
  autoComplete?: 'on' | 'off';
  max?: number;
  min?: number;
  type?: 'text' | 'number' | 'password';
}