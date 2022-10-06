import React from "react";
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
}

export type ComponenteTabelaTipo = <T>(
	propriedades: TabelaProps<T>
) => React.ReactElement;

const Tabela: ComponenteTabelaTipo = ({ dados, ...propriedades }) => {
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
					<TCorpo>{dados.map(propriedades.renderizarLinha)}</TCorpo>
				</TTabela>
			</TContainer>
		</TPapel>
	);
};

export default Tabela;

export const T_Linha = TLinha;
export const T_Celula = TCelula;
export const T_Paginacao = TPaginacao;
