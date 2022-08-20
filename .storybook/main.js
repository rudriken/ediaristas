const caminho = require("path");
const paraOCaminho = (_caminho) => caminho.join(process.cwd(), _caminho);

module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    webpackFinal: async (configuração) => {
        configuração.resolve.modules.push(paraOCaminho("src"));
        configuração.resolve.alias["@emotion/core"] = paraOCaminho(
            "node_modules/@emotion/react"
        );
        configuração.resolve.alias["@emotion/styled"] = paraOCaminho(
            "node_modules/@emotion/styled"
        );
        configuração.resolve.alias["emotion-theming"] = paraOCaminho(
            "node_modules/@emotion/react"
        );
        return configuração;
    },
};
