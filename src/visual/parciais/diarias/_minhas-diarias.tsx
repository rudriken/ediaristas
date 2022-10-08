import { Container } from "@mui/material";
import useMinhasDiarias from "logica/ganchos/pages/diarias/useMinhasDiarias.page";
import React from "react";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
// import { Component } from "./_minhas-diarias.styled";

const MinhasDiarias: React.FC = () => {
	const {
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		movel,
	} = useMinhasDiarias();
	return (
		<>
			<Container>
				<TituloPagina titulo={"Minhas Diárias"} />
			</Container>
		</>
	);
};

export default MinhasDiarias;
