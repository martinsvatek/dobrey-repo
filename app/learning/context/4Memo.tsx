/* eslint-disable react/display-name */
import { createContext, Dispatch, FC, memo, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

export const MyContext = createContext<{ count: number; setCount: Dispatch<SetStateAction<number>> }>({
  count: 0,
  setCount: () => {},
});

/**
 * In this case, when we change the letter,
 * MemoizedComponent will re-render
 * even it's memoized because the value in the context changes.
 */

export const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  return <MyContext.Provider value={{ count, setCount }}>{children}</MyContext.Provider>;
};

/****************
 * So instead do:
 ****************/

export const MyProviderWithUseMemo: FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  const value = useMemo(
    () => ({
      count,
      setCount,
    }),
    [count]
  );

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const App: FC = () => {
  const [letter, setLetter] = useState('A');

  return (
    <>
      <p>Letter: {letter}</p>
      <button onClick={(): void => setLetter('B')}>B</button>
      <button onClick={(): void => setLetter('C')}>C</button>
      <MyProvider>
        <MemoizedContent />
      </MyProvider>
    </>
  );
};

export const MemoizedContent: FC = memo(() => {
  const { count, setCount } = useContext(MyContext);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={(): void => setCount((prevCount) => prevCount++)}>+</button>
      <button onClick={(): void => setCount((prevCount) => prevCount--)}>-</button>
    </>
  );
});
