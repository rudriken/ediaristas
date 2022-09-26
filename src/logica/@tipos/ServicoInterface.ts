export interface ServicoInterface {
	// os valores para os campos abaixo virão da tabela "servicos" do banco de dados
	id: number;
	nome: string;
	valor_minimo: number;
	qtd_horas: number;
	porcentagem_comissao: number;
	horas_quarto: number;
	valor_quarto: number;
	horas_sala: number;
	valor_sala: number;
	horas_banheiro: number;
	valor_banheiro: number;
	horas_cozinha: number;
	valor_cozinha: number;
	horas_quintal: number;
	valor_quintal: number;
	horas_outros: number;
	valor_outros: number;
	icone: string;
}
