import { useContext, useState } from "react";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import usePaginacao from "logica/ganchos/usePaginacao.hook";
import { ContextoDiaria } from "logica/contextos/ContextoDiarias";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { linksResolver, ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { mutate } from "swr";

export default function useMinhasDiarias() {
	const movel = useMovelAtivo(),
		{ estadoDiaria } = useContext(ContextoDiaria),
		{ diarias } = estadoDiaria,
		dadosFiltrados = diarias;
	const { paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
			usePaginacao(diarias, 7),
		[diariaConfirmar, alterarDiariaConfirmar] = useState(
			{} as DiariaInterface
		);

	function podeVisualizar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "self") !== undefined;
	}

	function podeConfirmar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "confirmar_diarista") !== undefined;
	}

	async function confirmarDiaria(diaria: DiariaInterface) {
		ServicoAPIHateoas(
			diaria.links,
			"confirmar_diarista",
			async (requisicao) => {
				try {
					await requisicao();
					alterarDiariaConfirmar({} as DiariaInterface);
					atualizarDiarias();
				} catch (erro) {}
			}
		);
	}

	function atualizarDiarias() {
		mutate("lista_diarias");
	}

	return {
		dadosFiltrados,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		movel,
		podeVisualizar,
		diariaConfirmar,
		alterarDiariaConfirmar,
		podeConfirmar,
		confirmarDiaria,
	};
}
