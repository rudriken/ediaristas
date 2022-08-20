import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Cabecalho from "./Header";

export default {
    title: "superficies/Header",
    component: Cabecalho,
} as ComponentMeta<typeof Cabecalho>;

const Modelo: ComponentStory<typeof Cabecalho> = () => <Cabecalho />;

export const Padrao = Modelo.bind({});
Padrao.args = {};
