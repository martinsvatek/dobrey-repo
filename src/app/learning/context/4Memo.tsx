/* eslint-disable */
// @ts-nocheck

import { createContext, memo, useContext, useMemo, useState } from "react";

export const MyContext = createContext({ color: "red", setColor: () => {} });

/**
 * In this case, when we change the letter,
 * MemoizedComponent will re-render
 * even it's memoized because the value in the context changes.
 */

export const MyProvider = ({ children }) => {
  const [color, setColor] = useState("red");

  return (
    <MyContext.Provider value={{ color, setColor }}>
      {children}
    </MyContext.Provider>
  );
};

/****************
 * So instead do:
 ****************/

export const MyProviderWithUseMemo = ({ children }) => {
  const [color, setColor] = useState("red");

  const value = useMemo(() => ({ color, setColor }), [color]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const App = () => {
  const [letter, setLetter] = useState("A");
  console.log();

  return (
    <div>
      <p>Letter: {letter}</p>
      <button onClick={() => setLetter("B")}>B</button>
      <button onClick={() => setLetter("C")}>C</button>
      <MyProvider>
        <MemoizedContent />
      </MyProvider>
    </div>
  );
};

export const MemoizedContent = memo(() => {
  const { color, setColor } = useContext(MyContext);

  return (
    <div style={{ backgroundColor: color }}>
      <button onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("green")}>Green</button>
    </div>
  );
});
