import { useState } from "react";
import {lightTheme} from "./themeOptions";

type Theme = "light" | "dark";

export const useTheme = (selectedTheme: Theme = "light") => {
    const [theme, setTheme] = useState(lightTheme);

    return theme;
}