import { DiariaInterface } from "./DiariaInterface";
import { CidadeInterface, EnderecoInterface } from "./EnderecoInterface";
import { InterfaceDoUsuario } from "./InterfaceDoUsuario";

export interface NovaDiariaFormularioDeDadosInterface {
	endereco: EnderecoInterface;
	faxina: DiariaInterface;
}

export interface LoginFormularioDeDadosInterface<T> {
	login: T;
}

export interface CredenciaisInterface {
	email: string;
	password: string;
}

export interface CadastroClienteFormularioDeDadosInterface {
	usuario: InterfaceDoUsuario;
}

export interface CadastroDiaristaFormularioDeDadosInterface {
	usuario: InterfaceDoUsuario;
	endereco: EnderecoInterface;
	cidadesAtendidas: CidadeInterface[];
}

export interface PagamentoFormularioDeDadosInterface<T> {
	pagamento: T;
}

export interface CartaoDadosInterface {
	nome_cartao: string;
	numero_cartao: string;
	codigo: string;
	validade: string;
	pagamento_recusado?: boolean;
}
