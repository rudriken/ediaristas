import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Elo from "./Link";

export default {
    title: "navegacao/Link",
    component: Elo,
} as ComponentMeta<typeof Elo>;

const Modelo: ComponentStory<typeof Elo> = (parâmetros) => <Elo {...parâmetros} />;

export const Padrao = Modelo.bind({});
Padrao.args = {
    children: "Clique neste link",
    href: "/#",
};
