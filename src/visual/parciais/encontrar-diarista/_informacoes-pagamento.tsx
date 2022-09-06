import { Typography, Container, Button } from "@mui/material";
import React from "react";
import { FormularioPagamento } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
// import { Component } from "./_informacoes-pagamento.styled";

const InformacoesPagamento: React.FC = () => {
	return (
		<>
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Informações de pagamento
			</Typography>
			<FormularioPagamento />
			<Container sx={{ textAlign: "center" }}>
				<Button
					variant={"contained"}
					color={"secondary"}
					type={"submit"}
				>
					Fazer Pagamento
				</Button>
			</Container>
		</>
	);
};

export default InformacoesPagamento;
