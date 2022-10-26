import React from "react";
import { GetStaticProps } from "next";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import { Container, Typography } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import Tabela, {
	T_Celula,
	T_Linha,
	T_Paginacao,
} from "visual/componentes/exibe-dados/Tabela/Tabela";
// import {  } from "@estilos/pages/oportunidades.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Oportunidades",
		},
	};
};

const Oportunidades: React.FC = () => {
	const {
		movel,
		oportunidades,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
	} = useOportunidadesTrabalho();
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
						<>
							<Tabela
								cabecalho={[
									"Data",
									"Tipo de Serviço",
									"Número de Cômodos",
									"Cidade",
									"Valor",
									"",
								]}
								dados={[1]}
								renderizarLinha={() => {
									return (
										<T_Linha>
											<T_Celula>
												<strong>01/01/2023</strong>
											</T_Celula>
											<T_Celula>Limpeza Pesada</T_Celula>
											<T_Celula>3 cômodos</T_Celula>
											<T_Celula>Uberlândia - MG</T_Celula>
											<T_Celula>R$ 240,00</T_Celula>
											<T_Celula></T_Celula>
										</T_Linha>
									);
								}}
							/>
							<T_Paginacao
								count={totalPaginas}
								page={paginaAtual}
								onChange={(_evento, proximaPagina) => {
									alterarPaginaAtual(proximaPagina);
								}}
							/>
						</>
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
