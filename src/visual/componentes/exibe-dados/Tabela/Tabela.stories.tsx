import { Button } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Tabela, { T_Celula, T_Linha, T_Paginacao } from "./Tabela";

export default {
	title: "exibe-dados/Tabela",
	component: Tabela,
	argTypes: {},
} as ComponentMeta<typeof Tabela>;

const Modelo: ComponentStory<typeof Tabela> = (argumentos) => (
	<>
		<Tabela {...argumentos} />
		<T_Paginacao count={10} />
	</>
);

export type LimpezaTipo = {
	data: string;
	tipo: string;
	comodos: number;
	cidade: string;
};

export const Padrao = Modelo.bind({});
Padrao.args = {
	cabecalho: ["Data", "Tipo de Serviço", "Número de Cômodos", "Cidade", ""],
	dados: [
		{
			data: "20/10/2022",
			tipo: "Limpeza de rotina",
			comodos: 4,
			cidade: "Uberlândia - MG",
		},
		{
			data: "20/11/2022",
			tipo: "Limpeza pesada",
			comodos: 2,
			cidade: "Uberaba - MG",
		},
		{
			data: "20/12/2022",
			tipo: "Limpeza pós obra",
			comodos: 3,
			cidade: "Araguari - MG",
		},
	],
	renderizarLinha(_item, indice) {
		const item = _item as LimpezaTipo;
		return (
			<T_Linha key={indice}>
				<T_Celula>
					<strong>{item.data}</strong>
				</T_Celula>
				<T_Celula>{item.tipo}</T_Celula>
				<T_Celula>{item.comodos} cômodos</T_Celula>
				<T_Celula>{item.cidade}</T_Celula>
				<T_Celula align="right">
					<Button>Visualizar</Button>
				</T_Celula>
			</T_Linha>
		);
	},
};
