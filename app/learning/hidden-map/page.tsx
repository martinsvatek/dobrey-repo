'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FC } from 'react';
import { CENTER, OPTIONS } from './page.consts';
import styles from './page.module.scss';

const HiddenMap: FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
    mapIds: ['35bc84e349dca82f'],
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <GoogleMap center={CENTER} mapContainerClassName={styles.map} options={OPTIONS} zoom={12} />
    </>
  );
};

export default HiddenMap;
