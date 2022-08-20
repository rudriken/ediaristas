import "../src/visual/estilos/globals.css";
import StoryTemaProvedor from "../src/visual/temas/StoryTemaProvedor";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [StoryTemaProvedor];
