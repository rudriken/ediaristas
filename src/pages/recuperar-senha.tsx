import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ContainerCamposDoFormulario } from "@estilos/pages/recuperar-senha.styled";
import { Container } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import CampoDeTexto from "visual/componentes/entradas/CampoDeTexto/CampoDeTexto";
import { BotaoLogin } from "@estilos/pages/login.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "RecuperarSenha",
		},
	};
};

const RecuperarSenha: React.FC = () => {
	const roteador = useRouter();
	return (
		<Container>
			<TituloPagina titulo={"Recuperação de Senha"} />
			{roteador.query.token ? (
				<ContainerCamposDoFormulario>
					<CampoDeTexto
						label={"Digite seu e-mail"}
						type={"email"}
						fullWidth
					/>
					<CampoDeTexto
						label={"Digite a nova senha"}
						type={"password"}
						fullWidth
					/>
					<CampoDeTexto
						label={"Confirme a nova senha"}
						type={"password"}
						fullWidth
					/>
					<BotaoLogin
						size={"large"}
						variant={"contained"}
						color={"secondary"}
					>
						Redefinir Senha
					</BotaoLogin>
					RESETAR SENHA
				</ContainerCamposDoFormulario>
			) : (
				<ContainerCamposDoFormulario>
					<CampoDeTexto label={"Digite seu e-mail"} type={"email"} />
					<BotaoLogin
						size={"large"}
						variant={"contained"}
						color={"secondary"}
					>
						Recuperar Senha
					</BotaoLogin>
					SOLICITAR TOKEN
				</ContainerCamposDoFormulario>
			)}
		</Container>
	);
};

export default RecuperarSenha;
