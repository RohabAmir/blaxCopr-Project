"use client";
import { Grid } from "antd";
import { FC, createContext, useContext, useMemo } from "react";

const defaultValues = {
  isMobile: false,
};

interface I_APP {
  isMobile: boolean;
}
const AppContext = createContext<I_APP>(defaultValues);

const AppContainer: FC<any> = ({ children }) => {
  const { useBreakpoint } = Grid;
  const screens: any = useBreakpoint();
  const isMobile = useMemo(
    () =>
      (screens["sm"] && !screens["md"]) || (screens["xs"] && !screens["md"]),
    [screens]
  );

  return (
    <AppContext.Provider value={{ isMobile }}>{children}</AppContext.Provider>
  );
};

export default AppContainer;

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };
