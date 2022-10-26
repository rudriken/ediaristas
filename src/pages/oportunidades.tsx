import React from "react";
import { GetStaticProps } from "next";
import useOportunidades from "logica/ganchos/pages/useOportunidades.page";
import { Container } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
// import {  } from "@estilos/pages/oportunidades.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Oportunidades",
		},
	};
};

const Oportunidades: React.FC = () => {
	useOportunidades();
	return (
		<>
			<Container sx={{ mb: 5, p: 0 }}>
				<TituloPagina titulo={"Oportunidades de trabalho"} />
			</Container>
		</>
	);
};

export default Oportunidades;
