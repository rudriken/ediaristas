import { DiáriaInterface } from "./DiáriaInterface";
import { EndereçoInterface } from "./EndereçoInterface";
import { InterfaceDoUsuário } from "./InterfaceDoUsuário";

export interface NovaDiáriaFormulárioDeDadosInterface {
	endereço: EndereçoInterface;
	faxina: DiáriaInterface;
}

export interface CadastroClienteFormulárioDeDadosInterface {
	usuário: InterfaceDoUsuário;
}
