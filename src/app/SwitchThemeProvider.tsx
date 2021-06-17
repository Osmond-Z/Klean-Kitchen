import React, { useState } from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
import { getThemeByName } from '../themes';

const SwitchThemeProvider: React.FC = (props) => {
    // State to hold the selected theme name
    const [themeName, setThemeName] = useState('lightTheme');

    // Retrieve the theme object by theme name
    const theme:Theme = getThemeByName(themeName);
    return (
        <ThemeContext.Provider value={setThemeName}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default SwitchThemeProvider;

export const ThemeContext = React.createContext((themeName: string): void => {});