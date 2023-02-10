/* eslint-disable */
// @ts-nocheck

import { createContext, useContext } from 'react';

export const MyContext = createContext('');

export const App = () => (
  <MyContext.Provider value="red">
    <ParentSubscriber />
    <MyContext.Provider value="blue">
      <NestedSubscriber />
    </MyContext.Provider>
  </MyContext.Provider>
);

/**
 * Consumers will get the value of the closest Provider to them.
 * ParentSubscriber will get the value parent
 * and in the NestedSubscriber will get the value nested
 */

export const ParentSubscriber = () => {
  const value = useContext(MyContext);

  return <p>The value in ParentSubscriber is: {value}</p>;
};

export const NestedSubscriber = () => {
  const value = useContext(MyContext);

  return <p>The value in NestedSubscriber is: {value}</p>;
};
