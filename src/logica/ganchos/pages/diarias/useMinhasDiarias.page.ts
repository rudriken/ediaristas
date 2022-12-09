import { useContext, useMemo, useState } from "react";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import usePaginacao from "logica/ganchos/usePaginacao.hook";
import { ContextoDiaria } from "logica/contextos/ContextoDiarias";
import { DiariaInterface, DiariaStatus } from "logica/@tipos/DiariaInterface";
import { linksResolver, ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { mutate } from "swr";

export default function useMinhasDiarias() {
	const movel = useMovelAtivo(),
		{ estadoDiaria } = useContext(ContextoDiaria),
		{ diarias } = estadoDiaria,
		[filtro, alterarFiltro] = useState("pendentes"),
		dadosFiltrados = useMemo(() => {
			return filtrarDiarias(diarias, filtro);
		}, [diarias, filtro]),
		{ paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
			usePaginacao(dadosFiltrados, 3),
		[diariaConfirmar, alterarDiariaConfirmar] = useState(
			{} as DiariaInterface
		),
		[diariaAvaliar, alterarDiariaAvaliar] = useState({} as DiariaInterface),
		[diariaCancelar, alterarDiariaCancelar] = useState(
			{} as DiariaInterface
		);

	function podeVisualizar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "self") !== undefined;
	}

	function podeConfirmar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "confirmar_diarista") !== undefined;
	}

	function podeAvaliar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "avaliar_diaria") !== undefined;
	}

	function podeCancelar(diaria: DiariaInterface): boolean {
		return linksResolver(diaria.links, "cancelar_diaria") !== undefined;
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

	async function avaliarDiaria(
		diaria: DiariaInterface,
		avaliacao: { descricao: string; nota: number }
	) {
		ServicoAPIHateoas(
			diaria.links,
			"avaliar_diaria",
			async (requisicao) => {
				try {
					await requisicao({ data: avaliacao });
					alterarDiariaAvaliar({} as DiariaInterface);
					atualizarDiarias();
				} catch (erro) {}
			}
		);
	}

	async function cancelarDiaria(diaria: DiariaInterface, motivo: string) {
		ServicoAPIHateoas(
			diaria.links,
			"cancelar_diaria",
			async (requisicao) => {
				try {
					await requisicao({ data: { motivo_cancelamento: motivo } });
					alterarDiariaCancelar({} as DiariaInterface);
					atualizarDiarias();
				} catch (erro) {}
			}
		);
	}

	function atualizarDiarias() {
		mutate("lista_diarias");
	}

	function filtrarDiarias(diarias: DiariaInterface[], filtro: string): DiariaInterface[] {
		return diarias.filter((item) => {
			const avaliada = [
				DiariaStatus.AVALIADO
			].includes(item.status as DiariaStatus);
			const cancelada = [
				DiariaStatus.CANCELADO,
				DiariaStatus.SEM_PAGAMENTO,
			].includes(item.status as DiariaStatus);
			const pendente = [
				DiariaStatus.PAGO,
				DiariaStatus.CONFIRMADO,
				DiariaStatus.CONCLUIDO,
			].includes(item.status as DiariaStatus);

			return (
				(avaliada && filtro === "avaliadas") ||
				(cancelada && filtro === "canceladas") ||
				(pendente && filtro === "pendentes")
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
		podeVisualizar,
		diariaConfirmar,
		alterarDiariaConfirmar,
		podeConfirmar,
		confirmarDiaria,
		diariaAvaliar,
		alterarDiariaAvaliar,
		podeAvaliar,
		avaliarDiaria,
		podeCancelar,
		diariaCancelar,
		alterarDiariaCancelar,
		cancelarDiaria,
		filtro,
		modificarFiltro,
	};
}
