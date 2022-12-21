import { ContextoServicosExternos } from "logica/contextos/ContextoServicosExternos";
import { ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { useContext, useState } from "react";

export function useRecuperarSenha() {
	const { estadoServicosExternos } = useContext(ContextoServicosExternos),
		[email, alterarEmail] = useState(""),
		[mensagemFeedback, alterarMensagemFeedback] = useState("");

	async function pedirTokenRecuperacao() {
		if (email.length > 8) {
			ServicoAPIHateoas(
				estadoServicosExternos.servicosExternos,
				"solicitar_alteracao_senha",
				async (requisicao) => {
					requisicao({ data: { email: email } });
					alterarMensagemFeedback(
						"Uma mensagem foi enviada para o seu E-mail " +
							"para a recuperação de senha."
					);
				}
			);
		} else {
			alterarMensagemFeedback("Digite um E-mail válido!");
		}
	}

	return {
		email,
		alterarEmail,
		pedirTokenRecuperacao,
		mensagemFeedback,
		alterarMensagemFeedback,
	};
}
