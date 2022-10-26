import { Oportunidade } from "logica/@tipos/OportunidadeInterface";
import useMovelAtivo from "../useMovelAtivo";
import usePaginacao from "../usePaginacao.hook";

export default function useOportunidadesTrabalho() {
	const movel = useMovelAtivo(),
		oportunidades = [] as Oportunidade[],
		{ paginaAtual, alterarPaginaAtual, totalPaginas, itensPorPagina } =
			usePaginacao(oportunidades || [], 5);
	return {
		movel,
		oportunidades,
		paginaAtual,
		alterarPaginaAtual,
		totalPaginas,
		itensPorPagina,
	};
}
