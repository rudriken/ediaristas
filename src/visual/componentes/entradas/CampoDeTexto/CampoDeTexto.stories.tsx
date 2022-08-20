import { ComponentMeta, ComponentStory } from "@storybook/react";
import CampoDeTexto from "./CampoDeTexto";

export default {
	title: "entradas/CampoDeTexto",
	component: CampoDeTexto,
	argTypes: {},
} as ComponentMeta<typeof CampoDeTexto>;

const Modelo: ComponentStory<typeof CampoDeTexto> = (argumentos) => (
	<CampoDeTexto {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {};
