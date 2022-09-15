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
	formatarMoeda(preco = 0): string {
		if (isNaN(preco)) {
			preco = 0;
		}
		return FormatadorDeMoeda.format(preco);
	}
};
