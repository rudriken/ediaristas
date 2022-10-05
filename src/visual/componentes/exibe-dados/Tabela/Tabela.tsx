import React from "react";
// import {  } from "@mui/material";
import {
	PapelTabela,
	TabelaE,
	ContainerTabela,
	CabecalhoTabela,
	LinhaTabela,
	CelulaTabela,
	CorpoTabela,
	PaginacaoTabela,
} from "./Tabela.style";

export interface TabelaProps<T> {
	cabecalho: string[];
	dados: T[];
	elementoDeLinha: (item: T, indice: number) => React.ReactNode;
}

export type TipoDoComponenteTabela = <T>(
	propriedades: TabelaProps<T>
) => React.ReactElement;

{
	/* <TabelaE
	cabecalho={["Título1", "Título2"]}
	dados={[
		{ nome: "Chocolate", quantidade: 50.45 },
		{ nome: "Chiclete", quantidade: 15.42 },
		{ nome: "Paçoca", quantidade: 19.45 },
	]}
	elementoDeLinha={(item, indice) => {
		return (
			<LinhaTabela key={indice}>
				<CelulaTabela>{item.nome}</CelulaTabela>
				<CelulaTabela>{item.quantidade}</CelulaTabela>
			</LinhaTabela>
		);
	}}
/>; */
}

const Tabela: TipoDoComponenteTabela = ({ dados, ...propriedades }) => {
	return (
		<PapelTabela>
			<ContainerTabela>
				<TabelaE>
					<CabecalhoTabela>
						<LinhaTabela>
							{propriedades.cabecalho.map((titulo, indice) => {
								return (
									<CelulaTabela key={indice}>
										{titulo}
									</CelulaTabela>
								);
							})}
						</LinhaTabela>
					</CabecalhoTabela>
					<CorpoTabela>
						{dados.map(propriedades.elementoDeLinha)}
					</CorpoTabela>
				</TabelaE>
			</ContainerTabela>
		</PapelTabela>
	);
};

export default Tabela;

export const Linha_Tabela = LinhaTabela;
export const Celula_Tabela = CelulaTabela;
export const Paginacao_Tabela = PaginacaoTabela;
