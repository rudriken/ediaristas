import { ComponentMeta, ComponentStory } from "@storybook/react";
import GrupoAlternadorDeBotao, {
	AlternadorDeBotao,
} from "./GrupoAlternadorDeBotao";

export default {
	title: "entradas/GrupoAlternadorDeBotao",
	component: GrupoAlternadorDeBotao,
	argTypes: {},
} as ComponentMeta<typeof GrupoAlternadorDeBotao>;

const Modelo: ComponentStory<typeof GrupoAlternadorDeBotao> = (argumentos) => (
	<GrupoAlternadorDeBotao {...argumentos}>
		<AlternadorDeBotao value={"1"}>
			<i className={"twf-cleaning-1"} /> Limpeza de rotina
		</AlternadorDeBotao>
		<AlternadorDeBotao value={"2"}>
			<i className={"twf-cleaning-2"} /> Limpeza pesada
		</AlternadorDeBotao>
		<AlternadorDeBotao value={"3"}>
			<i className={"twf-cleaning-3"} /> Limpeza pós obra
		</AlternadorDeBotao>
	</GrupoAlternadorDeBotao>
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	value: "1",
};
