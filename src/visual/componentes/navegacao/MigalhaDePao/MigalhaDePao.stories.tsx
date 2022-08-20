import { ComponentMeta, ComponentStory } from "@storybook/react";
import MigalhaDePao from "./MigalhaDePao";

export default {
	title: "navegacao/MigalhaDePao",
	component: MigalhaDePao,
	argTypes: {},
} as ComponentMeta<typeof MigalhaDePao>;

const Modelo: ComponentStory<typeof MigalhaDePao> = (argumentos) => (
	<MigalhaDePao {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	selecionado: "Identificação",
	itens: ["Detalhes", "Identificação", "Pagamento"],
};
