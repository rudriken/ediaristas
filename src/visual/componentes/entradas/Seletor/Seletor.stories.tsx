import { MenuItem } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Seletor from "./Seletor";

export default {
	title: "entradas/Seletor",
	component: Seletor,
	argTypes: {},
} as ComponentMeta<typeof Seletor>;

const Modelo: ComponentStory<typeof Seletor> = (argumentos) => (
	<Seletor {...argumentos}>
		<MenuItem value={""}>Selecione um item</MenuItem>
		<MenuItem value={10}>Dez</MenuItem>
		<MenuItem value={20}>Vinte</MenuItem>
		<MenuItem value={30}>Trinta</MenuItem>
	</Seletor>
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	rotulo: "Números",
	value: 10,
};
