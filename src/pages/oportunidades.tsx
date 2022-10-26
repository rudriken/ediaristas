import React from "react";
import { GetStaticProps } from "next";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import { Container, Typography } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
// import {  } from "@estilos/pages/oportunidades.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Oportunidades",
		},
	};
};

const Oportunidades: React.FC = () => {
	const { movel, oportunidades } = useOportunidadesTrabalho();
	return (
		<>
			<Container sx={{ mb: 5, p: 0 }}>
				<TituloPagina titulo={"Oportunidades de trabalho"} />
				{oportunidades.length === 0 ? (
					movel ? (
						<>
							<ListaDeDados
								cabecalho={
									<>
										Data: 01/01/2023
										<br />
										Limpeza Pesada
										<br />
										R$ 240,00
									</>
								}
								corpo={
									<>
										Cidade: Uberlândia
										<br />
										Número de cômodos: 2
									</>
								}
							/>
						</>
					) : (
						<>Desktop</>
					)
				) : (
					<Typography align={"center"}>
						Nenhuma oportunidade ainda
					</Typography>
				)}
			</Container>
		</>
	);
};

export default Oportunidades;
