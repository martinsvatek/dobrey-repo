import { createContext, Dispatch, FC, SetStateAction, useContext } from 'react';

export const MyContext = createContext<{ count: number; setCount: Dispatch<SetStateAction<number>> }>({
  count: 0,
  setCount: () => {},
});

/**
 * With the Consumer component provided by the context we created
 */
export const ContentWithConsumer: FC = () => (
  <MyContext.Consumer>
    {({ count, setCount }): JSX.Element => (
      <>
        <p>Count: {count}</p>
        <button onClick={(): void => setCount((prevCount) => prevCount++)}>+</button>
        <button onClick={(): void => setCount((prevCount) => prevCount--)}>-</button>
      </>
    )}
  </MyContext.Consumer>
);

/**
 * With useContext hook
 */

export const ContentWithHook: FC = () => {
  const { count, setCount } = useContext(MyContext);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={(): void => setCount((prevCount) => prevCount++)}>+</button>
      <button onClick={(): void => setCount((prevCount) => prevCount--)}>-</button>
    </>
  );
};
