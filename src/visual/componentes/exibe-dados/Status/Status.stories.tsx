import { ComponentMeta, ComponentStory } from "@storybook/react";
import Status from "./Status";

export default {
	title: "exibe-dados/Status",
	component: Status,
	argTypes: {},
} as ComponentMeta<typeof Status>;

const Modelo: ComponentStory<typeof Status> = (argumentos) => (
	<Status {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	cor: "success",
	children: "Sucesso",
};
