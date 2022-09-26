import { ComponentMeta, ComponentStory } from "@storybook/react";
import ContadorDeItens from "./ContadorDeItens";

export default {
	title: "entradas/ContadorDeItens",
	component: ContadorDeItens,
	argTypes: {},
} as ComponentMeta<typeof ContadorDeItens>;

const Modelo: ComponentStory<typeof ContadorDeItens> = (argumentos) => (
	<ContadorDeItens {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	rotulo: "Cozinha",
	plural: "Cozinhas",
	contador: 0,
};
