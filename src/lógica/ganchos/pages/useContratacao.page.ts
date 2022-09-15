import { useState, useMemo, useEffect } from "react";
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
import useApi from "../useApi.hook";
import { DiáriaInterface } from "lógica/@tipos/DiáriaInterface";
import { ServiçoValidação } from "lógica/serviços/ServiçoValidação";
import { ServiçoData } from "lógica/serviços/ServiçoData";

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
		serviços = useApi<ServiçoInterface[]>("/api/servicos").data,
		dadosFaxina = formulárioServiço.watch("faxina"),
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
		}, [serviços, dadosFaxina]),
		totalTempo = useMemo<number>(() => {
			return calcularTempoServico(dadosFaxina, tipoLimpeza);
		}, [dadosFaxina, tipoLimpeza]);

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

	function aoSubmeterFormulárioServiço(
		dados: NovaDiáriaFormulárioDeDadosInterface
	) {
		console.log(dados);
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
		temLogin,
		erroDeLogin,
		alterarTemLogin,
		alterarErroDeLogin,
	};
}
