import React from "react";
import { GetStaticProps } from "next";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Elo from "visual/componentes/navegacao/Link/Link";
import useCadastroDiarista from "logica/ganchos/pages/cadastro/useCadastroDiarista.page";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { ContainerPaginaFormulario } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario.style";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import InformacaoLateral from "visual/componentes/exibe-dados/InformacaoLateral/InformacaoLateral";
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
		{ passo, migalhaDePaoItens } = useCadastroDiarista();
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
					<div></div>
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
		</>
	);
};

export default Diarista;
