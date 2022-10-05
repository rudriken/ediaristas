import { Button } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Tabela, { Celula_Tabela, Linha_Tabela } from "./Tabela";

export default {
	title: "exibe-dados/Tabela",
	component: Tabela,
	argTypes: {},
} as ComponentMeta<typeof Tabela>;

interface ModeloDePropriedadesInterface {
	data: string;
	tipo: string;
	comodos: number;
	cidade: string;
}

const Modelo: ComponentStory<typeof Tabela> = (argumentos) => (
	<Tabela {...argumentos} />
);

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
	elementoDeLinha(_item, indice) {
		const item = _item as ModeloDePropriedadesInterface;
		return (
			<Linha_Tabela key={indice}>
				<Celula_Tabela>
					<strong>{item.data}</strong>
				</Celula_Tabela>
				<Celula_Tabela>{item.tipo}</Celula_Tabela>
				<Celula_Tabela>{item.comodos}</Celula_Tabela>
				<Celula_Tabela>{item.cidade}</Celula_Tabela>
				<Celula_Tabela align="right">
					<Button>Visualilzar</Button>
				</Celula_Tabela>
			</Linha_Tabela>
		);
	},
};
