import React from "react";
// import {  } from "@mui/material";
import {
	InformacaoLateralContainer,
	InformacaoLateralCabecalho,
	InformacaoLateralRodape,
	InformacaoLateralListaItens,
} from "./InformacaoLateral.style";

export interface InformacaoLateralProps {
	título?: string;
	itens: {
		títuloI: string;
		descriçãoI: string[];
		íconeI?: string;
	}[];
	rodapé?: {
		textoR: string;
		íconeR: string;
	};
}

const InformacaoLateral: React.FC<InformacaoLateralProps> = (propriedades) => {
	return (
		<InformacaoLateralContainer>
			{propriedades.título && (
				<InformacaoLateralCabecalho>
					<h3>{propriedades.título}</h3>
				</InformacaoLateralCabecalho>
			)}

			<ul>
				{propriedades.itens.map((itemN1, índiceN1) => (
					<InformacaoLateralListaItens key={índiceN1}>
						{itemN1.íconeI && <i className={itemN1.íconeI} />}
						<div>
							<h4>{itemN1.títuloI}</h4>
							<ul>
								{itemN1.descriçãoI.map((itemN2, índiceN2) => (
									<li key={índiceN2}>{itemN2}</li>
								))}
							</ul>
						</div>
					</InformacaoLateralListaItens>
				))}
			</ul>

			{propriedades.rodapé && (
				<InformacaoLateralRodape>
					{propriedades.rodapé.íconeR && (
						<i className={propriedades.rodapé.íconeR} />
					)}
					{propriedades.rodapé.textoR}
				</InformacaoLateralRodape>
			)}
		</InformacaoLateralContainer>
	);
};

export default InformacaoLateral;
