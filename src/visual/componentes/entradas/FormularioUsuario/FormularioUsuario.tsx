import React from "react";
import { FormularioNovoContato } from "./Formularios/FormularioNovoContato";
// import {  } from "@mui/material";
// import {  } from "./FormularioUsuario.style";

export interface FormularioUsuarioProps {}

const FormularioUsuario: React.FC<FormularioUsuarioProps> = () => {
	return (
		<div>
			<FormularioNovoContato />
		</div>
	);
};

export default FormularioUsuario;
