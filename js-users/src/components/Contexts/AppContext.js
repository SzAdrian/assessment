import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider(props) {
  const [rows, setRows] = useState(null);
  return (
    <AppContext.Provider value={{ rows, setRows }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
