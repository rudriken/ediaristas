export interface EstadoInterface {
	nome: string;
	sigla: string;
}

export interface CidadeInterface {
	código_ibge: number;
	cidade: string;
}

export interface CepResposta {
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
	cep: string;
	ibge: number;
	complemento: string;
}
