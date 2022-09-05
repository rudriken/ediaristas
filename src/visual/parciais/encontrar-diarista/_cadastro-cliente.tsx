import React from "react";
import { Button, Container, Divider, Typography } from "@mui/material";
import {
	FormularioDadosUsuario,
	FormularioImagem,
	FormularioNovoContato,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
// import { Component } from "./_cadastro-cliente.styled";

const CadastroCliente: React.FC<{ paraVoltar: () => void }> = ({
	paraVoltar,
}) => {
	return (
		<>
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Dados pessoais
			</Typography>
			<FormularioDadosUsuario cadastro={true} />
			<Divider sx={{ mb: 5 }} />

			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Hora da self! Envie uma self segurando o documento
			</Typography>
			<FormularioImagem />
			<Typography sx={{ pt: 1, pb: 5 }} variant={"body2"}>
				Essa foto não será vista por ninguém
			</Typography>
			<Divider sx={{ mb: 5 }} />

			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Dados de acesso
			</Typography>
			<FormularioNovoContato />

			<Container
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<Button
					variant={"outlined"}
					color={"primary"}
					type={"button"}
					onClick={paraVoltar}
				>
					Voltar para detalhes da diária
				</Button>

				<Button
					variant={"contained"}
					color={"secondary"}
					type={"submit"}
				>
					Ir para pagamento
				</Button>
			</Container>
		</>
	);
};

export default CadastroCliente;
