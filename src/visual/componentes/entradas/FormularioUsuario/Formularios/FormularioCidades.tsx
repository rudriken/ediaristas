import useFormularioCidades from "logica/ganchos/componentes/entradas/FormularioUsuario/Formularios/useFormularioCidades";
import React from "react";
import { CidadesSelecao } from "../FormularioUsuario.style";

export const FormularioCidades: React.FC<{ estado: string }> = ({ estado }) => {
	const {
		listaDeCidades,
		cidadesASeremSelecionadas,
		cidadesSelecionadas,
		aoSelecionarCidade,
		aoDesselecionarCidade,
	} = useFormularioCidades(estado);
	return <CidadesSelecao></CidadesSelecao>;
};
