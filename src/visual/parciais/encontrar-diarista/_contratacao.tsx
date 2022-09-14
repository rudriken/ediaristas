import React from "react";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import useMóvelAtivo from "lógica/ganchos/useMóvelAtivo";
import useContratacao from "lógica/ganchos/pages/useContratacao.page";
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

const Contratacao: React.FC = () => {
	const móvel = useMóvelAtivo(),
		{
			passo,
			alterarPasso,
			migalhaDePãoItens,
			formulárioServiço,
			formulárioCliente,
			formularioLogin,
			formularioPagamento,
			aoSubmeterFormulárioServiço,
			aoSubmeterFormulárioCliente,
			aoSubmeterFormularioLogin,
			aoSubmeterFormularioPagamento,
			serviços,
			temLogin,
			erroDeLogin,
			alterarTemLogin,
			alterarErroDeLogin,
		} = useContratacao();

	if (!serviços || serviços.length < 1) {
		return (
			<Container sx={{ textAlign: "center", my: 10 }}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<div>
			{!móvel && <AmbienteSeguro />}
			<MigalhaDePao
				itens={migalhaDePãoItens}
				selecionado={migalhaDePãoItens[passo - 1]}
			/>
			{passo === 1 && (
				<TituloPagina título={"Nos conte um pouco sobre o serviço!"} />
			)}
			{passo === 2 && (
				<TituloPagina
					título={"Precisamos conhecer um pouco sobre você!"}
					subtítulo={
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
						<FormProvider {...formulárioServiço}>
							<form
								onSubmit={formulárioServiço.handleSubmit(
									aoSubmeterFormulárioServiço
								)}
								hidden={passo !== 1}
							>
								<DetalhesServico serviços={serviços} />
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

						<FormProvider {...formulárioCliente}>
							<form
								onSubmit={formulárioCliente.handleSubmit(
									aoSubmeterFormulárioCliente
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
					{!móvel && passo !== 4 && (
						<InformacaoLateral
							título={"Detalhes"}
							itens={[
								{
									títuloI: "Tipo",
									descriçãoI: [""],
									íconeI: "twf-check-circle",
								},
								{
									títuloI: "Tamanho",
									descriçãoI: [""],
									íconeI: "twf-check-circle",
								},
								{
									títuloI: "Data",
									descriçãoI: [""],
									íconeI: "twf-check-circle",
								},
							]}
							rodapé={{
								textoR: "R$ 80,00",
								íconeR: "twf-credit-card",
							}}
						/>
					)}
				</ContainerPaginaFormulario>
			</FormularioUsuarioContainer>
		</div>
	);
};
export default Contratacao;
