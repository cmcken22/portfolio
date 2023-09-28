import React, {
  createContext,
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

export const LoadingContext = createContext({
  loadingRefs: {
    About: true,
  },
  // setLoading: () => {},
});

function LoadingContextProvider({ children }) {
  const [loadingRefs, setLoadingRef] = useState({
    About: true,
  });
  const stateRef = useRef(loadingRefs);

  const handleSetLoading = useCallback(
    (section, value) => {
      if (stateRef.current[section] !== value) {
        stateRef.current[section] = value;
        setLoadingRef((prevState) => ({
          ...prevState,
          [section]: value,
        }));
      }
    },
    [setLoadingRef]
  );

  return (
    <LoadingContext.Provider
      value={{
        loadingRefs,
        setLoading: handleSetLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingContextProvider;
