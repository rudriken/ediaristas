import { ComponentMeta, ComponentStory } from "@storybook/react";
import InformacoesDoServico from "./InformacoesDoServico";

export default {
	title: "exibe-dados/InformacoesDoServico",
	component: InformacoesDoServico,
	argTypes: {},
} as ComponentMeta<typeof InformacoesDoServico>;

const Modelo: ComponentStory<typeof InformacoesDoServico> = (argumentos) => (
	<InformacoesDoServico {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	children: (
		<div>
			<div>
				Data: <strong>26/10/2022 às 11:40</strong>
			</div>
			<div>
				Endereço: Rua Alvacaz, 1000 - Cruzeiro do Sul, Uberlândia - MG
			</div>
			<div>
				<strong>Valor: R$ 185,00</strong>
			</div>
		</div>
	),
};
