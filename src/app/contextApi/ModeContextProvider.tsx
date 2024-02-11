"use client";

import { useState, createContext, useEffect } from "react";

export let ModeContext: any = createContext("");

export default function ModeContextProvider({ children }) {
  let [darkMode, setDarkMode] = useState<boolean>(false);
  let toggleMode = () => {
    document.documentElement.className = darkMode ? "dark" : "light";
  };
  useEffect(() => {
    console.log("check context");
    toggleMode();
  }, [darkMode]);
  return (
    <>
      <ModeContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
      </ModeContext.Provider>
    </>
  );
}
