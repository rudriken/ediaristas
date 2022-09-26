import { useState, useMemo, useEffect } from "react";
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
import useApi from "../useApi.hook";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { ServicoValidacao } from "logica/servicos/ServicoValidacao";
import { ServicoData } from "logica/servicos/ServicoData";
import { comodosDaCasa } from "@parciais/encontrar-diarista/_detalhes-servico";

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
					ServicoEstruturaFormulario.detalhesServiço()
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
		servicos = useApi<ServicoInterface[]>("/api/servicos").data,
		dadosFaxina = formularioServico.watch("faxina"),
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

	function aoSubmeterFormularioServico(
		dados: NovaDiariaFormularioDeDadosInterface
	) {
		console.log(dados);
	}

	function aoSubmeterFormularioCliente(
		dados: CadastroClienteFormularioDeDadosInterface
	) {
		console.log(dados);
	}

	function aoSubmeterFormularioLogin(
		dados: LoginFormularioDeDadosInterface<CredenciaisInterface>
	) {
		console.log(dados);
	}

	function aoSubmeterFormularioPagamento(
		dados: PagamentoFormularioDeDadosInterface<CartaoDadosInterface>
	) {
		console.log(dados);
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
		temLogin,
		tipoLimpeza,
		totalPreco,
		tamanhoCasa,
		erroDeLogin,
		alterarTemLogin,
		alterarErroDeLogin,
	};
}
