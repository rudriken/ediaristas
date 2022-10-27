import { Oportunidade } from "logica/@tipos/OportunidadeInterface";
import { useState } from "react";
import useMovelAtivo from "../useMovelAtivo";
import usePaginacao from "../usePaginacao.hook";

export default function useOportunidadesTrabalho() {
	const movel = useMovelAtivo(),
		oportunidades = [] as Oportunidade[],
		{ paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
			usePaginacao(oportunidades || [], 5),
		[oportunidadeSelecionada, alterarOportunidadeSelecionada] =
			useState<Oportunidade>(),
		[mensagemFeedback, alterarMensagemFeedback] = useState("teste");

	function seCandidatar(oportunidade: Oportunidade) {}

	return {
		movel,
		oportunidades,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
		oportunidadeSelecionada,
		alterarOportunidadeSelecionada,
		seCandidatar,
		mensagemFeedback,
		alterarMensagemFeedback,
	};
}
