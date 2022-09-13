import useSWR from "swr";
import { AxiosRequestConfig } from "axios";
import { ServiçoAPI } from "lógica/serviços/ServiçoAPI";

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
