import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useCadastroDiarista() {
	const [passo, alterarPasso] = useState(1),
		migalhaDePaoItens = ["Identificação", "Cidades atendidas"],
		formularioUsuario = useForm();
	return {
		passo,
		migalhaDePaoItens,
		formularioUsuario,
	};
}
