import React, { useReducer, useContext, useEffect } from "react";
import produce from "immer";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { useApiHateoas } from "logica/ganchos/useApi.hook";

export const estadoInicial = {
	diarias: [] as DiariaInterface[],
	buscando: true,
};

type EstadoInicialTipo = typeof estadoInicial;

type DiariaAcao = "ATUALIZAR_DIARIA" | "ATUALIZAR_BUSCANDO";

export type DiariaAcaoTipo = {
	tipo: DiariaAcao;
	carregarObjeto?: unknown;
};

export interface RedutorDiariaInterface {
	estadoDiaria: EstadoInicialTipo;
	despachoDiaria: React.Dispatch<DiariaAcaoTipo>;
}

const redutor = (
	estadoAtual: EstadoInicialTipo,
	acao: DiariaAcaoTipo
): EstadoInicialTipo => {
	const proximoEstado = produce(estadoAtual, (estadoRascunho) => {
		switch (acao.tipo) {
			case "ATUALIZAR_DIARIA":
				estadoRascunho.diarias =
					acao.carregarObjeto as DiariaInterface[];
				estadoRascunho.buscando = false;
				break;
			case "ATUALIZAR_BUSCANDO":
				estadoRascunho.buscando = acao.carregarObjeto as boolean;
				break;
		}
	});
	return proximoEstado;
};

export function useRedutorDiaria(): RedutorDiariaInterface {
	const [estado, despacho] = useReducer(redutor, estadoInicial),
		{ estadoUsuario } = useContext(ContextoUsuario),
		{ usuario } = estadoUsuario,
		diarias = useApiHateoas<DiariaInterface[]>(
			usuario.links,
			"lista_diarias"
		).data;

	useEffect(() => {
		if (diarias) {
			despacho({ tipo: "ATUALIZAR_DIARIA", carregarObjeto: diarias });
		}
	}, [diarias]);

	return {
		estadoDiaria: estado,
		despachoDiaria: despacho,
	};
}
