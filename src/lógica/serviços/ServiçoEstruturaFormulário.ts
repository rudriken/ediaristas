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
							"Digite uma data válida"
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
	endereço() {
		return yup
			.object()
			.shape({
				endereço: yup.object().shape({
					cep: yup
						.string()
						.test("validar CEP", "CEP inválido", (valor) =>
							ServiçoValidação.verificarCEP(valor)
						),
					estado: yup.string(),
					cidade: yup.string(),
					bairro: yup.string(),
					logradouro: yup.string(),
					número: yup.string(),
					complemento: yup
						.string()
						.nullable()
						.default(undefined)
						.notRequired(),
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
					numero_cartao: yup
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
					nome_cartao: yup.string(),
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
					codigo_cvv: yup
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
			.defined(); /* ( . . . ) */
	},
	detalhesServiço() {
		return yup
			.object()
			.shape({
				faxina: yup.object().shape({
					data_atendimento: yup
						.date()
						.transform(ServiçoData.converterStringEmData)
						.typeError("Digite uma data válida")
						.test(
							"verificar prazo mínimo para agendamento",
							"O agendamento deve ser feito com, pelo menos, 48 horas de antecedência",
							(valor, dados) => {
								if (typeof valor === "object") {
									return ServiçoValidação.verificarPrazoMínimoParaAgendamento(
										valor.toJSON().substring(0, 10),
										dados.parent.hora_início as string
									);
								}
								return false;
							}
						),
					hora_início: yup
						.string()
						.test(
							"verificar hora",
							"Digite uma hora válida",
							(valor) => ServiçoValidação.verificarHora(valor)
						)
						.test(
							"verificar hora de início",
							"O serviço não pode começar antes das 06:00!",
							(valor) => {
								const [hora] = valor?.split(":") || [""];
								return +hora >= 6;
							}
						),
					hora_término: yup
						.string()
						.test(
							"verificar hora de término",
							"O serviço não pode encerrar após as 22:00",
							(valor) => {
								const [hora, minuto] = valor?.split(":") || [
									"",
								];
								if (+hora < 22) {
									return true;
								} else if (+hora === 22) {
									return +minuto === 0;
								}
								return false;
							}
						)
						.test(
							"verificar duração do atendimento",
							"O serviço não pode ter mais que 8 horas de duração",
							(valor, dados) => {
								const [horaTérmino] = valor?.split(":") || [""];
								const [horaInício] =
									dados.parent?.hora_início?.split(":") || [
										"",
									];
								return +horaTérmino - +horaInício <= 8;
							}
						),
				}),
			})
			.defined();
	},
	login() {
		return yup.object().shape({
			login: yup.object().shape({
				email: yup.string().email("E-mail inválido"),
				password: yup.string().min(5, "Senha muito curta"),
			}),
		});
	},
};
