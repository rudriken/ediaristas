import React from "react";
// import {  } from "@mui/material";
import {
	InformacaoLateralContainer,
	InformacaoLateralCabecalho,
	InformacaoLateralRodape,
	InformacaoLateralListaItens,
} from "./InformacaoLateral.style";

export interface InformacaoLateralProps {
	titulo?: string;
	itens: {
		tituloI: string;
		descricaoI: string[];
		iconeI?: string;
	}[];
	rodape?: {
		textoR: string;
		iconeR: string;
	};
}

const InformacaoLateral: React.FC<InformacaoLateralProps> = (propriedades) => {
	return (
		<InformacaoLateralContainer>
			{propriedades.titulo && (
				<InformacaoLateralCabecalho>
					<h3>{propriedades.titulo}</h3>
				</InformacaoLateralCabecalho>
			)}

			<ul>
				{propriedades.itens.map((itemN1, indiceN1) => (
					<InformacaoLateralListaItens key={indiceN1}>
						{itemN1.iconeI && <i className={itemN1.iconeI} />}
						<div>
							<h4>{itemN1.tituloI}</h4>
							<ul>
								{itemN1.descricaoI.map((itemN2, indiceN2) => (
									<li key={indiceN2}>{itemN2}</li>
								))}
							</ul>
						</div>
					</InformacaoLateralListaItens>
				))}
			</ul>

			{propriedades.rodape && (
				<InformacaoLateralRodape>
					{propriedades.rodape.iconeR && (
						<i className={propriedades.rodape.iconeR} />
					)}
					{propriedades.rodape.textoR}
				</InformacaoLateralRodape>
			)}
		</InformacaoLateralContainer>
	);
};

export default InformacaoLateral;
