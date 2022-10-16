import React from "react";
// import {  } from "@mui/material";
import { ContainerFormularioEstilizado } from "./FormularioUsuario.style";

export interface FormularioUsuarioProps {}

export const FormularioUsuarioContainer = ContainerFormularioEstilizado;

const FormularioUsuario: React.FC<FormularioUsuarioProps> = () => {
	return <div></div>;
};

export default FormularioUsuario;

export * from "./Formularios/FormularioEndereco";
export * from "./Formularios/FormularioNovoContato";
export * from "./Formularios/FormularioPagamento";
export * from "./Formularios/FormularioImagem";
export * from "./Formularios/FormularioDadosUsuario";
export * from "./Formularios/FormularioLogin";
export * from "./Formularios/FormularioFinanceiro";
