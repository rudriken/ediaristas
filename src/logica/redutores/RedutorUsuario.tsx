import React, { useReducer } from "react";
import produce from "immer";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import {
	CidadeInterface,
	EnderecoInterface,
} from "logica/@tipos/EnderecoInterface";

export const estadoInicial = {
	usuario: {
		nome_completo: "",
		nascimento: "",
		cpf: "",
		email: "",
		foto_usuario: "",
		telefone: "",
		tipo_usuario: TipoDoUsuario.Cliente,
		reputacao: 0,
		chave_pix: "",
	} as InterfaceDoUsuario,
	listaDeEnderecos: [] as CidadeInterface[],
	enderecoUsuario: {
		logradouro: "",
		bairro: "",
		complemento: "",
		cep: "",
		cidade: "",
		estado: "",
		numero: "",
	} as EnderecoInterface,
	logando: false,
};

export type TipoDoEstadoInicial = typeof estadoInicial;

type AcoesUsuario =
	| "SET_USER"
	| "SET_LOGGING"
	| "SET_ADDRESS_LIST"
	| "SET_USER_ADDRESS";

export type TipoDaAcaoDoUsuario = {
	tipo: AcoesUsuario;
	carregarPagamento?: unknown;
};

export interface RedutorUsuarioInterface {
	estadoUsuario: TipoDoEstadoInicial;
	despachoUsuario: React.Dispatch<TipoDaAcaoDoUsuario>;
}

const redutor = (
	estadoAtual: TipoDoEstadoInicial,
	acao: TipoDaAcaoDoUsuario
): TipoDoEstadoInicial => {
	const proximoEstado = produce(estadoAtual, (estadoRascunho) => {
		switch (acao.tipo) {
			case "SET_USER":
				estadoRascunho.usuario =
					acao.carregarPagamento as InterfaceDoUsuario;
				estadoRascunho.logando = false;
				break;
			case "SET_ADDRESS_LIST":
				estadoRascunho.listaDeEnderecos =
					acao.carregarPagamento as CidadeInterface[];
				break;
			case "SET_USER_ADDRESS":
				estadoRascunho.enderecoUsuario =
					acao.carregarPagamento as EnderecoInterface;
				break;
			case "SET_LOGGING":
				estadoRascunho.logando = acao.carregarPagamento as boolean;
				break;
		}
	});
	return proximoEstado;
};

export function useRedutorUsuario(): RedutorUsuarioInterface {
	const [estado, despacho] = useReducer(redutor, estadoInicial);

	return {
		estadoUsuario: estado,
		despachoUsuario: despacho,
	};
}
