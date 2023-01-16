import { CredenciaisInterface } from "logica/@tipos/FormularioInterface";
import { InterfaceDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import { LocalStorage } from "./ServicoArmazenamento";
import { ServicoAPI } from "./ServicoAPI";

export const ServicoLogin = {
	async entrar(credenciais: CredenciaisInterface): Promise<boolean> {
		try {
			const { data } = await ServicoAPI.post<{
				acesso: string;
				refresh: string;
				token_tipo: string;
				expira_em: number;
			}>("/autenticacao/token", credenciais);
			LocalStorage.gravar("token", data.acesso);
			LocalStorage.gravar("token_refresh", data.refresh);
			ServicoAPI.defaults.headers.common["Authorization"] =
				"Bearer " + data.acesso;
			return true;
		} catch (erro) {
			return false;
		}
	},
	sair() {
		ServicoAPI.post("/autenticacao/logout", {
			refresh: LocalStorage.pegar("token_refresh", ""),
		});
		LocalStorage.apagar("token");
		LocalStorage.apagar("token_refresh");
	},
	async informacoes(): Promise<InterfaceDoUsuario | undefined> {
		const token = LocalStorage.pegar("token", "");
		if (token) {
			ServicoAPI.defaults.headers.common.Authorization =
				"Bearer " + token;
			return (await ServicoAPI.get<InterfaceDoUsuario>("/api/eu")).data;
		}
		return undefined;
	},
};
