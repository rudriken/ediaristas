import { useState, useMemo, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiçoInterface } from "lógica/@tipos/ServiçoInterface";
import { ServiçoEstruturaFormulário } from "../../serviços/ServiçoEstruturaFormulário";
import {
	CadastroClienteFormulárioDeDadosInterface,
	CredenciaisInterface,
	InformacoesDoCartaoInterface,
	LoginFormularioDeDadosInterface,
	NovaDiáriaFormulárioDeDadosInterface,
	PagamentoFormularioDeDadosInterface,
} from "lógica/@tipos/FormulárioInterface";
import { useApiHateoas } from "../useApi.hook";
import { DiáriaInterface } from "lógica/@tipos/DiáriaInterface";
import { ServiçoValidação } from "lógica/serviços/ServiçoValidação";
import { ServiçoData } from "lógica/serviços/ServiçoData";
import { cômodosDaCasa } from "@parciais/encontrar-diarista/_detalhes-servico";
import { ContextoServicosExternos } from "lógica/contextos/ContextoServicosExternos";
import { linksResolver, ServicoAPIHateoas } from "lógica/serviços/ServiçoAPI";
import { ContextoUsuario } from "lógica/contextos/ContextoUsuario";
import {
	InterfaceDoUsuário,
	TipoDoUsuário,
} from "lógica/@tipos/InterfaceDoUsuário";
import { ServicoFormatadorDeTexto } from "lógica/serviços/ServicoFormatadorDeTexto";
import { ServicoLogin } from "lógica/serviços/ServicoLogin";
import { ApiLinksInterface } from "lógica/@tipos/ApiLinksInterface";
import { ServicoUsuario } from "lógica/serviços/ServicoUsuario";
import { ServiçoPagamento } from "lógica/serviços/ServiçoPagamento";

export default function useContratacao() {
	const [passo, alterarPasso] = useState(1),
		[temLogin, alterarTemLogin] = useState(true),
		[erroDeLogin, alterarErroDeLogin] = useState(""),
		migalhaDePãoItens = [
			"Detalhes da Diária",
			"Identificação",
			"Pagamento",
		],
		formulárioServiço = useForm<NovaDiáriaFormulárioDeDadosInterface>({
			resolver: yupResolver(
				ServiçoEstruturaFormulário.endereço().concat(
					ServiçoEstruturaFormulário.detalhesServiço()
				)
			),
		}),
		formulárioCliente = useForm<CadastroClienteFormulárioDeDadosInterface>({
			resolver: yupResolver(
				ServiçoEstruturaFormulário.dadosUsuário().concat(
					ServiçoEstruturaFormulário.novoContato()
				)
			),
		}),
		formularioLogin = useForm<
			LoginFormularioDeDadosInterface<CredenciaisInterface>
		>({
			resolver: yupResolver(ServiçoEstruturaFormulário.login()),
		}),
		formularioPagamento = useForm<
			PagamentoFormularioDeDadosInterface<InformacoesDoCartaoInterface>
		>({
			resolver: yupResolver(ServiçoEstruturaFormulário.pagamento()),
		}),
		{ estadoUsuario, despachoUsuario } = useContext(ContextoUsuario),
		{ estadoServicosExternos } = useContext(ContextoServicosExternos),
		serviços = useApiHateoas<ServiçoInterface[]>(
			estadoServicosExternos.servicosExternos,
			"listar_servicos"
		).data,
		dadosFaxina = formulárioServiço.watch("faxina"),
		cepFaxina = formulárioServiço.watch("endereço.cep"),
		[podemosAtender, alterarPodemosAtender] = useState(true),
		[novaDiaria, alterarNovaDiaria] = useState({} as DiáriaInterface),
		tipoLimpeza = useMemo<ServiçoInterface>(() => {
			if (serviços && dadosFaxina?.servico) {
				const servicoSelecionado = serviços.find(
					(servico) => servico.id === dadosFaxina?.servico
				);
				if (servicoSelecionado) {
					return servicoSelecionado;
				}
			}
			return {} as ServiçoInterface;
		}, [serviços, dadosFaxina?.servico]),
		{ tamanhoCasa, totalPreco, totalTempo } = useMemo<{
			tamanhoCasa: string[];
			totalPreco: number;
			totalTempo: number;
		}>(() => {
			return {
				tamanhoCasa: listarComodos(dadosFaxina),
				totalPreco: calcularPreco(dadosFaxina, tipoLimpeza),
				totalTempo: calcularTempoServico(dadosFaxina, tipoLimpeza),
			};
		}, [
			tipoLimpeza,
			dadosFaxina,
			dadosFaxina?.quantidade_quartos,
			dadosFaxina?.quantidade_salas,
			dadosFaxina?.quantidade_banheiros,
			dadosFaxina?.quantidade_cozinhas,
			dadosFaxina?.quantidade_quintais,
			dadosFaxina?.quantidade_outros,
		]);

	useEffect(() => {
		if (
			dadosFaxina &&
			ServiçoValidação.verificarHora(dadosFaxina.hora_início) &&
			totalTempo >= 0
		) {
			formulárioServiço.setValue(
				"faxina.hora_término",
				ServiçoData.adicionarHoras(
					dadosFaxina.hora_início as string,
					totalTempo
				),
				{ shouldValidate: true }
			);
		} else {
			formulárioServiço.setValue("faxina.hora_término", "");
		}
	}, [dadosFaxina?.hora_início, totalTempo]);

	useEffect(() => {
		const cep = ((cepFaxina as string) || "").replace(/\D/g, "");
		if (ServiçoValidação.verificarCEP(cep)) {
			ServicoAPIHateoas(
				estadoServicosExternos.servicosExternos,
				"verificar_disponibilidade_atendimento",
				(requisicao) => {
					requisicao<{ disponibilidade: boolean }>({
						params: {
							cep: cep,
						},
					})
						.then((resposta) => {
							alterarPodemosAtender(
								resposta.data.disponibilidade
							);
						})
						.catch((_erro) => alterarPodemosAtender(false));
				}
			);
		} else {
			alterarPodemosAtender(true);
		}
	}, [cepFaxina]);

	function aoSubmeterFormulárioServiço(
		dados: NovaDiáriaFormulárioDeDadosInterface
	) {
		if (estadoUsuario.usuario.nome_completo) {
			criarDiaria(estadoUsuario.usuario);
			console.log(estadoUsuario);
		} else {
			alterarPasso(2);
			console.log(dados);
		}
	}

	async function aoSubmeterFormulárioCliente(
		dados: CadastroClienteFormulárioDeDadosInterface
	) {
		// console.log("Estou chegando até a submissão do formulário do cliente");
		const novoUsuarioLink = linksResolver(
			estadoServicosExternos.servicosExternos,
			"cadastrar_usuario"
		);
		if (novoUsuarioLink) {
			console.log(novoUsuarioLink);
			try {
				await cadastrarUsuario(dados, novoUsuarioLink);
				console.log(dados, novoUsuarioLink);
			} catch (erro) {
				ServicoUsuario.tratarErroNovosUsuarios(erro, formulárioCliente);
				console.log("ERROU");
			}
		}
	}

	async function cadastrarUsuario(
		dados: CadastroClienteFormulárioDeDadosInterface,
		link: ApiLinksInterface
	) {
		console.log("dados: ", dados);
		const novoUsuario = await ServicoUsuario.cadastrar(
			dados.usuário,
			TipoDoUsuário.Cliente,
			link
		);
		console.log("novoUsuario:", novoUsuario);
		if (novoUsuario) {
			const loginSucesso = await login(
				{
					email: dados.usuário.email,
					password: dados.usuário.password || "",
				},
				novoUsuario
			);
			if (loginSucesso) {
				criarDiaria(novoUsuario);
				alterarPasso(3);
			}
		} else {
			console.log("dancei");
		}
	}

	async function aoSubmeterFormularioLogin(
		dados: LoginFormularioDeDadosInterface<CredenciaisInterface>
	) {
		const loginSucesso = await login(dados.login);
		if (loginSucesso) {
			const usuario = await ServicoLogin.informacoes();
			if (usuario) {
				criarDiaria(usuario);
				alterarPasso(3);
			}
		}
	}

	async function login(
		credenciais: CredenciaisInterface,
		usuario?: InterfaceDoUsuário
	): Promise<boolean> {
		const loginSucesso = await ServicoLogin.entrar(credenciais);
		if (loginSucesso) {
			if (!usuario) usuario = await ServicoLogin.informacoes();
			despachoUsuario({ tipo: "SET_USER", carregarPagamento: usuario });
		} else {
			alterarErroDeLogin("E-mail e/ou senha inválidos!");
		}
		return loginSucesso;
	}

	async function aoSubmeterFormularioPagamento(
		dados: PagamentoFormularioDeDadosInterface<InformacoesDoCartaoInterface>
	) {
		const cartao = {
			card_number: dados.pagamento.numero_cartao.replaceAll(" ", ""),
			card_holder_name: dados.pagamento.nome_cartao,
			card_cvv: dados.pagamento.codigo_cvv,
			card_expiration_date: dados.pagamento.validade,
		};
		const hash = await ServiçoPagamento.pegarHash(cartao);
		console.log(hash);
		console.log(novaDiaria.hora_início);
		ServicoAPIHateoas(
			novaDiaria.links,
			"pagar_diaria",
			async (requisicao) => {
				try {
					await requisicao({
						data: {
							card_hash: hash,
						},
					});
					alterarPasso(4);
				} catch (erro) {
					console.log("erro no pagamento");
					formularioPagamento.setError(
						"pagamento.pagamento_recusado",
						{
							type: "manual",
							message: "Pagamento recusado",
						}
					);
				}
			}
		);
	}

	function listarComodos(dadosFaxina: DiáriaInterface): string[] {
		const comodos: string[] = [];
		if (dadosFaxina) {
			cômodosDaCasa.forEach((comodoDaCasa) => {
				const total = dadosFaxina[
					comodoDaCasa.nome as keyof DiáriaInterface
				] as number;
				if (total > 0) {
					const nome =
						total > 1 ? comodoDaCasa.plural : comodoDaCasa.singular;
					comodos.push(`${total} ${nome}`);
				}
			});
		}
		return comodos;
	}

	function calcularTempoServico(
		dadosFaxina: DiáriaInterface,
		tipoLimpeza: ServiçoInterface
	) {
		let total = 0;
		if (dadosFaxina && tipoLimpeza) {
			total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
			total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
			total +=
				tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
			total +=
				tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
			total +=
				tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
			total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
		}
		return total;
	}

	function calcularPreco(
		dadosFaxina: DiáriaInterface,
		tipoLimpeza: ServiçoInterface
	) {
		let total = 0;
		if (dadosFaxina && tipoLimpeza) {
			total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
			total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
			total +=
				tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
			total +=
				tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
			total +=
				tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
			total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
		}
		return Math.max(total, tipoLimpeza.valor_minimo);
	}

	async function criarDiaria(usuario: InterfaceDoUsuário) {
		if (usuario.nome_completo) {
			const dadosDoServico = formulárioServiço.getValues();
			console.log(dadosDoServico);
			ServicoAPIHateoas(
				usuario.links,
				"cadastrar diária",
				async (requisicao) => {
					console.log("entrou no ServicoAPIHateoas");
					console.log("usuario.links: ", usuario.links);
					try {
						const novaDiaria = (
							await requisicao<DiáriaInterface>({
								data: {
									...dadosDoServico.endereço,
									...dadosDoServico.faxina,
									cep: ServicoFormatadorDeTexto.pegarNumerosParaTexto(
										dadosDoServico.endereço.cep
									),
									preco: totalPreco,
									tempo_atendimento: totalTempo,
									data_atendimento:
										ServicoFormatadorDeTexto.reverterFormatoDeData(
											dadosDoServico.faxina
												.data_atendimento as string
										) +
										"T" +
										dadosDoServico.faxina.hora_início,
								},
							})
						).data;
						console.log(novaDiaria);
						if (novaDiaria) {
							alterarPasso(3);
							alterarNovaDiaria(novaDiaria);
							console.log("criou uma nova diária: ", novaDiaria);
						} else {
							console.log("NÃO criou uma nova diária: ", novaDiaria);
						}
					} catch (erro) {
						console.log("criar novaDiaria: ERRO", erro);
					}
				}
			);
		}
	}

	return {
		passo,
		alterarPasso,
		migalhaDePãoItens,
		formulárioServiço,
		formulárioCliente,
		formularioLogin,
		formularioPagamento,
		aoSubmeterFormulárioServiço,
		aoSubmeterFormulárioCliente,
		aoSubmeterFormularioLogin,
		aoSubmeterFormularioPagamento,
		serviços,
		podemosAtender,
		temLogin,
		tipoLimpeza,
		totalPreco,
		tamanhoCasa,
		erroDeLogin,
		alterarTemLogin,
		alterarErroDeLogin,
	};
}
