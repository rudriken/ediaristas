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
	título: "Detalhes",
	itens: [
		{
			títuloI: "Tipo",
			descriçãoI: ["Lipeza de rotina"],
			íconeI: "twf-check-circle",
		},
		{
			títuloI: "Tamanho",
			descriçãoI: ["3 cômodos", "2 banheiros"],
			íconeI: "twf-check-circle",
		},
		{
			títuloI: "Data",
			descriçãoI: ["05/08/2022"],
			íconeI: "twf-check-circle",
		},
	],
	rodapé: {
		textoR: "R$ 185,00",
		íconeR: "twf-credit-card",
	},
};

export const Diarista = Modelo.bind({});
Diarista.args = {
	título: "Como Funciona?",
	itens: [
		{
			títuloI: "1 - Cadastro",
			descriçãoI: ["Você faz o cadastro e escolhe as cidades atendidas"],
		},
		{
			títuloI: "2 - Receba Propostas",
			descriçãoI: [
				"Você receberá os serviços por e-mail e notificação no celular",
			],
		},
		{
			títuloI: "3 - Diária Agendada",
			descriçãoI: [
				"Se o seu perfil for escolhido pelo cliente você receberá a confirmação do agendamento",
			],
		},
	],
};
