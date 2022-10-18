import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useCadastroDiarista() {
	const [passo, alterarPasso] = useState(2),
		migalhaDePaoItens = ["Identificação", "Cidades atendidas"],
		formularioUsuario = useForm(),
		formularioListaDeCidades = useForm();
	return {
		passo,
		migalhaDePaoItens,
		formularioUsuario,
		formularioListaDeCidades,
	};
}
