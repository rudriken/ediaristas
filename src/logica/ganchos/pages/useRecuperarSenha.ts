import { ContextoServicosExternos } from "logica/contextos/ContextoServicosExternos";
import { ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { useContext, useState } from "react";

export function useRecuperarSenha(token = "") {
	const { estadoServicosExternos } = useContext(ContextoServicosExternos),
		[email, alterarEmail] = useState(""),
		[senha, alterarSenha] = useState(""),
		[confirmacaoDaSenha, alterarConfirmacaoDaSenha] = useState(""),
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

	async function resetarSenha() {
		if (email.length < 8) {
			alterarMensagemFeedback("Digite um E-mail válido!");
			return;
		}
		if (senha.length < 8) {
			alterarMensagemFeedback("Senha muito curta!");
			return;
		}
		if (senha !== confirmacaoDaSenha) {
			alterarMensagemFeedback("As senhas estão diferentes!");
			return;
		}
		ServicoAPIHateoas(
			estadoServicosExternos.servicosExternos,
			"confirmar_alteracao_senha",
			async (requisicao) => {
				try {
					await requisicao({
						data: { token: token, email: email, senha: senha },
					});
					alterarMensagemFeedback("Senha resetada!");
				} catch (erro) {
					alterarMensagemFeedback("Erro ao resetar senha!");
				}
			}
		);
	}

	return {
		email,
		alterarEmail,
		senha,
		alterarSenha,
		confirmacaoDaSenha,
		alterarConfirmacaoDaSenha,
		pedirTokenRecuperacao,
		resetarSenha,
		mensagemFeedback,
		alterarMensagemFeedback,
	};
}
