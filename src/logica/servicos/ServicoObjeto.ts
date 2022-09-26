export const ServicoObjeto = {
	jsonParaFormData(dados: any): FormData {
		const formData = new FormData();
		for (const chave in dados) {
			formData.append(chave, dados[chave]);
		}
		return formData;
	},
};
