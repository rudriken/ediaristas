import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Rodape from "./Footer";

export default {
    title: "superficies/Footer",
    component: Rodape,
} as ComponentMeta<typeof Rodape>;

const Modelo: ComponentStory<typeof Rodape> = () => <Rodape />;

export const Padrao = Modelo.bind({});
Padrao.args = {};
