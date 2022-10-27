import React from "react";
import { GetStaticProps } from "next";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import { Box, Container, Divider, Snackbar, Typography } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import Tabela, {
	T_Celula,
	T_Linha,
	T_Paginacao,
} from "visual/componentes/exibe-dados/Tabela/Tabela";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";
import InformacoesDoServico from "visual/componentes/exibe-dados/InformacoesDoServico/InformacoesDoServico";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
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
		oportunidadeSelecionada,
		alterarOportunidadeSelecionada,
		seCandidatar,
		mensagemFeedback,
		alterarMensagemFeedback,
		totalComodos,
	} = useOportunidadesTrabalho();
	return (
		<>
			<Container sx={{ mb: 5, p: 0 }}>
				<TituloPagina titulo={"Oportunidades de trabalho"} />
				{oportunidades.length > 0 ? (
					movel ? (
						<>
							{oportunidades.map((item) => {
								return (
									<ListaDeDados
										key={item.id}
										cabecalho={
											<>
												Data:{" "}
												{ServicoFormatadorDeTexto
													.reverterFormatoDeData(
													item.data_atendimento as string
												)}
												<br />
												{item.nome_servico}
												<br />
												{ServicoFormatadorDeTexto.formatarMoeda(
													item.preco
												)}
											</>
										}
										corpo={
											<>
												Cidade: {item.cidade}
												<br />
												Número de cômodos:{" "}
												{totalComodos(item)}
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
									"Tipo de Serviço",
									"Número de Cômodos",
									"Cidade",
									"Valor",
									"",
								]}
								dados={oportunidades}
								renderizarLinha={(itemT, indiceT) => {
									return (
										<T_Linha key={indiceT}>
											<T_Celula>
												<strong>
													{ServicoFormatadorDeTexto
														.reverterFormatoDeData(
														itemT.data_atendimento as string
													)}
												</strong>
											</T_Celula>
											<T_Celula>
												{itemT.nome_servico}
											</T_Celula>
											<T_Celula>
												{totalComodos(itemT)} cômodos
											</T_Celula>
											<T_Celula>
												{itemT.cidade} - {itemT.estado}
											</T_Celula>
											<T_Celula>
												{ServicoFormatadorDeTexto.formatarMoeda(
													itemT.preco
												)}
											</T_Celula>
											<T_Celula></T_Celula>
										</T_Linha>
									);
								}}
								itensPorPagina={itensPorPagina}
								paginaAtual={paginaAtual}
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
			{oportunidadeSelecionada && (
				<Dialogo
					aberto={oportunidadeSelecionada !== undefined || true}
					titulo={"Se candidatar à diária"}
					subtitulo={
						"Tem certeza que deseja se candidatar à diária abaixo?"
					}
					aoFechar={() => {
						alterarOportunidadeSelecionada(undefined);
					}}
					aoConfirmar={() => {
						seCandidatar(oportunidadeSelecionada);
					}}
				>
					<Box>
						<InformacoesDoServico>
							<>
								<div>
									Data: <strong>01/01/2023</strong>
								</div>
								<div>
									Rua Alvacaz, 1000 - Cruzeiro do Sul,
									Uberlâdia - MG
								</div>
								<div>
									<strong>Valor: R$ 240,00</strong>
								</div>
							</>
						</InformacoesDoServico>
					</Box>
					<InformacaoDoUsuario
						nome={"Rodrigo"}
						avaliacao={3}
						foto={"https://github.com/rudriken.png"}
					/>
					<Divider />
					{(oportunidadeSelecionada?.avaliacoes_cliente.length > 0 ||
						true) && (
						<>
							<Typography
								sx={{
									p: 3,
									fontWeight: "medium",
									bgcolor: "grey.50",
								}}
							>
								Últimas avaliações do cliente
							</Typography>
							<InformacaoDoUsuario
								nome={"Rodrigo"}
								avaliacao={3}
								foto={"https://github.com/rudriken.png"}
								avaliando={true}
								descricao={"Algum texto"}
							/>
						</>
					)}
					<Typography
						sx={{ py: 2 }}
						variant={"subtitle2"}
						color={"textSecondary"}
					>
						Ao se candidatar você ainda não é o(a) diarista
						escolhido(a) para realizar o trabalho. Vamos analisar
						suas qualificações e a distância para o local da diária.
						Caso você seja a pessoa selecionada, receberá um e-mail
						avisando. Atente-se à sua caixa de entrada!
					</Typography>
				</Dialogo>
			)}
			<Snackbar
				open={mensagemFeedback.length > 0}
				message={mensagemFeedback}
				autoHideDuration={4000}
				onClose={() => {
					alterarMensagemFeedback("");
				}}
			/>
		</>
	);
};

export default Oportunidades;
