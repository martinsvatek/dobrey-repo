import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Nav.module.scss';

export const Nav: FC = () => (
  <nav className={styles.nav}>
    <Link className={styles.logo} href="/" aria-label="Dobrey">
      <Image alt="Dobrey Logo" height={20} src="/dobrey_logo_peach.svg" width={20} />
    </Link>
    <Link href="/learning/self-driving-car">Self driving car</Link>
    <Link href="/learning/shortest-path">Shortest path</Link>
    <Link href="/learning/hidden-map">Hidden map</Link>
    <Link href="/learning/web-scraper">Hidden map</Link>
  </nav>
);
