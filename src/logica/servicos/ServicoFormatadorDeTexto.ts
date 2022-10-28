import { EnderecoInterface } from "logica/@tipos/EnderecoInterface";

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
	pegarEndereco(endereco: EnderecoInterface): string {
		let enderecoFormatado = "";
		enderecoFormatado += endereco.logradouro
			? `${endereco.logradouro}, `
			: "";
		enderecoFormatado += endereco.numero ? `${endereco.numero} - ` : "";
		enderecoFormatado += endereco.bairro ? `${endereco.bairro}, ` : "";
		enderecoFormatado += endereco.cidade ? `${endereco.cidade} - ` : "";
		enderecoFormatado += endereco.estado ? `${endereco.estado}` : "";

		return enderecoFormatado;
	},
	formatarTelefone(telefone: string): string {
		const combinacao = telefone.match(/^(\d{2})(\d{5})(\d{4})/);
		if (combinacao) {
			const [_, ddd, n1, n2] = combinacao;
			return `(${ddd}) ${n1}-${n2}`;
		}
		return telefone;
	},
	pegarDataEHora(data = ""): string {
		const dia = ServicoFormatadorDeTexto.reverterFormatoDeData(data),
			hora = data.substring(11, 16);
		return `${dia} às ${hora}`;
	},
};
