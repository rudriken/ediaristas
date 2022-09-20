import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiLinksInterface } from "lógica/@tipos/ApiLinksInterface";
import { LocalStorage } from "./ServicoArmazenamento";

const url = process.env.NEXT_PUBLIC_API;
console.log(process.env.NEXT_PUBLIC_ABC);

export const ServiçoAPI = axios.create({
	baseURL: url,
	headers: {
		"content-type": "application/json",
	},
});

ServiçoAPI.interceptors.response.use(
	(resposta) => resposta,
	(erro) => {
		if (
			erro.response.HTTP === 401 &&
			erro.response.data.código === "token_não_validado"
		) {
			lidarComAtualizacaoDoToken(erro);
		}
		return Promise.reject(erro);
	}
);

async function lidarComAtualizacaoDoToken(erro: {
	configuracao: AxiosRequestConfig;
}) {
	const tokenRefresh = LocalStorage.pegar<string>("token_refresh", "");
	if (tokenRefresh) {
		LocalStorage.apagar("token_refresh");
		LocalStorage.apagar("token");
		try {
			const {
				data,
			}: {
				data: {
					acesso: string;
					refresh: string;
					token_tipo: string;
					expira_em: number;
				};
			} = await ServiçoAPI.post("/autenticacao/token/atualizar", {
				refresh: tokenRefresh,
			});
			LocalStorage.gravar("token", data.acesso);
			LocalStorage.gravar("token_refresh", data.refresh);
			ServiçoAPI.defaults.headers.common.Authorization =
				"Bearer " + data.acesso;
			if (erro.configuracao.headers) {
				erro.configuracao.headers.Authorization =
					ServiçoAPI.defaults.headers.common.Authorization;
			}
			return ServiçoAPI(erro.configuracao);
		} catch (err) {
			return erro;
		}
	} else {
		return erro;
	}
}

export function linksResolver(
	links: ApiLinksInterface[] = [],
	nome: string
): ApiLinksInterface | undefined {
	return links.find((link) => link.rel === nome);
}
// ( . . . )
export function ServicoAPIHateoas(
	links: ApiLinksInterface[] = [],
	nome: string,
	aoPoderRequisitar: (
		requisicao: <T>(dado?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
	) => void,
	aoNaoPoderRequisitar?: Function
) {
	const requisicaoLinks = linksResolver(links, nome);
	if (requisicaoLinks) {
		aoPoderRequisitar(<T>(dado?: AxiosRequestConfig) => {
			return ServiçoAPI.request<T>({
				method: requisicaoLinks.type,
				url: requisicaoLinks.uri,
				...dado,
			});
		});
	} else {
		aoNaoPoderRequisitar?.();
	}
}
