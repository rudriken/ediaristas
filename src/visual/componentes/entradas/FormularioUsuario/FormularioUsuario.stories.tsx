import { ComponentMeta, ComponentStory } from "@storybook/react";
import FormularioUsuario from "./FormularioUsuario";

export default {
	title: "entradas/FormularioUsuario",
	component: FormularioUsuario,
	argTypes: {},
} as ComponentMeta<typeof FormularioUsuario>;

const Modelo: ComponentStory<typeof FormularioUsuario> = (argumentos) => (
	<FormularioUsuario {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {};
