import styles from './Form.module.scss';
import { FormProps } from './Form.types';

export const Form = ({ children, onSubmit }: FormProps): JSX.Element => (
	<form className={styles.form} onSubmit={onSubmit}>
		{children}
	</form>
);
