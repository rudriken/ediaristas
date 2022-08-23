import React from "react";
import { FormularioImagem } from "./Formularios/FormularioImagem";
import { FormularioNovoContato } from "./Formularios/FormularioNovoContato";
import { FormularioPagamento } from "./Formularios/FormularioPagamento";
// import {  } from "@mui/material";
// import {  } from "./FormularioUsuario.style";

export interface FormularioUsuarioProps {}

const FormularioUsuario: React.FC<FormularioUsuarioProps> = () => {
	return (
		<div>
			<FormularioPagamento />
		</div>
	);
};

export default FormularioUsuario;
