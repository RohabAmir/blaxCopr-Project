"use client";
import { Grid } from "antd";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
      FC,
      createContext,
      useContext,
      useEffect,
      useMemo,
      useState,
} from "react";

const AUTH_TABS = {
      DEFAULT: "DEFAULT",
      SIGN_UP: "SIGN_UP",
      SIGN_IN: "SIGN_IN",
      FORGOT_PASSWORD: "FORGOT_PASSWORD",
      RESET_PASSWORD: "RESET_PASSWORD",
};

const defaultValues = {
      activePage: AUTH_TABS.SIGN_IN,
      handleActivePage: () => {},
      goBack: () => {},
};

interface IAUTH {
      activePage: any;
      handleActivePage: (page: any) => void;
      goBack: () => void;
}
const AuthContext = createContext<IAUTH>(defaultValues);

const getFormattedPage = (page: string) => {
      let newPage = "";
      switch (page) {
            case "sign-in":
                  newPage = AUTH_TABS.SIGN_IN;
                  break;
            case "sign-up":
                  newPage = AUTH_TABS.SIGN_UP;
                  break;
            case "forgot-password":
                  newPage = AUTH_TABS.FORGOT_PASSWORD;
                  break;
            case "reset-password":
                  newPage = AUTH_TABS.RESET_PASSWORD;
                  break;
            case AUTH_TABS.RESET_PASSWORD:
                  newPage = "reset-password";
                  break;
            case AUTH_TABS.SIGN_UP:
                  newPage = "sign-up";
                  break;
            case AUTH_TABS.FORGOT_PASSWORD:
                  newPage = "forgot-password";
                  break;
            case AUTH_TABS.SIGN_IN:
                  newPage = "sign-in";
                  break;
            default:
                  newPage = AUTH_TABS.SIGN_UP;
                  break;
      }
      return newPage;
};

const AuthContainer: FC<any> = ({ children }) => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const pathname = usePathname();
      const page: string = searchParams.get("page") || "";
      const { useBreakpoint } = Grid;
      const screens: any = useBreakpoint();
      const isMobile = useMemo(
            () =>
            (screens["sm"] && !screens["md"]) ||
            (screens["xs"] && !screens["md"]),
            [screens]
            );
      const formattedPage =page? getFormattedPage(page):isMobile?AUTH_TABS.DEFAULT:AUTH_TABS.SIGN_UP;
      const [activePage, setActivePage] = useState<any>(formattedPage);

      
      useEffect(() => {
            const page: string = searchParams.get("page") || "";
            if (page) {
                  const formattedPage = getFormattedPage(page);
                  setActivePage(formattedPage);
            } else {
                  if (isMobile) {
                        setActivePage(AUTH_TABS.DEFAULT);
                  } else {
                        setActivePage(AUTH_TABS.SIGN_UP);
                  }
            }
      }, [searchParams, isMobile]);

      const handleActivePage = (page: any) => {
            setActivePage(page);
            const searchParams: any = new URLSearchParams();
            const newPage = getFormattedPage(page);
            searchParams.set("page", newPage);
            console.log("search params", searchParams);
            const url = `${pathname}?${searchParams.toString()}`;
            router.push(url, undefined);
      };

      useEffect(() => {
            console.log("actve page", activePage);
      }, [activePage]);

      const goBack = () => {
            setActivePage(AUTH_TABS.SIGN_IN);
      };

      return (
            <AuthContext.Provider
                  value={{ activePage, handleActivePage, goBack }}
            >
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthContainer;

const useAuthContext = () => {
      return useContext(AuthContext);
};

export { AUTH_TABS, useAuthContext };
