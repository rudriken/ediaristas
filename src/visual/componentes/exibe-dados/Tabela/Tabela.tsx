import React, { useMemo } from "react";
// import {  } from "@mui/material";
import {
	TPapel,
	TTabela,
	TContainer,
	TCabecalho,
	TLinha,
	TCelula,
	TCorpo,
	TPaginacao,
} from "./Tabela.style";

export interface TabelaProps<T> {
	cabecalho: string[];
	dados: T[];
	renderizarLinha: (item: T, indice: number) => React.ReactNode;
	itensPorPagina?: number;
	paginaAtual?: number;
}

export type ComponenteTabelaTipo = <T>(
	propriedades: TabelaProps<T>
) => React.ReactElement;

const Tabela: ComponenteTabelaTipo = ({
	dados,
	itensPorPagina,
	paginaAtual,
	...propriedades
}) => {
	const dadosVisiveisNaTabela = useMemo<typeof dados>(() => {
		if (itensPorPagina !== undefined && paginaAtual !== undefined) {
			return dados.slice(
				(paginaAtual - 1) * itensPorPagina,
				(paginaAtual - 1) * itensPorPagina + itensPorPagina
			);
		}
		return dados;
	}, [dados, itensPorPagina, paginaAtual]);
	return (
		<TPapel>
			<TContainer>
				<TTabela>
					<TCabecalho>
						<TLinha>
							{propriedades.cabecalho.map((titulo, indice) => {
								return <TCelula key={indice}>{titulo}</TCelula>;
							})}
						</TLinha>
					</TCabecalho>
					<TCorpo>
						{dadosVisiveisNaTabela.map(propriedades.renderizarLinha)}
					</TCorpo>
				</TTabela>
			</TContainer>
		</TPapel>
	);
};

export default Tabela;

export const T_Linha = TLinha;
export const T_Celula = TCelula;
export const T_Paginacao = TPaginacao;
