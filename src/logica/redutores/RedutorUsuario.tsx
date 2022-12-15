import React, { useEffect, useReducer } from "react";
import produce from "immer";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import {
	CidadeInterface,
	EnderecoInterface,
} from "logica/@tipos/EnderecoInterface";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import { ServicoAPIHateoas } from "logica/servicos/ServicoAPI";

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
	carregarObjeto?: unknown;
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
					acao.carregarObjeto as InterfaceDoUsuario;
				estadoRascunho.logando = false;
				break;
			case "SET_ADDRESS_LIST":
				estadoRascunho.listaDeEnderecos =
					acao.carregarObjeto as CidadeInterface[];
				break;
			case "SET_USER_ADDRESS":
				estadoRascunho.enderecoUsuario =
					acao.carregarObjeto as EnderecoInterface;
				break;
			case "SET_LOGGING":
				estadoRascunho.logando = acao.carregarObjeto as boolean;
				break;
		}
	});
	return proximoEstado;
};

export function useRedutorUsuario(): RedutorUsuarioInterface {
	const [estado, despacho] = useReducer(redutor, estadoInicial);

	useEffect(() => {
		pegarUsuario();
	}, [estado.usuario.id]);

	async function pegarUsuario() {
		try {
			despacho({ tipo: "SET_LOGGING", carregarObjeto: true });
			const usuario = await ServicoLogin.informacoes();
			if (usuario) {
				despacho({ tipo: "SET_USER", carregarObjeto: usuario });
				if (usuario.tipo_usuario === TipoDoUsuario.Diarista) {
					pegarEndereco(usuario);
					pegarListaDeCidades(usuario);
				}
			} else {
				despacho({ tipo: "SET_LOGGING", carregarObjeto: false });
			}
		} catch (erro) {}
	}

	async function pegarEndereco(usuario: InterfaceDoUsuario) {
		ServicoAPIHateoas(
			usuario.links,
			"listar_endereco",
			async (requisicao) => {
				try {
					const resposta = await requisicao();
					despacho({
						tipo: "SET_USER_ADDRESS",
						carregarObjeto: resposta.data,
					});
				} catch (erro) {}
			}
		);
	}

	async function pegarListaDeCidades(usuario: InterfaceDoUsuario) {
		ServicoAPIHateoas(
			usuario.links,
			"cidades_atendidas",
			async (requisicao) => {
				try {
					const resposta = await requisicao();
					despacho({
						tipo: "SET_ADDRESS_LIST",
						carregarObjeto: resposta.data,
					});
				} catch (erro) {}
			}
		);
	}

	return {
		estadoUsuario: estado,
		despachoUsuario: despacho,
	};
}
