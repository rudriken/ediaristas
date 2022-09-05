import React from "react";
import { Button, Paper } from "@mui/material";
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
import CadastroCliente from "./_cadastro-cliente";

const Contratacao: React.FC = () => {
	const móvel = useMóvelAtivo(),
		{
			passo,
			alterarPasso,
			migalhaDePãoItens,
			formulárioServiço,
			formulárioCliente,
			aoSubmeterFormulárioServiço,
			aoSubmeterFormulárioCliente,
			serviços,
			temLogin,
			alterarTemLogin,
		} = useContratacao();
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
					</Paper>
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
				</ContainerPaginaFormulario>
			</FormularioUsuarioContainer>
		</div>
	);
};
export default Contratacao;
