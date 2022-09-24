import { CredenciaisInterface } from "lógica/@tipos/FormulárioInterface";
import { InterfaceDoUsuário } from "lógica/@tipos/InterfaceDoUsuário";
import { LocalStorage } from "./ServicoArmazenamento";
import { ServiçoAPI } from "./ServiçoAPI";

export const ServicoLogin = {
	async entrar(
		credenciais: CredenciaisInterface
	): Promise<boolean> {
		try {
			const { data } = await ServiçoAPI.post<{
				acesso: string;
				refresh: string;
				token_tipo: string;
				expira_em: number;
			}>("/autenticacao/token/", credenciais);
			LocalStorage.gravar("token", data.acesso);
			LocalStorage.gravar("token_refresh", data.refresh);
			ServiçoAPI.defaults.headers.common["Authorization"] =
				"Bearer " + data.acesso;
			return true;
		} catch (erro) {
			return false;
		}
	},
	sair() {
		ServiçoAPI.post("/autenticacao/logout", {
			refresh: LocalStorage.pegar("token_refresh", ""),
		});
		LocalStorage.apagar("token");
		LocalStorage.apagar("token_refresh");
	},
	async informacoes(): Promise<InterfaceDoUsuário | undefined> {
		const token = LocalStorage.pegar("token", "");
		if (token) {
			ServiçoAPI.defaults.headers.common.Authorization =
				"Bearer " + token;
			return (await ServiçoAPI.get<InterfaceDoUsuário>("/api/eu")).data;
		}
		return undefined;
	},
};
