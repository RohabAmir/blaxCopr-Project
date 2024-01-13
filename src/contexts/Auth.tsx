"use client"
import { Grid } from "antd";
import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_TABS = {
    DEFAULT: 'DEFAULT',
    SIGN_UP: 'SIGN_UP',
    SIGN_IN: "SIGN_IN",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    RESET_PASSWORD: "RESET_PASSWORD"
}

const defaultValues = {
    isMobile: false,
    activePage: AUTH_TABS.SIGN_IN,
    handleActivePage: () => { }
}

interface IAUTH {
    isMobile: boolean
    activePage: any,
    handleActivePage: (page: any) => void
}
const AuthContext = createContext<IAUTH>(defaultValues)

const AuthContainer: FC<any> = ({ children }) => {
    const { useBreakpoint } = Grid;
    const screens: any = useBreakpoint();
    const isMobile = useMemo(() => screens["sm"] && !screens['md'] || screens['xs'] && !screens['md'], [screens])
    const [activePage, setActivePage] = useState<any>(AUTH_TABS.SIGN_UP)

    useEffect(() => {
        if (isMobile) {
            setActivePage(AUTH_TABS.DEFAULT)
        } else {
            setActivePage(AUTH_TABS.SIGN_UP)
        }
    }, [isMobile])


    const handleActivePage = (page: any) => {
        setActivePage(page)
    }

    return (
        <AuthContext.Provider value={{ isMobile, activePage, handleActivePage }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContainer

const useAuthContext = () => {
    return useContext(AuthContext)
}


export {
    AUTH_TABS,
    useAuthContext
}