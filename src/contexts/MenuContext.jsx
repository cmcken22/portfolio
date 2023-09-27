import React, { createContext, useState, useContext, useEffect } from "react";

export const MenuContext = createContext({
  menuOpened: false,
  setMenuOpened: () => {},
});

function MenuContextProvider({ children }) {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        menuOpened,
        setMenuOpened,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuContextProvider;
