import * as yup from "yup";
import { ServiçoData } from "./ServiçoData";
import { ServiçoPagamento } from "./ServiçoPagamento";
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
	novoContato() {
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
	pagamento() {
		return yup
			.object()
			.shape({
				pagamento: yup.object().shape({
					número_cartão: yup
						.string()
						.test(
							"verificar número do cartão",
							"Número de cartão inválido",
							(valor) => {
								return ServiçoPagamento.validar({
									card_number: valor as string,
									card_holder_name: "",
									card_cvv: "",
									card_expiration_date: "",
								}).card_number;
							}
						),
					nome_titular_cartão: yup.string(),
					validade: yup
						.string()
						.test(
							"verificar validade do cartão",
							"Data de validade inválida",
							(valor) => {
								return ServiçoPagamento.validar({
									card_number: "",
									card_holder_name: "",
									card_cvv: "",
									card_expiration_date: valor as string,
								}).card_expiration_date;
							}
						),
					código_cvv: yup
						.string()
						.test(
							"verificar código validador do cartão",
							"Código do cartão inválido",
							(valor) => {
								return ServiçoPagamento.validar({
									card_number: "",
									card_holder_name: "",
									card_cvv: valor as string,
									card_expiration_date: "",
								}).card_cvv;
							}
						),
				}),
			})
			.defined();
	},
};
