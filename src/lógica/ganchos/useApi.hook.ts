import useSWR, { mutate } from "swr";
import { AxiosRequestConfig } from "axios";
import { ServicoAPIHateoas, ServiçoAPI } from "lógica/serviços/ServiçoAPI";
import { ApiLinksInterface } from "lógica/@tipos/ApiLinksInterface";
import { useEffect, useCallback } from "react";

export default function useApi<SaidaGenerica>(
	pontoFinal: string | null,
	configuracao?: AxiosRequestConfig
): { data: SaidaGenerica | undefined; error: Error } {
	const { data, error } = useSWR<SaidaGenerica>(
		pontoFinal,
		async (urlFinal) => {
			const resposta = await ServiçoAPI(urlFinal, configuracao);
			return resposta.data;
		}
	);

	return { data, error };
}

export function useApiHateoas<SaidaGenerica>(
	links: ApiLinksInterface[] = [],
	nome: string | null,
	configuracao?: AxiosRequestConfig
): { data: SaidaGenerica | undefined; error: Error } {
	const montarRequisicao = useCallback(() => {
		return new Promise<SaidaGenerica>((sucesso) => {
			ServicoAPIHateoas(links, nome || "", async (requisicao) => {
				const resposta = await requisicao<SaidaGenerica>(configuracao);
				sucesso(resposta.data);
			});
		});
	}, [links, nome, configuracao]);

	const { data, error } = useSWR<SaidaGenerica>(nome, montarRequisicao);

	useEffect(() => {
		mutate(nome, montarRequisicao);
	}, [links, nome, montarRequisicao]);

	return { data, error };
}
