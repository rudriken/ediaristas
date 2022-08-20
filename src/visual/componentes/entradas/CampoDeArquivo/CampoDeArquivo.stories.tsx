import { ComponentMeta, ComponentStory } from "@storybook/react";
import CampoDeArquivo from "./CampoDeArquivo";

export default {
	title: "entradas/CampoDeArquivo",
	component: CampoDeArquivo,
	argTypes: {},
} as ComponentMeta<typeof CampoDeArquivo>;

const Modelo: ComponentStory<typeof CampoDeArquivo> = (argumentos) => (
	<CampoDeArquivo {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {};
