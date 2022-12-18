'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FC } from 'react';
import styles from './page.module.scss';

const CENTER: google.maps.LatLngLiteral = { lat: 50, lng: 14 };

const OPTIONS = {
  minZoom: 5,
  disableDefaultUI: true,
  mapId: '35bc84e349dca82f',
  maxZoom: 15,
};

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
      <GoogleMap
        onIdle={() => console.log('idle')}
        onTilesLoaded={() => console.log('tiles loaded')}
        onLoad={() => console.log('load')}
        onUnmount={() => console.log('unmount')}
        center={CENTER}
        mapContainerClassName={styles.map}
        options={OPTIONS}
        zoom={12}
      />
    </>
  );
};

export default HiddenMap;
