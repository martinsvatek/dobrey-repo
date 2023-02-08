/* eslint-disable */
// @ts-nocheck

import { createContext, useContext } from 'react';

export const MyContext = createContext({ color: 'red', setColor: () => {} });

/**
 * With the Consumer component provided by the context we created
 */
export const ContentWithConsumer = () => (
  <MyContext.Consumer>
    {({ color, setColor }) => (
      <div style={{ backgroundColor: color }}>
        <button onClick={() => setColor('blue')}>Blue</button>
        <button onClick={() => setColor('green')}>Green</button>
      </div>
    )}
  </MyContext.Consumer>
);

/**
 * With useContext hook
 */

export const ContentWithHook = () => {
  const { color, setColor } = useContext(MyContext);

  return (
    <div style={{ backgroundColor: color }}>
      <button onClick={() => setColor('blue')}>Blue</button>
      <button onClick={() => setColor('green')}>Green</button>
    </div>
  );
};
