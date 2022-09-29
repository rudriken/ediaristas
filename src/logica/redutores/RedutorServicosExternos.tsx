import React, { useReducer, useEffect } from "react";
import produce from "immer";
import { ApiLinksInterface } from "logica/@tipos/ApiLinksInterface";
import { ServicoAPI } from "logica/servicos/ServicoAPI";

export const estadoInicial = {
	servicosExternos: [] as ApiLinksInterface[],
};

export type TipoDoEstadoInicial = typeof estadoInicial;

export type TipoDaAcaoDosServicosExternos = {
	tipo: string;
	carregarObjeto?: unknown;
};

export interface RedutorServicosExternosInterface {
	estadoServicosExternos: TipoDoEstadoInicial;
	despachoServicosExternos: React.Dispatch<TipoDaAcaoDosServicosExternos>;
}

const redutor = (
	estadoAtual: TipoDoEstadoInicial,
	acao: TipoDaAcaoDosServicosExternos
): TipoDoEstadoInicial => {
	const proximoEstado = produce(estadoAtual, (estadoRascunho) => {
		switch (acao.tipo) {
			case "UPDATE":
				estadoRascunho.servicosExternos =
					acao.carregarObjeto as ApiLinksInterface[];
				break;
		}
	});
	return proximoEstado;
};

export function useRedutorServicosExternos(): RedutorServicosExternosInterface {
	const [estado, despacho] = useReducer(redutor, estadoInicial);

	useEffect(() => {
		ServicoAPI.get<{ links: ApiLinksInterface[] }>("/api", {
			headers: { Authorization: "" },
		}).then(({ data }) => {
			despacho({
				tipo: "UPDATE",
				carregarObjeto: data.links,
			});
		});
	}, []);

	return {
		estadoServicosExternos: estado,
		despachoServicosExternos: despacho,
	};
}
