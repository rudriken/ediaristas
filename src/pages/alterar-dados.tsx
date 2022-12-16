import React from "react";
import { GetStaticProps } from "next";
import useAlterarDados from "logica/ganchos/pages/useAlterarDados.page";
import { FormProvider } from "react-hook-form";
import {
	FormularioCidades,
	FormularioContato,
	FormularioDadosUsuario,
	FormularioEndereco,
	FormularioFinanceiro,
	FormularioUsuarioContainer,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { Box, Button, Paper, Typography } from "@mui/material";
import {
	FormularioContainer,
	FotoDoUsuario,
} from "@estilos/pages/alterar-dados.styled";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Alterar Dados",
		},
	};
};

const AlterarDados: React.FC = () => {
	const { usuario, formularioMetodos, foto, aoAlterarFoto } =
		useAlterarDados();
	return (
		<FormProvider {...formularioMetodos}>
			<form onSubmit={() => {}}>
				<FormularioUsuarioContainer>
					<TituloPagina titulo={"Alterar dados cadastrais"} />

					<Paper sx={{ mb: 3, mt: 15, position: "relative" }}>
						<FotoDoUsuario>
							{foto && <img src={foto} alt={"Usuário"} />}
							<input
								type={"file"}
								{...formularioMetodos.register(
									"usuario.foto_usuario"
								)}
								onChange={aoAlterarFoto}
								accept={".jpeg, .jpg, .png"}
							/>
							<i className={"twf-camera"} />
						</FotoDoUsuario>
						<Typography sx={{ pt: 14, pb: 2 }} align={"center"}>
							Dados Pessoais
						</Typography>
						<FormularioContainer>
							<FormularioDadosUsuario />
						</FormularioContainer>
					</Paper>

					{usuario.tipo_usuario === TipoDoUsuario.Diarista && (
						<Paper sx={{ mb: 3 }}>
							<Typography sx={{ pt: 4, pb: 2 }} align={"center"}>
								Financeiro
							</Typography>
							<FormularioContainer>
								<FormularioFinanceiro />
							</FormularioContainer>
						</Paper>
					)}

					<Paper sx={{ mb: 3 }}>
						<Typography sx={{ pt: 4, pb: 2 }} align={"center"}>
							Dados de acesso
						</Typography>
						<FormularioContainer>
							<FormularioContato />
						</FormularioContainer>
					</Paper>

					{usuario.tipo_usuario === TipoDoUsuario.Diarista && (
						<>
							<Paper sx={{ mb: 3 }}>
								<Typography
									sx={{ pt: 4, pb: 2 }}
									align={"center"}
								>
									Endereço
								</Typography>
								<FormularioContainer>
									<FormularioEndereco />
								</FormularioContainer>
							</Paper>

							<Paper sx={{ mb: 3 }}>
								<Typography
									sx={{ pt: 4, pb: 2 }}
									align={"center"}
								>
									Cidades
								</Typography>
								<FormularioContainer>
									<FormularioCidades estado={"MG"} />
								</FormularioContainer>
							</Paper>
						</>
					)}

					<Box sx={{ mt: 2, mb: 8, textAlign: "center" }}>
						<Button
							variant={"contained"}
							color={"secondary"}
							size={"large"}
							type={"submit"}
						>
							Salvar
						</Button>
					</Box>
				</FormularioUsuarioContainer>
			</form>
		</FormProvider>
	);
};

export default AlterarDados;
