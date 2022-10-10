import { Container } from "@mui/material";
import React from "react";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
// import { Component } from "./_detalhes-diaria.styled";

const DetalhesDiaria: React.FC<{ id: string }> = ({ id }) => {
	return (
		<Container>
			<TituloPagina titulo={`Detalhes da diária: #${id}`} />
		</Container>
	);
};

export default DetalhesDiaria;
