/* eslint-disable */
// @ts-nocheck

import { createContext, useContext, useState } from 'react';

const MyContext = createContext({ color: 'red', setColor: () => {} });

const MyProviderWithUseMemo = ({ children }) => {
	const [color, setColor] = useState('red');

	return <MyContext.Provider value={{ color, setColor }}>{children}</MyContext.Provider>;
};

export const App1 = () => (
	<MyProviderWithUseMemo>
		<Title1 />
		<Controls1 />
	</MyProviderWithUseMemo>
);

const Title1 = () => {
	const { color } = useContext(MyContext);

	return <div style={{ backgroundColor: color }} />;
};

const Controls1 = () => {
	const { setColor } = useContext(MyContext);

	return (
		<div>
			<button onClick={() => setColor('blue')}>Blue</button>
			<button onClick={() => setColor('green')}>Green</button>
		</div>
	);
};

/****************
 * So instead do:
 ****************/

/**
 * Our strategy is to separate dynamic and static data in two different contexts
 */

const MyContextDynamic = createContext('red');
const MyContextStatic = createContext(() => {});

const MyProviderWithSplittedContexts = ({ children }) => {
	const [color, setColor] = useState('red');

	return (
		<MyContextDynamic.Provider value={color}>
			<MyContextStatic.Provider value={setColor}>{children}</MyContextStatic.Provider>;
		</MyContextDynamic.Provider>
	);
};

export const App2 = () => (
	<MyProviderWithSplittedContexts>
		<Title2 />
		<Controls2 />
	</MyProviderWithSplittedContexts>
);

const Title2 = () => {
	const color = useContext(MyContextDynamic);

	return <div style={{ backgroundColor: color }} />;
};

const Controls2 = () => {
	const setColor = useContext(MyContextStatic);

	return (
		<div>
			<button onClick={() => setColor('blue')}>Blue</button>
			<button onClick={() => setColor('green')}>Green</button>
		</div>
	);
};
