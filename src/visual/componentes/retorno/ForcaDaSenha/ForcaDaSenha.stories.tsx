import { ComponentMeta, ComponentStory } from "@storybook/react";
import ForcaDaSenha from "./ForcaDaSenha";

export default {
	title: "retorno/ForcaDaSenha",
	component: ForcaDaSenha,
	argTypes: {},
} as ComponentMeta<typeof ForcaDaSenha>;

const Modelo: ComponentStory<typeof ForcaDaSenha> = (argumentos) => (
	<ForcaDaSenha {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	senha: "Rodrigo5@8%",
};
