'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { CENTER, OPTIONS } from './page.consts';
import styles from './page.module.scss';

const HiddenMap = (): JSX.Element | null => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
		mapIds: ['35bc84e349dca82f'],
	});

	if (!isLoaded) {
		return null;
	}

	return (
		<>
			<h1>Hidden map</h1>
			<GoogleMap center={CENTER} mapContainerClassName={styles.map} options={OPTIONS} zoom={12} />
		</>
	);
};

export default HiddenMap;
