import { createContext, FC, useContext } from 'react';

export const MyContext = createContext('');

export const App: FC = () => (
  <MyContext.Provider value="parent">
    <ParentSubscriber />
    <MyContext.Provider value="nested">
      <NestedSubscriber />
    </MyContext.Provider>
  </MyContext.Provider>
);

/**
 * Consumers will get the value of the closest Provider to them.
 * ParentSubscriber will get the value parent
 * and in the NestedSubscriber will get the value nested
 */

export const ParentSubscriber: FC = () => {
  const value = useContext(MyContext);

  return <p>The value in ParentSubscriber is: {value}</p>;
};

export const NestedSubscriber: FC = () => {
  const value = useContext(MyContext);

  return <p>The value in NestedSubscriber is: {value}</p>;
};
