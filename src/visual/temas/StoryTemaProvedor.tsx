import { ThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import temaOficial from "./temas";

const StoryTemaProvedor = (funcaoStory: any) => (
    <ThemeProvider theme={temaOficial}>
        <EmotionThemeProvider theme={temaOficial}>{funcaoStory()}</EmotionThemeProvider>
    </ThemeProvider>
);

export default StoryTemaProvedor;
