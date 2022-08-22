import React from "react";
import { FormularioImagem } from "./Formularios/FormularioImagem";
import { FormularioNovoContato } from "./Formularios/FormularioNovoContato";
// import {  } from "@mui/material";
// import {  } from "./FormularioUsuario.style";

export interface FormularioUsuarioProps {}

const FormularioUsuario: React.FC<FormularioUsuarioProps> = () => {
	return (
		<div>
			<FormularioImagem />
		</div>
	);
};

export default FormularioUsuario;
