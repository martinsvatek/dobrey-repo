import styles from './Footer.module.scss';

export const Footer = (): JSX.Element => (
	<footer className={styles.footer}>
		<a href="https://www.instagram.com/dobreyapp" rel="noopener noreferrer" target="_blank">
			Instagram
		</a>
		<a href="https://www.facebook.com/dobreyapp" rel="noopener noreferrer" target="_blank">
			Facebook
		</a>
	</footer>
);
