import { createContext, Dispatch, FC, memo, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

const MyContext = createContext<{ count: number; setCount: Dispatch<SetStateAction<number>> }>({
  count: 0,
  setCount: () => {},
});

const MyProviderWithUseMemo: FC<{ children: ReactNode }> = ({ children }) => {
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

export const App1: FC = () => (
  <MyProviderWithUseMemo>
    <Title1 />
    <Controls1 />
  </MyProviderWithUseMemo>
);

const Title1: FC = memo(() => {
  const { count } = useContext(MyContext);

  return <h1>Count: {count}</h1>;
});

const Controls1: FC = memo(() => {
  const { setCount } = useContext(MyContext);

  return (
    <>
      <button onClick={(): void => setCount((prevCount) => prevCount++)}>+</button>
      <button onClick={(): void => setCount((prevCount) => prevCount--)}>-</button>
    </>
  );
});

/****************
 * So instead do:
 ****************/

/**
 * Our strategy is to separate dynamic and static data in two different contexts
 */

const MyContextDynamic = createContext(0);
const MyContextStatic = createContext<Dispatch<SetStateAction<number>>>(() => {});

const MyProviderWithSplittedContexts: FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <MyContextDynamic.Provider value={count}>
      <MyContextStatic.Provider value={setCount}>{children}</MyContextStatic.Provider>;
    </MyContextDynamic.Provider>
  );
};

export const App2: FC = () => (
  <MyProviderWithSplittedContexts>
    <Title2 />
    <Controls2 />
  </MyProviderWithSplittedContexts>
);

const Title2: FC = memo(() => {
  const count = useContext(MyContextDynamic);

  return <h1>Count: {count}</h1>;
});

const Controls2: FC = memo(() => {
  const setCount = useContext(MyContextStatic);

  return (
    <>
      <button onClick={(): void => setCount((prevCount) => prevCount++)}>+</button>
      <button onClick={(): void => setCount((prevCount) => prevCount--)}>-</button>
    </>
  );
});
