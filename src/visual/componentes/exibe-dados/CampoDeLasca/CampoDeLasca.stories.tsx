import { ComponentMeta, ComponentStory } from "@storybook/react";
import CampoDeLasca from "./CampoDeLasca";

export default {
	title: "exibe-dados/CampoDeLasca",
	component: CampoDeLasca,
	argTypes: {},
} as ComponentMeta<typeof CampoDeLasca>;

const Modelo: ComponentStory<typeof CampoDeLasca> = (argumentos) => (
	<CampoDeLasca {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	listaDeItens: [
		"Uberlândia - MG",
		"Uberaba - MG",
		"Araguari - MG",
		"Sertãozinho - SP",
		"Franca - SP",
	],
	mensagemQuandoVazio: "Nenhuma cidade selecionada ainda",
};
