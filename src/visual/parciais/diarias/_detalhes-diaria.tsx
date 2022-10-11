import { CircularProgress, Container } from "@mui/material";
import useDetalhesDiaria from "logica/ganchos/pages/diarias/useDetalhesDiaria.page";
import React from "react";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
// import { Component } from "./_detalhes-diaria.styled";

const DetalhesDiaria: React.FC<{ id: string }> = ({ id }) => {
	const { diaria } = useDetalhesDiaria(id);
	if (!diaria.id) {
		return (
			<Container sx={{ textAlign: "center", my: 10 }}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<Container>
			<TituloPagina titulo={`Detalhes da diária: #${id}`} />
		</Container>
	);
};

export default DetalhesDiaria;
