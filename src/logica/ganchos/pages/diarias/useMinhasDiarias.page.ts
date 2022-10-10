import { useContext } from "react";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import usePaginacao from "logica/ganchos/usePaginacao.hook";
import { ContextoDiaria } from "logica/contextos/ContextoDiarias";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { linksResolver } from "logica/servicos/ServicoAPI";

export default function useMinhasDiarias() {
	const movel = useMovelAtivo(),
		{ estadoDiaria } = useContext(ContextoDiaria),
		{ diarias } = estadoDiaria,
		dadosFiltrados = diarias;
	const { paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
		usePaginacao(diarias, 7);

	function podeVisualizar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "self") !== undefined;
	}

	return {
		dadosFiltrados,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		movel,
		podeVisualizar,
	};
}
