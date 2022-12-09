import { useContext, useMemo, useState } from "react";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import usePaginacao from "logica/ganchos/usePaginacao.hook";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { useApiHateoas } from "../useApi.hook";
import {
	PagamentoInterface,
	PagamentoStatus,
} from "logica/@tipos/PagamentoInterface";

export default function usePagamentos() {
	const movel = useMovelAtivo(),
		{ estadoUsuario } = useContext(ContextoUsuario),
		pagamentos = useApiHateoas<PagamentoInterface[]>(
			estadoUsuario.usuario.links,
			"lista_pagamentos"
		).data,
		[filtro, alterarFiltro] = useState("pago"),
		dadosFiltrados = useMemo(() => {
			return filtrarPagamentos(pagamentos || [], filtro);
		}, [pagamentos, filtro]),
		{ paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
			usePaginacao(dadosFiltrados, 3);

	function filtrarPagamentos(
		pagamentos: PagamentoInterface[],
		filtro: string
	): PagamentoInterface[] {
		return pagamentos.filter((item) => {
			return (
				(filtro === "pago" && item.status === PagamentoStatus.Pago) ||
				(filtro === "aguardando" &&
					item.status === PagamentoStatus.Aguardando_Transferencia)
			);
		});
	}

	function modificarFiltro(filtro: string) {
		alterarPaginaAtual(1);
		alterarFiltro(filtro);
	}

	return {
		dadosFiltrados,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		movel,
		filtro,
		modificarFiltro,
	};
}
