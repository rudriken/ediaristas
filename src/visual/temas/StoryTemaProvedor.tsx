import { ThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import temaOficial from "./temas";

const StoryTemaProvedor = (funçãoStory: any) => (
    <ThemeProvider theme={temaOficial}>
        <EmotionThemeProvider theme={temaOficial}>{funçãoStory()}</EmotionThemeProvider>
    </ThemeProvider>
);

export default StoryTemaProvedor;
