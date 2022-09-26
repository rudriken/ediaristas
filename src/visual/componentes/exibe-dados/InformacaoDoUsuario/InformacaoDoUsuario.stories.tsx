import { ComponentMeta, ComponentStory } from "@storybook/react";
import InformacaoDoUsuario from "./InformacaoDoUsuario";

export default {
    title: "exibe-dados/InformacaoDoUsuario",
    component: InformacaoDoUsuario,
    argTypes: {},
} as ComponentMeta<typeof InformacaoDoUsuario>;

const Modelo: ComponentStory<typeof InformacaoDoUsuario> = (argumentos) => (
    <InformacaoDoUsuario {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
    nome: "Rodrigo Mendonça",
    foto: "https://github.com/rudriken.png",
    avaliação: 3,
    descrição: "Desenvolvedor Web",
    avaliando: false,
};
