import { boolean } from "yup";
import { DiáriaInterface } from "./DiáriaInterface";
import { EndereçoInterface } from "./EndereçoInterface";
import { InterfaceDoUsuário } from "./InterfaceDoUsuário";

export interface NovaDiáriaFormulárioDeDadosInterface {
	endereço: EndereçoInterface;
	faxina: DiáriaInterface;
}

export interface LoginFormularioDeDadosInterface {
	email: string;
	password: string;
}

export interface CadastroClienteFormulárioDeDadosInterface {
	usuário: InterfaceDoUsuário;
}

export interface PagamentoFormularioDeDadosInterface {
	nome_cartao: string;
	numero_cartao: string;
	codigo: string;
	validade: string;
	pagamento_recusado?: boolean;
}
