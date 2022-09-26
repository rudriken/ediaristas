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
    webpackFinal: async (configuracao) => {
        configuracao.resolve.modules.push(paraOCaminho("src"));
        configuracao.resolve.alias["@emotion/core"] = paraOCaminho(
            "node_modules/@emotion/react"
        );
        configuracao.resolve.alias["@emotion/styled"] = paraOCaminho(
            "node_modules/@emotion/styled"
        );
        configuracao.resolve.alias["emotion-theming"] = paraOCaminho(
            "node_modules/@emotion/react"
        );
        return configuracao;
    },
};
