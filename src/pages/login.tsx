import React from "react";
import { GetStaticProps } from "next";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import { Container, Typography } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { ContainerLogin, BotaoLogin } from "@estilos/pages/login.styled";
import { FormularioLogin } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import useLogin from "logica/ganchos/pages/useLogin.page";
import { FormProvider } from "react-hook-form";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Login",
		},
	};
};

const Login: React.FC = () => {
	const {
		estadoServicosExternos,
		formularioMetodos,
		mensagemDeErro,
		aoSubmeter,
	} = useLogin();
	return (
		<div>
			<FormProvider {...formularioMetodos}>
				<AmbienteSeguro />
				<Container>
					<TituloPagina titulo={"Informe seu e-mail e senha"} />
					<ContainerLogin
						as={"form"}
						onSubmit={formularioMetodos.handleSubmit(aoSubmeter)}
					>
						<FormularioLogin />
						{mensagemDeErro && (
							<Typography color={"error"} align={"center"}>
								{mensagemDeErro}
							</Typography>
						)}
						<BotaoLogin
							size={"large"}
							variant={"contained"}
							color={"secondary"}
							type={"submit"}
							disabled={
								estadoServicosExternos?.servicosExternos
									?.length === 0
							}
						>
							Entrar
						</BotaoLogin>
					</ContainerLogin>
				</Container>
			</FormProvider>
		</div>
	);
};

export default Login;
