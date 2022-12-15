import * as yup from "yup";
import { ServicoData } from "./ServicoData";
import { ServicoPagamento } from "./ServicoPagamento";
import { ServicoValidacao } from "./ServicoValidacao";

export const ServicoEstruturaFormulario = {
	dadosUsuario() {
		return yup
			.object()
			.shape({
				usuario: yup.object().shape({
					nome_completo: yup
						.string()
						.min(3, "Digite seu nome completo"),
					nascimento: yup
						.date()
						.transform(ServicoData.converterStringEmData)
						.min(
							ServicoData.dataDeNascimentoMaxima(),
							"Digite uma data válida"
						)
						.max(
							ServicoData.dataDeNascimentoMinima(),
							"Proibido menores de idade"
						)
						.typeError("Digite uma data válida"),
					cpf: yup
						.string()
						.test(
							"validar CPF",
							"CPF inválido",
							ServicoValidacao.verificarCPF
						),
					telefone: yup
						.string()
						.test(
							"validar telefone",
							"Telefone inválido",
							ServicoValidacao.verificarTelefone
						),
				}),
			})
			.defined();
	},
	endereco() {
		return yup
			.object()
			.shape({
				endereco: yup.object().shape({
					cep: yup
						.string()
						.test("validar CEP", "CEP inválido", (valor) =>
							ServicoValidacao.verificarCEP(valor)
						),
					estado: yup.string(),
					cidade: yup.string(),
					bairro: yup.string(),
					logradouro: yup.string(),
					numero: yup.string(),
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
				usuario: yup.object().shape({
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
	contato() {
		return yup
			.object()
			.shape({
				usuario: yup.object().shape({
					email: yup.string().email("E-mail inválido"),
					password: yup
						.string()
						.nullable()
						.default(undefined)
						.notRequired(),
					new_password: yup
						.string()
						.nullable()
						.default(undefined)
						.notRequired(),
					password_confirmation: yup
						.string()
						.nullable()
						.default(undefined)
						.notRequired()
						.oneOf(
							[yup.ref("new_password"), null],
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
								return ServicoPagamento.validar({
									card_number: valor as string,
									card_holder_name: "",
									card_cvv: "",
									card_expiration_date: "",
								}).card_number;
							}
						),
					nome_titular_cartao: yup.string(),
					validade: yup
						.string()
						.test(
							"verificar validade do cartão",
							"Data de validade inválida",
							(valor) => {
								return ServicoPagamento.validar({
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
								return ServicoPagamento.validar({
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
	detalhesServico() {
		return yup
			.object()
			.shape({
				faxina: yup.object().shape({
					data_atendimento: yup
						.date()
						.transform(ServicoData.converterStringEmData)
						.typeError("Digite uma data válida")
						.test(
							"verificar prazo mínimo para agendamento",
							"O agendamento deve ser feito com, pelo menos, " + 
							"48 horas de antecedência",
							(valor, dados) => {
								if (typeof valor === "object") {
									return ServicoValidacao.verificarPrazoMinimoParaAgendamento(
										valor.toJSON().substring(0, 10),
										dados.parent.hora_inicio as string
									);
								}
								return false;
							}
						),
					hora_inicio: yup
						.string()
						.test(
							"verificar hora",
							"Digite uma hora válida",
							(valor) => ServicoValidacao.verificarHora(valor)
						)
						.test(
							"verificar hora de início",
							"O serviço não pode começar antes das 06:00!",
							(valor) => {
								const [hora] = valor?.split(":") || [""];
								return +hora >= 6;
							}
						),
					hora_termino: yup
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
								const [horaTermino] = valor?.split(":") || [""];
								const [horaInicio] =
									dados.parent?.hora_inicio?.split(":") || [
										"",
									];
								return +horaTermino - +horaInicio <= 8;
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
