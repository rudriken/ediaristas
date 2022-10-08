import { useMemo, useState } from "react";

export default function usePaginacao(
	listaDeItens: unknown[],
	itensPorPagina = 10
) {
	const [paginaAtual, alterarPaginaAtual] = useState(1),
		totalPaginas = useMemo(() => {
			if (listaDeItens.length > itensPorPagina) {
				return Math.ceil(listaDeItens.length / itensPorPagina);
			}
			return 1;
		}, [listaDeItens, itensPorPagina]);
	return {
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
	};
}
