export const ServiçoData = {
	dataDeNascimentoMínima(): Date {
		const data = new Date();
		data.setFullYear(data.getFullYear() - 18);
		return data;
	},
	dataDeNascimentoMáxima(): Date {
		const data = new Date();
		data.setFullYear(data.getFullYear() - 100);
		return data;
	},
	converterStringEmData(valor: any, valorOriginal: any): any {
		if (typeof valorOriginal === "string") {
			const [dia, mês, ano] = valorOriginal.split("/");
			if (+mês < 1 || +mês > 12) {
				return new Date("");
			}
			return new Date(+ano, +mês - 1, +dia);
		}
		return valor;
	},
};
