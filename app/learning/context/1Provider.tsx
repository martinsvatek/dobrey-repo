/* eslint-disable */
// @ts-nocheck

import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

/**
 * Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level
 */

/**
 * The creation is made thanks to
 * the createContext method calls from React
 */
export const MyContext = createContext<{ count: number; setCount: Dispatch<SetStateAction<number>> }>({
  count: 0,
  setCount: () => {},
});

/**
 * The provider is accessible through the created context
 */
export const AppWithState: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <MyContext.Provider value={{ count, setCount }}>
      <Panel>
        <Title />
        <Content />
      </Panel>
    </MyContext.Provider>
  );
};

/**
 * Doing like this each time the setCount is called,
 * it will render all components Title, Content
 * and Panel even if they do not use the data
 */

/****************
 * So instead do:
 ****************/

export const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  return <MyContext.Provider value={{ count, setCount }}>{children}</MyContext.Provider>;
};

export const AppWithoutState: FC = () => (
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
