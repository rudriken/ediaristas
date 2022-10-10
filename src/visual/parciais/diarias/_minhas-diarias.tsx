import { Container, Typography } from "@mui/material";
import { DiariaStatus } from "logica/@tipos/DiariaInterface";
import useMinhasDiarias from "logica/ganchos/pages/diarias/useMinhasDiarias.page";
import { ServicoDiaria } from "logica/servicos/ServicoDiaria";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import React from "react";
import Status from "visual/componentes/exibe-dados/Status/Status";
import Tabela, {
	T_Celula,
	T_Linha,
	T_Paginacao,
} from "visual/componentes/exibe-dados/Tabela/Tabela";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
// import { Component } from "./_minhas-diarias.styled";

const MinhasDiarias: React.FC = () => {
	const {
		dadosFiltrados,
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
				{dadosFiltrados.length > 0 ? (
					movel ? (
						"lista de dados"
					) : (
						<>
							<Tabela
								cabecalho={[
									"Data",
									"Status",
									"Tipo de Serviço",
									"Valor",
									"",
									"",
								]}
								dados={dadosFiltrados}
								itensPorPagina={itensPorPagina}
								paginaAtual={paginaAtual}
								renderizarLinha={(item, indice) => {
									return (
										<T_Linha key={indice}>
											<T_Celula>
												<strong>
													{ServicoFormatadorDeTexto
														.reverterFormatoDeData(
														item.data_atendimento as string
													)}
												</strong>
											</T_Celula>
											<T_Celula>
												<Status
													cor={
														ServicoDiaria.pegarStatus(
															item.status as DiariaStatus
														).cor
													}
												>
													{
														ServicoDiaria.pegarStatus(
															item.status as DiariaStatus
														).rotulo
													}
												</Status>
											</T_Celula>
											<T_Celula>
												{item.nome_servico}
											</T_Celula>
											<T_Celula>
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.preco
												)}
											</T_Celula>
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
						Nenhuma diária ainda
					</Typography>
				)}
			</Container>
		</>
	);
};

export default MinhasDiarias;
