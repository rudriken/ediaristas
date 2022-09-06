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

export default function useContratacao() {
	const [passo, alterarPasso] = useState(3),
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
		serviços: ServiçoInterface[] = [
			{
				id: 1,
				nome: "Limpeza Comum",
				valor_minimo: 50,
				qtd_horas: 3,
				porcentagem_comissao: 10,
				horas_quarto: 1,
				valor_quarto: 11,
				horas_sala: 1,
				valor_sala: 10,
				horas_banheiro: 1,
				valor_banheiro: 12,
				horas_cozinha: 2,
				valor_cozinha: 15,
				horas_quintal: 1,
				valor_quintal: 12,
				horas_outros: 2,
				valor_outros: 16,
				icone: "twf-cleaning-1",
			},
			{
				id: 2,
				nome: "Limpeza Pesada",
				valor_minimo: 70,
				qtd_horas: 3,
				porcentagem_comissao: 15,
				horas_quarto: 1,
				valor_quarto: 15,
				horas_sala: 1,
				valor_sala: 13,
				horas_banheiro: 2,
				valor_banheiro: 16,
				horas_cozinha: 2,
				valor_cozinha: 20,
				horas_quintal: 1,
				valor_quintal: 16,
				horas_outros: 3,
				valor_outros: 16,
				icone: "twf-cleaning-2",
			},
			{
				id: 3,
				nome: "Limpeza Pós Obra",
				valor_minimo: 90,
				qtd_horas: 4,
				porcentagem_comissao: 20,
				horas_quarto: 2,
				valor_quarto: 20,
				horas_sala: 2,
				valor_sala: 16,
				horas_banheiro: 2,
				valor_banheiro: 20,
				horas_cozinha: 2,
				valor_cozinha: 22,
				horas_quintal: 2,
				valor_quintal: 17,
				horas_outros: 3,
				valor_outros: 20,
				icone: "twf-cleaning-3",
			},
		];

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
