import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { useRouter, NextRouter } from "next/router";
import { useEffect } from "react";

export const rotasPrivadas = [
	"/alterar-dados",
	"/diarias",
	"/pagamentos",
	"/oportunidades",
];

export const rotasAnonimas = [
	"/cadastro/diarista",
	"/login",
	"/recuperar-senha",
	"/",
];

export const rotasParaDiaristas = ["/pagamentos", "/oportunidades"];

export default function useRoteadorProtetor(
	usuario: InterfaceDoUsuario,
	logando: boolean
): NextRouter {
	const roteador = useRouter();
	const logado = usuario.nome_completo.length > 0;
	const diaristaSim = usuario.tipo_usuario === TipoDoUsuario.Diarista;

	useEffect(() => {
		tratarNavegacao(roteador.route);
		roteador.events.on("routeChangeStart", tratarNavegacao);
		return () => {
			roteador.events.off("routeChangeStart", tratarNavegacao);
		};
	}, [roteador, logado, logando]);

	function tratarNavegacao(url: string) {
		if (!logando) {
			if (rotasPrivadas.includes(url) && !logado) {
				roteador.replace("/login");
				return;
			}
			if (
				(rotasAnonimas.includes(url) && logado) ||
				(rotasParaDiaristas.includes(url) && !diaristaSim)
			) {
				roteador.replace(pegarHome());
				return;
			}
			if (url === "/encontrar-diarista" && diaristaSim) {
				roteador.replace("/");
				return;
			}
		}
	}

	function pegarHome(): string {
		if (!logado) {
			return "/";
		}
		return diaristaSim ? "/oportunidades" : "/diarias";
	}

	return roteador;
}
