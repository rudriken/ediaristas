import { Button, Container, Typography } from "@mui/material";
import { PagamentoStatus } from "logica/@tipos/PagamentoInterface";
import usePagamentos from "logica/ganchos/pages/usePagamentos.page";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoPagamento } from "logica/servicos/ServicoPagamento";
import React from "react";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import Status from "visual/componentes/exibe-dados/Status/Status";
import Tabela, {
	T_Celula,
	T_Linha,
	T_Paginacao,
} from "visual/componentes/exibe-dados/Tabela/Tabela";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { BotoesContainer } from "visual/parciais/diarias/_minhas-diarias.styled";

const Pagamentos: React.FC = () => {
	const {
		dadosFiltrados,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		movel,
		filtro,
		modificarFiltro,
	} = usePagamentos();
	return (
		<>
			<Container sx={{ mb: 5, p: 0 }}>
				<TituloPagina titulo={"Pagamentos"} />
				<BotoesContainer>
					<Button
						onClick={() => modificarFiltro("pago")}
						variant={filtro === "pago" ? "contained" : "outlined"}
					>
						Pago
					</Button>
					<Button
						onClick={() => modificarFiltro("aguardando")}
						variant={
							filtro === "aguardando" ? "contained" : "outlined"
						}
					>
						Aguardando Transferência
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
													item.created_at as string
												)}
											</>
										}
										corpo={
											<>
												Status:{" "}
												{
													ServicoPagamento.pegarStatus(
														item.status as PagamentoStatus
													).rotulo
												}
												<br />
												Valor diária:{" "}
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.valor
												)}
												<br />
												Valor depósito:{" "}
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.valor_deposito
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
									"Valor da Diária",
									"Valor Depósito",
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
														item.created_at as string
													)}
												</strong>
											</T_Celula>
											<T_Celula>
												<Status
													cor={
														ServicoPagamento.pegarStatus(
															item.status as PagamentoStatus
														).cor
													}
												>
													{
														ServicoPagamento.pegarStatus(
															item.status as PagamentoStatus
														).rotulo
													}
												</Status>
											</T_Celula>
											<T_Celula>
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.valor
												)}
											</T_Celula>
											<T_Celula>
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.valor_deposito
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
						Nenhum pagamento ainda
					</Typography>
				)}
			</Container>
		</>
	);
};

export default Pagamentos;
