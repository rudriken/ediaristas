import { ApiLinksInterface } from "./ApiLinksInterface";
import { AvaliacaoUsuarioInterface } from "./AvaliacaoUsuarioInterface";
import { InterfaceDoUsuario } from "./InterfaceDoUsuario";

export interface Oportunidade {
	id?: number;
	data_atendimento: string | Date;
	tempo_atendimento: number;
	status: number;
	preco: number;
	valor_comissao: number;
	logradouro: string;
	numero: string;
	complemento?: string;
	bairro: string;
	cidade: string;
	estado: string;
	codigo_ibge: number;
	cep: string;
	quantidade_quartos: number;
	quantidade_salas: number;
	quantidade_cozinhas: number;
	quantidade_banheiros: number;
	quantidade_quintais: number;
	quantidade_outros: number;
	observacoes?: string;
	motivo_cancelamento?: string;
	cliente: InterfaceDoUsuario;
	diarista?: InterfaceDoUsuario;
	servico: number;
	created_at?: Date;
	updated_at?: Date;
	nome_servico: string;
	candidatos?: Array<number>;
	avaliacoes_cliente: Array<AvaliacaoUsuarioInterface>;
	links: Array<ApiLinksInterface> /* ou ApiLinksInterface[] */;
}
