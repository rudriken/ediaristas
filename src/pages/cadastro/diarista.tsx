import React from "react";
import { GetStaticProps } from "next";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Elo from "visual/componentes/navegacao/Link/Link";
import useCadastroDiarista from "logica/ganchos/pages/cadastro/useCadastroDiarista.page";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { ContainerPaginaFormulario } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario.style";
// import {  } from "@estilos/pages/diarista.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Diarista",
		},
	};
};

const Diarista: React.FC = () => {
	const { passo, migalhaDePaoItens } = useCadastroDiarista();
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
				<ContainerPaginaFormulario></ContainerPaginaFormulario>
			</FormularioUsuarioContainer>
		</>
	);
};

export default Diarista;
