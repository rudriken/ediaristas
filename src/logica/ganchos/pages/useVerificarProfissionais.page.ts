import { useState, useMemo } from "react";
import { ServicoAPI } from "logica/servicos/ServicoAPI";
import { ServicoValidacao } from "logica/servicos/ServicoValidacao";
import { InterfaceInformacaoCurtaDoUsuario } from "logica/@tipos/InterfaceDoUsuario";

export default function useVerificarProfissionais() {
	const [cep, definirCep] = useState(""),
		cepValido = useMemo(() => {
			return ServicoValidacao.verificarCEP(cep);
		}, [cep]),
		[erro, definirErro] = useState(""),
		[buscaFeita, definirBuscaFeita] = useState(false),
		[carregando, definirCarregando] = useState(false),
		[listaDiaristas, definirListaDiaristas] = useState(
			[] as InterfaceInformacaoCurtaDoUsuario[]
		),
		[diaristasRestantes, definirDiaristasRestantes] = useState(0);

	async function buscarProfissionais(cep: string) {
		definirBuscaFeita(false);
		definirCarregando(true);
		definirErro("");
		try {
			const { data } = await ServicoAPI.get<{
				diaristas: InterfaceInformacaoCurtaDoUsuario[];
				quantidade_diaristas_restante: number;
			}>(`/api/diaristas/localidades?cep=${cep.replace(/\D/g, "")}`);
			const dadosDoBanco = data;
			definirBuscaFeita(true);
			definirListaDiaristas(dadosDoBanco.diaristas);
			definirDiaristasRestantes(
				dadosDoBanco.quantidade_diaristas_restante
			);
			definirCarregando(false);
		} catch (erro) {
			definirErro("CEP não encontrado");
			definirCarregando(false);
		}
	}

	return {
		cep,
		definirCep,
		cepValido,
		buscarProfissionais,
		erro,
		listaDiaristas,
		buscaFeita,
		carregando,
		diaristasRestantes,
	};
}
