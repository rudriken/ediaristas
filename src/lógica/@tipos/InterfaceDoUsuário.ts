import { ApiLinksInterface } from "./ApiLinksInterface";

export interface InterfaceDoUsuário {
	id?: number;
	password_confirmation?: string;
	new_password?: string;
	links?: ApiLinksInterface[];
	tipo_usuario: TipoDoUsuário;
	password?: string;
	last_login?: Date;
	nome_completo: string;
	cpf: string;
	nascimento: string | Date;
	email: string;
	foto_usuario?: string;
	foto_documento?: string;
	telefone?: string;
	reputacao?: number;
	chave_pix: string;
	token?: {
		acesso: string;
		refresh: string;
	};
}

export interface InterfaceInformaçãoCurtaDoUsuário {
	nome_completo: string;
	foto_usuario?: string;
	reputacao?: number;
	cidade: string;
}

export enum TipoDoUsuário {
	Cliente = 1,
	Diarista = 2,
}
