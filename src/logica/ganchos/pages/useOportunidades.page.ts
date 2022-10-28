import { Oportunidade } from "logica/@tipos/OportunidadeInterface";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { linksResolver, ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { useContext, useState } from "react";
import { mutate } from "swr";
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

	async function seCandidatar(oportunidade: Oportunidade) {
		ServicoAPIHateoas(
			oportunidade.links,
			"candidatar_diaria",
			async (requisicao) => {
				try {
					await requisicao();
					alterarMensagemFeedback("Candidatura enviada!");
					alterarOportunidadeSelecionada(undefined);
					atualizarListaDeOportunidades();
				} catch (erro) {}
			}
		);
	}

	function atualizarListaDeOportunidades() {
		/* mutate força a reexecução da requisição acima com string "lista_oportunidades" */
		mutate("lista_oportunidades");
		/* feito isso, o objeto 'oportunidades' é carregado com a nova lista de oportunidades
		 */
	}

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

	function podeCandidatar(oportunidade: Oportunidade) {
		return (
			linksResolver(oportunidade.links, "candidatar_diaria") !== undefined
		);
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
		podeCandidatar,
	};
}
