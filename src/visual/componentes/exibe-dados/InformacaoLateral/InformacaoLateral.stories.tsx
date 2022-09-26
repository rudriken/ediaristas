import { ComponentMeta, ComponentStory } from "@storybook/react";
import InformacaoLateral from "./InformacaoLateral";

export default {
	title: "exibe-dados/InformacaoLateral",
	component: InformacaoLateral,
	argTypes: {},
} as ComponentMeta<typeof InformacaoLateral>;

const Modelo: ComponentStory<typeof InformacaoLateral> = (argumentos) => (
	<InformacaoLateral {...argumentos} />
);

export const Cliente = Modelo.bind({});
Cliente.args = {
	titulo: "Detalhes",
	itens: [
		{
			tituloI: "Tipo",
			descricaoI: ["Lipeza de rotina"],
			iconeI: "twf-check-circle",
		},
		{
			tituloI: "Tamanho",
			descricaoI: ["3 cômodos", "2 banheiros"],
			iconeI: "twf-check-circle",
		},
		{
			tituloI: "Data",
			descricaoI: ["05/08/2022"],
			iconeI: "twf-check-circle",
		},
	],
	rodape: {
		textoR: "R$ 185,00",
		iconeR: "twf-credit-card",
	},
};

export const Diarista = Modelo.bind({});
Diarista.args = {
	titulo: "Como Funciona?",
	itens: [
		{
			tituloI: "1 - Cadastro",
			descricaoI: ["Você faz o cadastro e escolhe as cidades atendidas"],
		},
		{
			tituloI: "2 - Receba Propostas",
			descricaoI: [
				"Você receberá os serviços por e-mail e notificação no celular",
			],
		},
		{
			tituloI: "3 - Diária Agendada",
			descricaoI: [
				"Se o seu perfil for escolhido pelo cliente você receberá a confirmação do agendamento",
			],
		},
	],
};
