const FormatadorDeMoeda = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export const ServicoFormatadorDeTexto = {
	reverterFormatoDeData(data: string): string {
		if (data.includes("/")) {
			return data.split("/").reverse().join("-");
			/* entrada: "DD/MM/AAAA"
			 * virá do campo do formulário
			 * saída:"AAAA-MM-DD"
			 */
		}
		if (data.includes("T")) {
			[data] = data.split("T");
			/* entrada: "AAAA-MM-DDThh:mm:ssZ"
			 * virá do banco de dados
			 * saída:"DD/MM/AAAA"
			 */
		}
		return data.split("-").reverse().join("/");
	},
	dataParaString(data: Date, comHorario = false): string {
		const tempo = data.toISOString();
		if (comHorario) {
			return tempo.substring(0, 19);
		}
		return tempo.substring(0, 10);
	},
	pegarNumerosParaTexto(texto = ""): string {
		return texto.replace(/\D/g, "");
	},
	formatarMoeda(preco = 0): string {
		if (isNaN(preco)) {
			preco = 0;
		}
		return FormatadorDeMoeda.format(preco);
	},
};
