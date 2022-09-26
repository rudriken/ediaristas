import React, { useEffect } from "react";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import useContratacao from "logica/ganchos/pages/useContratacao.page";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import InformacaoLateral from "visual/componentes/exibe-dados/InformacaoLateral/InformacaoLateral";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { ContainerPaginaFormulario } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario.style";
import DetalhesServico from "./_detalhes-servico";
import CadastroCliente, { LoginCliente } from "./_cadastro-cliente";
import InformacoesPagamento from "./_informacoes-pagamento";
import Elo from "visual/componentes/navegacao/Link/Link";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import { ServicoNavegador } from "logica/servicos/ServicoNavegador";

const Contratacao: React.FC = () => {
	const movel = useMovelAtivo(),
		{
			passo,
			alterarPasso,
			migalhaDePaoItens,
			formularioServico,
			formularioCliente,
			formularioLogin,
			formularioPagamento,
			aoSubmeterFormularioServico,
			aoSubmeterFormularioCliente,
			aoSubmeterFormularioLogin,
			aoSubmeterFormularioPagamento,
			servicos,
			podemosAtender,
			temLogin,
			tipoLimpeza,
			totalPreco,
			tamanhoCasa,
			erroDeLogin,
			alterarTemLogin,
			alterarErroDeLogin,
		} = useContratacao(),
		dataAtendimento = formularioServico.watch("faxina.data_atendimento");

	useEffect(() => {
		ServicoNavegador.rolarParaCima();
	}, [passo]);

	if (!servicos || servicos.length < 1) {
		return (
			<Container sx={{ textAlign: "center", my: 10 }}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<div>
			{!movel && <AmbienteSeguro />}
			<MigalhaDePao
				itens={migalhaDePaoItens}
				selecionado={migalhaDePaoItens[passo - 1]}
			/>
			{movel && [2, 3].includes(passo) && (
				<ListaDeDados
					cabecalho={
						<Typography
							color={"primary"}
							sx={{ fontWeight: "thin" }}
						>
							O valor total do serviço é:{" "}
							{ServicoFormatadorDeTexto.formatarMoeda(totalPreco)}
						</Typography>
					}
					corpo={
						<>
							{tipoLimpeza.nome}
							<br />
							Tamanho: {tamanhoCasa.join(", ")}
							<br />
							Data: {dataAtendimento}
						</>
					}
				/>
			)}
			{passo === 1 && (
				<TituloPagina titulo={"Nos conte um pouco sobre o serviço!"} />
			)}
			{passo === 2 && (
				<TituloPagina
					titulo={"Precisamos conhecer um pouco sobre você!"}
					subtitulo={
						!temLogin ? (
							<span>
								Caso já tenha cadastro,{" "}
								<Button onClick={() => alterarTemLogin(true)}>
									clique aqui
								</Button>
							</span>
						) : (
							<span>
								Caso não tenha cadastro,{" "}
								<Button onClick={() => alterarTemLogin(false)}>
									clique aqui
								</Button>
							</span>
						)
					}
				/>
			)}
			<FormularioUsuarioContainer>
				<ContainerPaginaFormulario larguraTotal={passo === 4}>
					<Paper sx={{ p: 4 }}>
						<FormProvider {...formularioServico}>
							<form
								onSubmit={formularioServico.handleSubmit(
									aoSubmeterFormularioServico
								)}
								hidden={passo !== 1}
							>
								<DetalhesServico
									servicos={servicos}
									comodos={tamanhoCasa.length}
									podemosAtender={podemosAtender}
								/>
							</form>
						</FormProvider>

						{passo === 2 && temLogin && (
							<FormProvider {...formularioLogin}>
								<form
									onSubmit={formularioLogin.handleSubmit(
										aoSubmeterFormularioLogin
									)}
								>
									{erroDeLogin && (
										<Typography
											color={"error"}
											align={"center"}
											sx={{ mb: 2 }}
										>
											{erroDeLogin}
										</Typography>
									)}
									<LoginCliente
										paraVoltar={() => alterarPasso(1)}
									/>
								</form>
							</FormProvider>
						)}

						<FormProvider {...formularioCliente}>
							<form
								onSubmit={formularioCliente.handleSubmit(
									aoSubmeterFormularioCliente
								)}
								hidden={passo !== 2 || temLogin}
							>
								<CadastroCliente
									paraVoltar={() => alterarPasso(1)}
								/>
							</form>
						</FormProvider>

						{passo === 3 && (
							<FormProvider {...formularioPagamento}>
								<form
									onSubmit={formularioPagamento.handleSubmit(
										aoSubmeterFormularioPagamento
									)}
								>
									<InformacoesPagamento />
								</form>
							</FormProvider>
						)}

						{passo === 4 && (
							<Box sx={{ textAlign: "center" }}>
								<Typography
									color={"secondary"}
									sx={{ fontSize: "82px" }}
								>
									<i className={"twf-check-circle"} />
								</Typography>
								<Typography
									color={"secondary"}
									sx={{ fontSize: "22px", pb: 3 }}
								>
									Pagamento realizado com sucesso!
								</Typography>
								<Typography
									sx={{
										maxWidth: "410px",
										mb: 3,
										mx: "auto",
									}}
									variant={"body2"}
									color={"textSecondary"}
								>
									Sua diária foi paga com sucesso! Já estamos
									procurando o(a) melhor profissional para
									atender sua residência. Caso nenhum(a)
									profissional seja encontrado(a),
									devolveremos seu dinheiro automaticamente 24
									horas antes da data agendada. Você também
									poderá cancelar a sua diária sem nenhuma
									multa até 24 horas antes da hora do
									agendamento.
								</Typography>
								<Elo
									href={"/diarias"}
									ComponenteReact={Button}
									mui={{
										color: "secondary",
										variant: "contained",
									}}
								>
									Ir para minhas diárias
								</Elo>
							</Box>
						)}
					</Paper>
					{!movel && passo !== 4 && (
						<InformacaoLateral
							titulo={"Detalhes"}
							itens={[
								{
									tituloI: "Tipo",
									descricaoI: [tipoLimpeza?.nome],
									iconeI: "twf-check-circle",
								},
								{
									tituloI: "Tamanho",
									descricaoI: tamanhoCasa,
									iconeI: "twf-check-circle",
								},
								{
									tituloI: "Data",
									descricaoI: [dataAtendimento as string],
									iconeI: "twf-check-circle",
								},
							]}
							rodape={{
								textoR: ServicoFormatadorDeTexto.formatarMoeda(
									totalPreco
								),
								iconeR: "twf-credit-card",
							}}
						/>
					)}
				</ContainerPaginaFormulario>
			</FormularioUsuarioContainer>
		</div>
	);
};
export default Contratacao;
