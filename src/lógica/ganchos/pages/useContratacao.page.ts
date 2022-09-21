import { useState, useMemo, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiçoInterface } from "lógica/@tipos/ServiçoInterface";
import { ServiçoEstruturaFormulário } from "../../serviços/ServiçoEstruturaFormulário";
import {
	CadastroClienteFormulárioDeDadosInterface,
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
import { ServicoAPIHateoas } from "lógica/serviços/ServiçoAPI";
import { ContextoUsuario } from "lógica/contextos/ContextoUsuario";
import { InterfaceDoUsuário } from "lógica/@tipos/InterfaceDoUsuário";
import { ServicoFormatadorDeTexto } from "lógica/serviços/ServicoFormatadorDeTexto";

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
		formularioLogin = useForm<LoginFormularioDeDadosInterface>({
			resolver: yupResolver(ServiçoEstruturaFormulário.login()),
		}),
		formularioPagamento = useForm<PagamentoFormularioDeDadosInterface>({
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
		} else {
			alterarPasso(2);
		}
	}

	function aoSubmeterFormulárioCliente(
		dados: CadastroClienteFormulárioDeDadosInterface
	) {
		console.log(dados);
	}

	function aoSubmeterFormularioLogin(dados: LoginFormularioDeDadosInterface) {
		console.log(dados);
	}

	function aoSubmeterFormularioPagamento(
		dados: PagamentoFormularioDeDadosInterface
	) {
		console.log(dados);
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
			const dadoDoServico = formulárioServiço.getValues();
			ServicoAPIHateoas(
				usuario.links,
				"cadastrar_diaria",
				async (requisicao) => {
					try {
						const novaDiaria = (
							await requisicao<DiáriaInterface>({
								data: {
									...dadoDoServico.endereço,
									...dadoDoServico.faxina,
									cep: ServicoFormatadorDeTexto.pegarNumerosParaTexto(
										dadoDoServico.endereço.cep
									),
									preco: totalPreco,
									tempo_atendimento:
										ServicoFormatadorDeTexto.reverterFormatoDeData(
											dadoDoServico.faxina
												.data_atendimento as string
										) +
										"T" +
										dadoDoServico.faxina.hora_início,
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
