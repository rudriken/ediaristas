import React from "react";
import { GetStaticProps } from "next";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import {
	Box,
	Button,
	Container,
	Divider,
	Snackbar,
	Typography,
} from "@mui/material";
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
import { EnderecoInterface } from "logica/@tipos/EnderecoInterface";
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
		podeCandidatar,
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
												{ServicoFormatadorDeTexto.reverterFormatoDeData(
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
										acoes={
											<>
												{podeCandidatar(item) && (
													<Button
														variant={"contained"}
														color={"secondary"}
														onClick={() =>
															alterarOportunidadeSelecionada(
																item
															)
														}
													>
														Se candidatar
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
													{ServicoFormatadorDeTexto.reverterFormatoDeData(
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
											<T_Celula>
												{podeCandidatar(itemT) && (
													<Button
														onClick={() =>
															alterarOportunidadeSelecionada(
																itemT
															)
														}
													>
														Se candidatar
													</Button>
												)}
											</T_Celula>
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
					aberto={oportunidadeSelecionada !== undefined}
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
									Data:{" "}
									<strong>
										{ServicoFormatadorDeTexto.pegarDataEHora(
											oportunidadeSelecionada?.data_atendimento as string
										)}
									</strong>
								</div>
								<div>
									{ServicoFormatadorDeTexto.pegarEndereco(
										oportunidadeSelecionada as EnderecoInterface
									)}
								</div>
								<div>
									<strong>
										Valor:{" "}
										{ServicoFormatadorDeTexto.formatarMoeda(
											oportunidadeSelecionada?.preco
										)}
									</strong>
								</div>
							</>
						</InformacoesDoServico>
					</Box>
					<InformacaoDoUsuario
						nome={
							oportunidadeSelecionada?.cliente.nome_completo || ""
						}
						avaliacao={
							oportunidadeSelecionada?.cliente.reputacao || 0
						}
						foto={
							oportunidadeSelecionada?.cliente.foto_usuario || ""
						}
					/>
					<Divider />
					{oportunidadeSelecionada?.avaliacoes_cliente.length > 0 && (
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

							{oportunidadeSelecionada?.avaliacoes_cliente.map(
								(item, indice) => {
									return (
										<InformacaoDoUsuario
											key={indice}
											nome={item.nome_avaliador}
											avaliacao={item.nota}
											foto={item.foto_avaliador}
											avaliando={true}
											descricao={item.descricao}
										/>
									);
								}
							)}
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
