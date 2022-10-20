import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Elo from "visual/componentes/navegacao/Link/Link";
import useCadastroDiarista from "logica/ganchos/pages/cadastro/useCadastroDiarista.page";
import {
	FormularioCidades,
	FormularioDadosUsuario,
	FormularioEndereco,
	FormularioFinanceiro,
	FormularioImagem,
	FormularioNovoContato,
	FormularioUsuarioContainer,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { ContainerPaginaFormulario } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario.style";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import InformacaoLateral from "visual/componentes/exibe-dados/InformacaoLateral/InformacaoLateral";
import { FormProvider } from "react-hook-form";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";
import { ServicoNavegador } from "logica/servicos/ServicoNavegador";
// import {  } from "@estilos/pages/diarista.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Diarista",
		},
	};
};

const Diarista: React.FC = () => {
	const movel = useMovelAtivo(),
		{
			passo,
			esperandoResposta,
			migalhaDePaoItens,
			formularioUsuario,
			formularioListaDeCidades,
			novoEndereco,
			sucessoCadastro,
			cidadesAtendidas,
			aoSubmeterUsuario,
			aoSubmeterEndereco,
		} = useCadastroDiarista();

	useEffect(() => {
		ServicoNavegador.rolarParaCima();
	}, [passo]);

	return (
		<>
			<AmbienteSeguro />
			<MigalhaDePao
				itens={migalhaDePaoItens}
				selecionado={migalhaDePaoItens[passo - 1]}
			/>
			{passo === 1 && (
				<TituloPagina
					titulo={"Precisamos conhecer um pouco sobre você!"}
					subtitulo={
						<span>
							Caso já tenha cadastro,{" "}
							<Elo href={"/login"}>clique aqui</Elo>
						</span>
					}
				/>
			)}
			{passo === 2 && (
				<TituloPagina
					titulo={"Quais cidades você atenderá?"}
					subtitulo={
						<span>
							Você pode escolher se aceita ou não um serviço.
							Então, não se preocupe se mora em uma grande cidade.
						</span>
					}
				/>
			)}
			<FormularioUsuarioContainer>
				<ContainerPaginaFormulario>
					{passo === 1 && (
						<FormProvider {...formularioUsuario}>
							<Paper
								sx={{ p: 4 }}
								component={"form"}
								onSubmit={formularioUsuario.handleSubmit(
									aoSubmeterUsuario
								)}
							>
								<Typography sx={{ fontWeight: "bold", pb: 2 }}>
									Dados pessoais
								</Typography>
								<FormularioDadosUsuario cadastro={true} />

								<Divider sx={{ mb: 5 }} />

								<Typography sx={{ fontWeight: "bold", pb: 2 }}>
									Financeiro
								</Typography>
								<FormularioFinanceiro />

								<Divider sx={{ mb: 5 }} />

								<Typography sx={{ fontWeight: "bold" }}>
									Hora da self! Envie uma self segurando o
									documento
								</Typography>
								<Typography sx={{ pb: 2 }}>
									Para sua segurança, todos os profissionais e
									clientes precisam enviar
								</Typography>
								<FormularioImagem />
								<Typography
									sx={{ pt: 1, pb: 5 }}
									variant={"body2"}
								>
									Essa foto não será vista por ninguém
								</Typography>

								<Divider sx={{ mb: 5 }} />

								<Typography sx={{ fontWeight: "bold", pb: 2 }}>
									Endereço
								</Typography>
								<FormularioEndereco />

								<Divider sx={{ mb: 5 }} />

								<Typography sx={{ fontWeight: "bold", pb: 2 }}>
									Dados de acesso
								</Typography>
								<FormularioNovoContato />

								<Container sx={{ textAlign: "center" }}>
									<Button
										variant={"contained"}
										color={"secondary"}
										type={"submit"}
										disabled={esperandoResposta}
									>
										Cadastrar e escolher cidades
									</Button>
								</Container>
							</Paper>
						</FormProvider>
					)}

					{passo === 2 && (
						<FormProvider {...formularioListaDeCidades}>
							<Paper
								sx={{ p: 4 }}
								component={"form"}
								onSubmit={formularioListaDeCidades.handleSubmit(
									aoSubmeterEndereco
								)}
							>
								<Typography sx={{ fontWeight: "bold", pb: 2 }}>
									Selecione a cidade
								</Typography>
								{novoEndereco && (
									<FormularioCidades
										estado={novoEndereco.estado}
									/>
								)}
								<Container sx={{ textAlign: "center" }}>
									<Button
										variant={"contained"}
										color={"secondary"}
										type={"submit"}
										disabled={
											esperandoResposta ||
											cidadesAtendidas?.length === 0
										}
									>
										Finalizar o cadastro
									</Button>
								</Container>
							</Paper>
						</FormProvider>
					)}

					{!movel && (
						<InformacaoLateral
							titulo={"Como funciona?"}
							itens={[
								{
									tituloI: "1 - Cadastro",
									descricaoI: [
										"Você faz o cadastro e escolhe as cidades atendidas",
									],
								},
								{
									tituloI: "2 - Receba Propostas",
									descricaoI: [
										"Você receberá avisos por E-mail sobre novos serviços nas cidades atendidas",
									],
								},
								{
									tituloI: "3 - Diária Agendada",
									descricaoI: [
										"Se o seu perfil for escolhido pelo cliente, você receberá a confirmação do agendamento",
									],
								},
							]}
						/>
					)}
				</ContainerPaginaFormulario>
			</FormularioUsuarioContainer>

			<Dialogo
				aberto={sucessoCadastro}
				aoFechar={() => {}}
				titulo={"Cadastro realizado com sucesso!"}
				naoTerBotaoCancelar
				aoConfirmar={() => window.location.reload()}
				rotuloConfirmar={"Ver oportunidades"}
			>
				Agora você pode visualizar as oportunidades disponíveis na sua
				região.
			</Dialogo>
		</>
	);
};

export default Diarista;
