import { useState } from "react";
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
		serviços = useApi<ServiçoInterface[]>("/api/servicos").data;

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
