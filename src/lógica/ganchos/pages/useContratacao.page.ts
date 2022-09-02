import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiçoEstruturaFormulário } from "../../serviços/ServiçoEstruturaFormulário";
import { NovaDiáriaFormulárioDeDadosInterface } from "lógica/@tipos/FormulárioInterface";

export default function useContratacao() {
	const [passo, alterarPasso] = useState(1),
		migalhaDePãoItens = [
			"Detalhes da Diária",
			"Identificação",
			"Pagamento",
		],
		formulárioServiço = useForm<NovaDiáriaFormulárioDeDadosInterface>({
			resolver: yupResolver(
				ServiçoEstruturaFormulário.endereço().concat(
					ServiçoEstruturaFormulário.detalhesServiço()
				)
			),
		});
	return {
		passo,
		migalhaDePãoItens,
	};
}
