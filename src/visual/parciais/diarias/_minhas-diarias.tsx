import { Button, Container, Typography } from "@mui/material";
import { DiariaInterface, DiariaStatus } from "logica/@tipos/DiariaInterface";
import useMinhasDiarias from "logica/ganchos/pages/diarias/useMinhasDiarias.page";
import { ServicoDiaria } from "logica/servicos/ServicoDiaria";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import React from "react";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import Status from "visual/componentes/exibe-dados/Status/Status";
import Tabela, {
	T_Celula,
	T_Linha,
	T_Paginacao,
} from "visual/componentes/exibe-dados/Tabela/Tabela";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Elo from "visual/componentes/navegacao/Link/Link";
import {
	AvaliarDialogo,
	ConfirmarDialogo,
	CancelarDialogo,
} from "./_minhas-diarias-dialogos";
import { BotoesContainer } from "./_minhas-diarias.styled";

const MinhasDiarias: React.FC = () => {
	const {
		dadosFiltrados,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		movel,
		podeVisualizar,
		diariaConfirmar,
		alterarDiariaConfirmar,
		podeConfirmar,
		confirmarDiaria,
		diariaAvaliar,
		alterarDiariaAvaliar,
		podeAvaliar,
		avaliarDiaria,
		podeCancelar,
		diariaCancelar,
		alterarDiariaCancelar,
		cancelarDiaria,
		filtro,
		modificarFiltro,
	} = useMinhasDiarias();
	return (
		<>
			<Container sx={{ mb: 5, p: 0 }}>
				<TituloPagina titulo={"Minhas Diárias"} />
				<BotoesContainer>
					<Button
						onClick={() => modificarFiltro("pendentes")}
						variant={
							filtro === "pendentes" ? "contained" : "outlined"
						}
					>
						Pendentes
					</Button>
					<Button
						onClick={() => modificarFiltro("avaliadas")}
						variant={
							filtro === "avaliadas" ? "contained" : "outlined"
						}
					>
						Avaliadas
					</Button>
					<Button
						onClick={() => modificarFiltro("canceladas")}
						variant={
							filtro === "canceladas" ? "contained" : "outlined"
						}
					>
						Canceladas
					</Button>
				</BotoesContainer>
				{dadosFiltrados.length > 0 ? (
					movel ? (
						<>
							{dadosFiltrados.map((item) => {
								return (
									<ListaDeDados
										key={item.id}
										cabecalho={
											<>
												Data:{" "}
												{ServicoFormatadorDeTexto.reverterFormatoDeData(
													item.data_atendimento as string
												)}
												<br />
												{item.nome_servico}
											</>
										}
										corpo={
											<>
												Status:{" "}
												{
													ServicoDiaria.pegarStatus(
														item.status as DiariaStatus
													).rotulo
												}
												<br />
												Valor:{" "}
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.preco
												)}
											</>
										}
										acoes={
											<>
												{podeVisualizar(item) && (
													<Button
														component={Elo}
														href={`?id=${item.id}`}
														color={"inherit"}
														variant={"outlined"}
													>
														Detalhes
													</Button>
												)}
												{podeConfirmar(item) && (
													<Button
														color={"success"}
														variant={"contained"}
														onClick={() =>
															alterarDiariaConfirmar(
																item
															)
														}
													>
														Confirmar Presença
													</Button>
												)}
												{podeAvaliar(item) && (
													<Button
														color={"success"}
														variant={"contained"}
														onClick={() =>
															alterarDiariaAvaliar(
																item
															)
														}
													>
														Avaliar
													</Button>
												)}
												{podeCancelar(item) && (
													<Button
														color={"error"}
														variant={"contained"}
														onClick={() =>
															alterarDiariaCancelar(
																item
															)
														}
													>
														Cancelar
													</Button>
												)}
											</>
										}
									/>
								);
							})}
						</>
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
													{ServicoFormatadorDeTexto.reverterFormatoDeData(
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
											<T_Celula>
												{podeVisualizar(item) && (
													<Elo
														href={`?id=${item.id}`}
													>
														Detalhes
													</Elo>
												)}
											</T_Celula>
											<T_Celula>
												{podeConfirmar(item) && (
													<Button
														color={"success"}
														onClick={() =>
															alterarDiariaConfirmar(
																item
															)
														}
													>
														Confirmar Presença
													</Button>
												)}
												{podeAvaliar(item) && (
													<Button
														color={"success"}
														onClick={() =>
															alterarDiariaAvaliar(
																item
															)
														}
													>
														Avaliar
													</Button>
												)}
												{podeCancelar(item) && (
													<Button
														color={"error"}
														onClick={() =>
															alterarDiariaCancelar(
																item
															)
														}
													>
														Cancelar
													</Button>
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
			{diariaConfirmar.id && (
				<ConfirmarDialogo
					diaria={diariaConfirmar}
					aoCancelar={() =>
						alterarDiariaConfirmar({} as DiariaInterface)
					}
					aoConfirmar={confirmarDiaria}
				/>
			)}
			{diariaAvaliar.id && (
				<AvaliarDialogo
					diaria={diariaAvaliar}
					aoCancelar={() =>
						alterarDiariaAvaliar({} as DiariaInterface)
					}
					aoConfirmar={avaliarDiaria}
				/>
			)}
			{diariaCancelar.id && (
				<CancelarDialogo
					diaria={diariaCancelar}
					aoCancelar={() =>
						alterarDiariaCancelar({} as DiariaInterface)
					}
					aoConfirmar={cancelarDiaria}
				/>
			)}
		</>
	);
};

export default MinhasDiarias;
