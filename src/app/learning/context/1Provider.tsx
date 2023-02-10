/* eslint-disable */
// @ts-nocheck

import { createContext, useState } from 'react';

/**
 * Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level
 */

/**
 * The creation is made thanks to
 * the createContext method calls from React
 */
export const MyContext = createContext({ color: 'red', setColor: () => {} });

/**
 * The provider is accessible through the created context
 */
export const AppWithState = () => {
	const [color, setColor] = useState('red');

	return (
		<MyContext.Provider value={{ color, setColor }}>
			<Panel>
				<Title />
				<Content />
			</Panel>
		</MyContext.Provider>
	);
};

/**
 * Doing like this each time the setColor is called,
 * it will render all components Title, Content
 * and Panel even if they do not use the data
 */

/****************
 * So instead do:
 ****************/

export const MyProvider = ({ children }) => {
	const [color, setColor] = useState('red');

	return <MyContext.Provider value={{ color, setColor }}>{children}</MyContext.Provider>;
};

export const AppWithoutState = () => (
	<MyProvider>
		<Panel>
			<Title />
			<Content />
		</Panel>
	</MyProvider>
);

/**
 * An advice is to put Providers the closest to where it's being used.
 * It will help React to be slightly faster
 * because would not have to cross all the tree components.
 */
