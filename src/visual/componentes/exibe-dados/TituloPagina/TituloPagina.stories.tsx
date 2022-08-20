import { ComponentMeta, ComponentStory } from "@storybook/react";
import TituloPagina from "./TituloPagina";

export default {
    title: "exibe-dados/TituloPagina",
    component: TituloPagina,
} as ComponentMeta<typeof TituloPagina>;

const Modelo: ComponentStory<typeof TituloPagina> = (argumentos) => (
    <TituloPagina {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
    título: "Conheça os profissionais",
    subtítulo: "Preencha seu endereço e veja todos os profissionais da sua localidade",
};
