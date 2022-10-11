import { useContext, useEffect, useState } from "react";
import { ContextoDiaria } from "logica/contextos/ContextoDiarias";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { InterfaceDoUsuario } from "logica/@tipos/InterfaceDoUsuario";

export default function useDetalhesDiaria(diariaID: string) {
	const { estadoDiaria } = useContext(ContextoDiaria),
		{ diarias } = estadoDiaria,
		[diaria, alterarDiaria] = useState({} as DiariaInterface),
		[cliente, alterarCliente] = useState({} as InterfaceDoUsuario),
		[diarista, alterarDiarista] = useState({} as InterfaceDoUsuario);

	useEffect(() => {
		if (diarias.length) {
			pegarDiaria(diarias, diariaID);
		}
	}, [diarias, diariaID]);

	async function pegarDiaria(diarias: DiariaInterface[], diariaID: string) {
		const diariaSelecionada = diarias.find(
			(item) => item.id === Number(diariaID) /* ou '+diariaID' */
		);
		if (diariaSelecionada) {
			ServicoAPIHateoas(
				diariaSelecionada.links,
				"self",
				async (requisicao) => {
					const diariaCompleta = (await requisicao<DiariaInterface>())
						.data;
					if (diariaCompleta) {
						alterarDiaria(diariaCompleta);
						diariaCompleta.diarista &&
							alterarDiarista(diariaCompleta.diarista);
						diariaCompleta.cliente &&
							alterarCliente(diariaCompleta.cliente);
					}
				}
			);
		}
	}

	return { diaria, diarista, cliente };
}
