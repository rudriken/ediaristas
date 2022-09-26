import { useState, useMemo } from "react";
import { ServiçoAPI } from "lógica/serviços/ServiçoAPI";
import { ServiçoValidação } from "lógica/serviços/ServiçoValidação";
import { InterfaceInformaçãoCurtaDoUsuário } from "lógica/@tipos/InterfaceDoUsuário";

export default function useVerificarProfissionais() {
    const [cep, definirCep] = useState(""),
        cepVálido = useMemo(() => {
            return ServiçoValidação.verificarCEP(cep);
        }, [cep]),
        [erro, definirErro] = useState(""),
        [buscaFeita, definirBuscaFeita] = useState(false),
        [carregando, definirCarregando] = useState(false),
        [listaDiaristas, definirListaDiaristas] = useState(
            [] as InterfaceInformaçãoCurtaDoUsuário[]
        ),
        [diaristasRestantes, definirDiaristasRestantes] = useState(0);

    async function buscarProfissionais(cep: string) {
        definirBuscaFeita(false);
        definirCarregando(true);
        definirErro("");
        try {
            const { data } = await ServiçoAPI.get<{
                diaristas: InterfaceInformaçãoCurtaDoUsuário[];
                quantidade_diaristas_restante: number;
            }>(`/api/diaristas/localidades?cep=${cep.replace(/\D/g, "")}`);
            const dadosDoBanco = data;
            definirBuscaFeita(true);
            definirListaDiaristas(dadosDoBanco.diaristas);
            definirDiaristasRestantes(dadosDoBanco.quantidade_diaristas_restante);
            definirCarregando(false);
        } catch (erro) {
            definirErro("CEP não encontrado");
            definirCarregando(false);
        }
    }

    return {
        cep,
        definirCep,
        cepVálido,
        buscarProfissionais,
        erro,
        listaDiaristas,
        buscaFeita,
        carregando,
        diaristasRestantes,
    };
}
