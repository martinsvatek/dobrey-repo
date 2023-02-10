import { FC } from 'react';
import styles from './Form.module.scss';
import { FormProps } from './Form.types';

export const Form: FC<FormProps> = ({ children, onSubmit }) => (
	<form className={styles.form} onSubmit={onSubmit}>
		{children}
	</form>
);
