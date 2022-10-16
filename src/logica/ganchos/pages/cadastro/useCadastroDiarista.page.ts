import { useState } from "react";

export default function useCadastroDiarista() {
	const [passo, alterarPasso] = useState(1),
		migalhaDePaoItens = ["Identificação", "Cidades atendidas"];
	return {
		passo,
		migalhaDePaoItens,
	};
}
