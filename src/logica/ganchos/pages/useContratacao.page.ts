import { useState, useMemo, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServicoInterface } from "logica/@tipos/ServicoInterface";
import { ServicoEstruturaFormulario } from "../../servicos/ServicoEstruturaFormulario";
import {
	CadastroClienteFormularioDeDadosInterface,
	CartaoDadosInterface,
	CredenciaisInterface,
	LoginFormularioDeDadosInterface,
	NovaDiariaFormularioDeDadosInterface,
	PagamentoFormularioDeDadosInterface,
} from "logica/@tipos/FormularioInterface";
import { useApiHateoas } from "../useApi.hook";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { ServicoValidacao } from "logica/servicos/ServicoValidacao";
import { ServicoData } from "logica/servicos/ServicoData";
import { comodosDaCasa } from "@parciais/encontrar-diarista/_detalhes-servico";
import { ContextoServicosExternos } from "logica/contextos/ContextoServicosExternos";
import { linksResolver, ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import { ApiLinksInterface } from "logica/@tipos/ApiLinksInterface";
import { ServicoUsuario } from "logica/servicos/ServicoUsuario";
import { ServicoPagamento } from "logica/servicos/ServicoPagamento";

export default function useContratacao() {
	const [passo, alterarPasso] = useState(1),
		[temLogin, alterarTemLogin] = useState(true),
		[erroDeLogin, alterarErroDeLogin] = useState(""),
		migalhaDePaoItens = [
			"Detalhes da Diária",
			"Identificação",
			"Pagamento",
		],
		formularioServico = useForm<NovaDiariaFormularioDeDadosInterface>({
			resolver: yupResolver(
				ServicoEstruturaFormulario.endereco().concat(
					ServicoEstruturaFormulario.detalhesServico()
				)
			),
		}),
		formularioCliente = useForm<CadastroClienteFormularioDeDadosInterface>({
			resolver: yupResolver(
				ServicoEstruturaFormulario.dadosUsuario().concat(
					ServicoEstruturaFormulario.novoContato()
				)
			),
		}),
		formularioLogin = useForm<
			LoginFormularioDeDadosInterface<CredenciaisInterface>
		>({
			resolver: yupResolver(ServicoEstruturaFormulario.login()),
		}),
		formularioPagamento = useForm<
			PagamentoFormularioDeDadosInterface<CartaoDadosInterface>
		>({
			resolver: yupResolver(ServicoEstruturaFormulario.pagamento()),
		}),
		{ estadoUsuario, despachoUsuario } = useContext(ContextoUsuario),
		{ estadoServicosExternos } = useContext(ContextoServicosExternos),
		servicos = useApiHateoas<ServicoInterface[]>(
			estadoServicosExternos.servicosExternos,
			"listar_servicos"
		).data,
		dadosFaxina = formularioServico.watch("faxina"),
		cepFaxina = formularioServico.watch("endereco.cep"),
		[podemosAtender, alterarPodemosAtender] = useState(true),
		[novaDiaria, alterarNovaDiaria] = useState({} as DiariaInterface),
		tipoLimpeza = useMemo<ServicoInterface>(() => {
			if (servicos && dadosFaxina?.servico) {
				const servicoSelecionado = servicos.find(
					(servico) => servico.id === dadosFaxina?.servico
				);
				if (servicoSelecionado) {
					return servicoSelecionado;
				}
			}
			return {} as ServicoInterface;
		}, [servicos, dadosFaxina?.servico]),
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
			ServicoValidacao.verificarHora(dadosFaxina.hora_inicio) &&
			totalTempo >= 0
		) {
			formularioServico.setValue(
				"faxina.hora_termino",
				ServicoData.adicionarHoras(
					dadosFaxina.hora_inicio as string,
					totalTempo
				),
				{ shouldValidate: true }
			);
		} else {
			formularioServico.setValue("faxina.hora_termino", "");
		}
	}, [dadosFaxina?.hora_inicio, totalTempo]);

	useEffect(() => {
		const cep = ((cepFaxina as string) || "").replace(/\D/g, "");
		if (ServicoValidacao.verificarCEP(cep)) {
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

	function aoSubmeterFormularioServico(
		dados: NovaDiariaFormularioDeDadosInterface
	) {
		if (estadoUsuario.usuario.nome_completo) {
			criarDiaria(estadoUsuario.usuario);
		} else {
			alterarPasso(2);
		}
	}

	async function aoSubmeterFormularioCliente(
		dados: CadastroClienteFormularioDeDadosInterface
	) {
		const novoUsuarioLink = linksResolver(
			estadoServicosExternos.servicosExternos,
			"cadastrar_usuario"
		);
		if (novoUsuarioLink) {
			try {
				await cadastrarUsuario(dados, novoUsuarioLink);
			} catch (erro) {
				ServicoUsuario.tratarErroNovosUsuarios(erro, formularioCliente);
			}
		}
	}

	async function cadastrarUsuario(
		dados: CadastroClienteFormularioDeDadosInterface,
		link: ApiLinksInterface
	) {
		const novoUsuario = await ServicoUsuario.cadastrar(
			dados.usuario,
			TipoDoUsuario.Cliente,
			link
		);
		if (novoUsuario) {
			const loginSucesso = await login({
				email: dados.usuario.email,
				password: dados.usuario.password || "",
			});
			if (loginSucesso) {
				criarDiaria(novoUsuario);
			}
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
		usuario?: InterfaceDoUsuario
	): Promise<boolean> {
		const loginSucesso = await ServicoLogin.entrar(credenciais);
		if (loginSucesso) {
			if (!usuario) usuario = await ServicoLogin.informacoes();
			despachoUsuario({ tipo: "SET_USER", carregarObjeto: usuario });
		} else {
			alterarErroDeLogin("E-mail e/ou senha inválidos!");
		}
		return loginSucesso;
	}

	async function aoSubmeterFormularioPagamento(
		dados: PagamentoFormularioDeDadosInterface<CartaoDadosInterface>
	) {
		const cartao = {
			card_number: dados.pagamento.numero_cartao.replaceAll(" ", ""),
			card_holder_name: dados.pagamento.nome_cartao,
			card_cvv: dados.pagamento.codigo,
			card_expiration_date: dados.pagamento.validade,
		};
		const hash = await ServicoPagamento.pegarHash(cartao);
		ServicoAPIHateoas(
			novaDiaria.links,
			"pagar_diaria",
			async (requisicao) => {
				try {
					await requisicao({ data: { card_hash: hash } });
					alterarPasso(4);
				} catch (erro) {
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

	function listarComodos(dadosFaxina: DiariaInterface): string[] {
		const comodos: string[] = [];
		if (dadosFaxina) {
			comodosDaCasa.forEach((comodoDaCasa) => {
				const total = dadosFaxina[
					comodoDaCasa.nome as keyof DiariaInterface
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
		dadosFaxina: DiariaInterface,
		tipoLimpeza: ServicoInterface
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
		dadosFaxina: DiariaInterface,
		tipoLimpeza: ServicoInterface
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

	async function criarDiaria(usuario: InterfaceDoUsuario) {
		if (usuario.nome_completo) {
			const dadosDoServico = formularioServico.getValues();
			ServicoAPIHateoas(
				usuario.links,
				"cadastrar_diaria",
				async (requisicao) => {
					try {
						const novaDiaria = (
							await requisicao<DiariaInterface>({
								data: {
									...dadosDoServico.endereco,
									...dadosDoServico.faxina,
									cep: ServicoFormatadorDeTexto.pegarNumerosParaTexto(
										dadosDoServico.endereco.cep
									),
									preco: totalPreco,
									tempo_atendimento: totalTempo,
									data_atendimento:
										ServicoFormatadorDeTexto.reverterFormatoDeData(
											dadosDoServico.faxina
												.data_atendimento as string
										) +
										"T" +
										dadosDoServico.faxina.hora_inicio,
								},
							})
						).data;
						if (novaDiaria) {
							alterarPasso(3);
							alterarNovaDiaria(novaDiaria);
						}
					} catch (erro) {}
				}
			);
		}
	}

	return {
		passo,
		alterarPasso,
		migalhaDePaoItens,
		formularioServico,
		formularioCliente,
		formularioLogin,
		formularioPagamento,
		aoSubmeterFormularioServico,
		aoSubmeterFormularioCliente,
		aoSubmeterFormularioLogin,
		aoSubmeterFormularioPagamento,
		servicos,
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
