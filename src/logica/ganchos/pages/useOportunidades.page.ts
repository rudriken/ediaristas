import { Oportunidade } from "logica/@tipos/OportunidadeInterface";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { useContext, useState } from "react";
import { useApiHateoas } from "../useApi.hook";
import useMovelAtivo from "../useMovelAtivo";
import usePaginacao from "../usePaginacao.hook";

export default function useOportunidadesTrabalho() {
	const movel = useMovelAtivo(),
		{ estadoUsuario } = useContext(ContextoUsuario),
		oportunidades =
			useApiHateoas<Oportunidade[]>(
				estadoUsuario.usuario.links,
				"lista_oportunidades"
			).data || ([] as Oportunidade[]),
		{ paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
			usePaginacao(oportunidades || [], 5),
		[oportunidadeSelecionada, alterarOportunidadeSelecionada] =
			useState<Oportunidade>(),
		[mensagemFeedback, alterarMensagemFeedback] = useState("teste");

	function seCandidatar(oportunidade: Oportunidade) {}

	function totalComodos(oportunidade: Oportunidade) {
		let total = 0;
		total += oportunidade.quantidade_quartos;
		total += oportunidade.quantidade_salas;
		total += oportunidade.quantidade_cozinhas;
		total += oportunidade.quantidade_banheiros;
		total += oportunidade.quantidade_quintais;
		total += oportunidade.quantidade_outros;
		return total;
	}

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
		totalComodos,
	};
}
