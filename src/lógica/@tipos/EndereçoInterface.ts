export interface EndereçoInterface {
	id?: number;
	logradouro?: string;
	bairro: string;
	complemento: string;
	cep: string;
	cidade: string;
	estado: string;
	número: string;
	código_ibge?: number;
}

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
