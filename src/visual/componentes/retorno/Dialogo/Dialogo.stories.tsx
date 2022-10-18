import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialogo from "./Dialogo";

export default {
	title: "retorno/Dialogo",
	component: Dialogo,
	argTypes: {},
} as ComponentMeta<typeof Dialogo>;

const Modelo: ComponentStory<typeof Dialogo> = (argumentos) => (
	<Dialogo {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	titulo: "Confirmar presença d(o)a diarista",
	subtitulo: "Tem certeza que deseja confirmar a diária abaixo?",
	aberto: true,
	children: "Texto",
};
