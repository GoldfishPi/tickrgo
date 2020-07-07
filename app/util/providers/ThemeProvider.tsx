import React, {FC, createContext, useContext, useState} from 'react';

interface ThemeState {
    twitter: string;
    facebook: string;
    reddit: string;
    news: string;
    sysomos: string;
    googleAnalytics: string;
    adwords: string;
    linkedin: string;

    primary: string;
}

const defatulState: ThemeState = {
    news: '#cc181e',
    twitter: '#1da1f2',
    facebook: '#3B5998',
    reddit: '#ff4500',
    sysomos: '#00B0AD',
    googleAnalytics: '#F07F0C',
    adwords: '#189B5B',
    linkedin: '#2566B1',
    primary: '#2F90FF',
};

type Context = {
    theme: ThemeState;
    setTheme: (theme: ThemeState) => void;
};
const ThemeContext = createContext<Context>({
    theme: defatulState,
    setTheme: () => {},
});

export const ThemeProvider: FC = ({children}) => {
    const [theme, setTheme] = useState(defatulState);
    const value = {
        theme,
        setTheme,
    };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
