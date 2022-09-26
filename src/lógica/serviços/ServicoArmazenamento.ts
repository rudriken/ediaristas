const ArmazenamentoBase = {
	pegar<T>(
		armazenamento: Storage,
		chave: string,
		valorPadrao: T
	): T | string {
		const valor = armazenamento.getItem(chave);
		if (valor === null) {
			return valorPadrao;
		}
		try {
			return JSON.parse(valor);
		} catch (erro) {
			return valor;
		}
	},
	gravar<T>(armazenamento: Storage, chave: string, valor: T) {
		if (typeof valor !== "string") {
			armazenamento.setItem(chave, JSON.stringify(valor));
		} else {
			armazenamento.setItem(chave, valor);
		}
	},
	apagar(armazenamento: Storage, chave: string) {
		armazenamento.removeItem(chave);
	},
	apagarTudo(armazenamento: Storage) {
		armazenamento.clear();
	},
};

export const LocalStorage = {
	pegar<T>(chave: string, valorPadrao: T): T | string {
		return ArmazenamentoBase.pegar(localStorage, chave, valorPadrao);
	},
	gravar<T>(chave: string, valor: T) {
		ArmazenamentoBase.gravar(localStorage, chave, valor);
	},
	apagar(chave: string) {
		ArmazenamentoBase.apagar(localStorage, chave);
	},
	apagarTudo() {
		ArmazenamentoBase.apagarTudo(localStorage);
	},
};

export const SessionStorage = {
	pegar<T>(chave: string, valorPadrao: T): T | string {
		return ArmazenamentoBase.pegar(sessionStorage, chave, valorPadrao);
	},
	gravar<T>(chave: string, valor: T) {
		ArmazenamentoBase.gravar(sessionStorage, chave, valor);
	},
	apagar(chave: string) {
		ArmazenamentoBase.apagar(sessionStorage, chave);
	},
	apagarTudo() {
		ArmazenamentoBase.apagarTudo(sessionStorage);
	},
};
