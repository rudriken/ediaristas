import React from "react";

export interface TabelaPropsInterface {
	cabeçalho: string[];
	dados: T[];
	renderizar: (item: T, indice: number) => JSX.Element;
}

export type T = {
	dado1: string;
	dado2: number;
	dado3: boolean;
	dado4: JSX.Element;
};

const Tabela: React.FC<TabelaPropsInterface> = (propriedades) => {
	return (
		<table style={{ textAlign: "center" }}>
			<thead>
				<tr>
					{propriedades.cabeçalho.map((item, indice) => {
						return <th key={indice}>{item}</th>;
					})}
				</tr>
			</thead>
			<tbody>{propriedades.dados.map(propriedades.renderizar)}</tbody>
			<tfoot>
				<tr>
					<td colSpan={4}>Tabela Teste</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default Tabela;
