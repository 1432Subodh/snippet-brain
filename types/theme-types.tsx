type ThemeColor = "Default" | "Red" | "Rose" | "Blue" | "Orange" | "Green" | "Yellow" | "Violet";

interface ThemeColorStateParms{
    themeColor : ThemeColor;
    setThemeColor : React.Dispatch<React.SetStateAction<ThemeColor>>
}


