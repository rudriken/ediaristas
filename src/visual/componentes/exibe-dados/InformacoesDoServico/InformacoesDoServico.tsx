import React from "react";
// import {  } from "@mui/material";
import {
	InformacoesDoServicoContainer,
	InformacoesDoServicoIcone,
	DadosDoServicoContainer,
} from "./InformacoesDoServico.style";

export interface InformacoesDoServicoProps {}

const InformacoesDoServico: React.FC<InformacoesDoServicoProps> = ({
	children,
}) => {
	return (
		<InformacoesDoServicoContainer>
			<InformacoesDoServicoIcone className={"twf-check-circle"} />
			<DadosDoServicoContainer>{children}</DadosDoServicoContainer>
		</InformacoesDoServicoContainer>
	);
};

export default InformacoesDoServico;
