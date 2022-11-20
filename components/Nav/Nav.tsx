import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Nav.module.scss';

export const Nav: FC = () => (
  <nav className={styles.nav}>
    <Link className={styles.logo} href="/" aria-label="Dobrey">
      <Image alt="Dobrey Logo" height={20} src="/dobrey_logo.svg" width={20} />
    </Link>
    <Link href="/self-driving-car">Self driving car</Link>
    <Link href="/shortest-path">Shortest path</Link>
  </nav>
);
