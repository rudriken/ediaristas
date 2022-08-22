import * as yup from "yup";
import { ServiçoData } from "./ServiçoData";
import { ServiçoValidação } from "./ServiçoValidação";

export const ServiçoEstruturaFormulário = {
	dadosUsuário() {
		return yup
			.object()
			.shape({
				usuário: yup.object().shape({
					nome_completo: yup
						.string()
						.min(3, "Digite seu nome completo"),
					nascimento: yup
						.date()
						.transform(ServiçoData.converterStringEmData)
						.min(
							ServiçoData.dataDeNascimentoMáxima(),
							"Digite uma data válida "
						)
						.max(
							ServiçoData.dataDeNascimentoMínima(),
							"Proibido menores de idade"
						)
						.typeError("Digite uma data válida"),
					cpf: yup
						.string()
						.test(
							"validar CPF",
							"CPF inválido",
							ServiçoValidação.verificarCPF
						),
					telefone: yup
						.string()
						.test(
							"validar telefone",
							"Telefone inválido",
							ServiçoValidação.verificarTelefone
						),
				}),
			})
			.defined();
	},
	novoCxntato() {
		return yup
			.object()
			.shape({
				usuário: yup.object().shape({
					email: yup.string().email("E-mail inválido"),
					password: yup.string().min(5, "Senha muito curta"),
					password_confirmation: yup
						.string()
						.min(5, "Senha muito curta")
						.oneOf(
							[yup.ref("password"), null],
							"As senhas não conferem"
						),
				}),
			})
			.defined();
	},
};
