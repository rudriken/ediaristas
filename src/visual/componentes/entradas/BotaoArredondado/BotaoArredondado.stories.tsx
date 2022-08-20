import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import BotaoArredondado from "./BotaoArredondado";

export default {
    title: "entradas/BotaoArredondado",
    component: BotaoArredondado,
} as ComponentMeta<typeof BotaoArredondado>;

const Modelo: ComponentStory<typeof BotaoArredondado> = (argumentos) => (
    <BotaoArredondado {...argumentos}>Clique Aqui</BotaoArredondado>
);

export const MeuNovoBotao = Modelo.bind({}); // o "{}" permite fazer uma cópia de Modelo
MeuNovoBotao.args = { variant: "outlined" };
export const MeuNovoBotaoComCor = Modelo.bind({});
MeuNovoBotaoComCor.args = { variant: "contained" };

