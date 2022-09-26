import { ApiLinksInterface } from "./ApiLinksInterface";

export interface InterfaceDoUsuario {
	id?: number;
	password_confirmation?: string;
	new_password?: string;
	links?: ApiLinksInterface[];
	tipo_usuario: TipoDoUsuario;
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

export interface InterfaceInformacaoCurtaDoUsuario {
	nome: string;
	foto_do_usuario?: string;
	reputacao?: number;
	cidade: string;
}

export enum TipoDoUsuario {
	Cliente = 1,
	Diarista = 2,
}
